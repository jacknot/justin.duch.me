/*
 * Builds post database in redis
 */

const fs = require("fs");
const path = require("path");

const showdown = require("showdown");
const footnotes = require("./src/showdown/footnotes"),
  prettify = require("./src/showdown/prettify"),
  showdownHighlight = require("showdown-highlight");
require("showdown-youtube");
const readingTime = require("reading-time");

const { REDIS_URL, SENDGRID_API_KEY } = process.env;
const redisUrl = REDIS_URL || "redis://127.0.0.1:6379";

const redis = require("redis");
const redisScan = require("node-redis-scan");
const client = redis.createClient(redisUrl);
const scanner = new redisScan(client);

const converter = new showdown.Converter({
  tables: true,
  strikethrough: true,
  extensions: ["youtube", footnotes, showdownHighlight, prettify]
});

const postsDir = "./_posts";

function getPostData(data) {
  // Because there is no metadata extension, we need to read the lines
  let lines = data.split("\n");
  let metadataString = lines.slice(1, 7);
  let body = lines.slice(8, lines.length).join("\n");

  return {
    title: metadataString[0]
      .split(":")
      .slice(1)
      .join(":")
      .trim(),
    category: metadataString[1].split(":")[1].trim(),
    date: metadataString[2].split(":")[1].trim(),
    thumbnail: metadataString[3].split(":")[1].trim(),
    tags: metadataString[4].split(":")[1].trim(),
    description: metadataString[5].split(":")[1].trim(),
    readtime: readingTime(body).text,
    html: converter.makeHtml(body)
  };
}

function scanAndImportArticles() {
  return new Promise(resolve => {
    let newArticle = null;

    // Get old posts
    scanner.scan("article:*", (_, keys) => {
      // Remove old posts
      keys.forEach(key => client.del(key));

      // Read posts again and import them
      fs.readdirSync(postsDir).forEach(file => {
        let filepath = path.join(postsDir, file);
        let filename = file.split(".")[0];

        let data = fs.readFileSync(filepath, { encoding: "utf-8" });
        let post = { ...getPostData(data), slug: filename };

        // replace reference tags will full path because I don't know how to change
        // the base url.
        post.html = post.html.replace(
          /#reference/g,
          `article/${post.slug}/#reference`
        );

        // and footnotes
        post.html = post.html.replace(
          /#footnote/g,
          `article/${post.slug}/#footnote`
        );

        let key = "article:" + filename;
        client.set(key, JSON.stringify(post));

        // Check if is new article
        if (keys.indexOf(key) === -1) {
          newArticle = post;
          console.log(`Imported '${post.title}'.`);
        }
      });

      resolve(newArticle);
    });
  });
}

(async () => {
  await scanAndImportArticles();

  process.exit();
})();

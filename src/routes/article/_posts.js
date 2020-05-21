// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/article/posts` route — the leading
// underscore tells Sapper not to do that.

const fs = require("fs");
const path = require("path");

const showdown = require("showdown");
require("showdown-youtube");
const readingTime = require("reading-time");

import footnotes from "./../../showdown/footnotes";
import prettify from "./../../showdown/prettify";
import showdownHighlight from "showdown-highlight";

const converter = new showdown.Converter({
  tables: true,
  strikethrough: true,
  extensions: ["youtube", footnotes, showdownHighlight, prettify]
});

const postsDir = "_posts";

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

export default () => {
  let posts = [];

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

    posts.push(post);
  });

  return posts;
}

/*
 * Builds post database in redis and sends email if new
 */

const fs = require('fs');
const path = require('path');

const showdown = require('showdown');
const footnotes = require('showdown-footnotes'),
	showdownHighlight = require("showdown-highlight");
require('showdown-youtube');
require('showdown-prettify');

const { PORT, NODE_ENV, REDIS_URL } = process.env;
const dev = NODE_ENV !== 'production';
const redisUrl = REDIS_URL || 'redis://127.0.0.1:6379';

const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient(redisUrl);
const scanner = new redisScan(client);

const converter = new showdown.Converter({extensions: 
	['youtube', footnotes, showdownHighlight, 'prettify']});
const articleDir = './_articles';

function getPostData(data) {
	// Because there is no metadata extension, we need to read the lines
	let lines = data.split('\n');
	let metadataString = lines.slice(1,7);

	return {
		title: metadataString[0].split(':')[1].trim(),
		category: metadataString[1].split(':')[1].trim(),
		date: metadataString[2].split(':')[1].trim(),
		thumbnail: metadataString[3].split(':')[1].trim(),
		tags: metadataString[4].split(':')[1].trim(),
		description: metadataString[5].split(':')[1].trim(),
		html:	converter.makeHtml(lines.slice(8,lines.length).join('\n')),
	}
}

function scanAndImportArticles() { 
	return new Promise(resolve => {
		let newArticle = null;

		// Get old posts
		scanner.scan('article:*', (err, keys) => {
			// Remove old posts
			keys.forEach(key => client.del(key));

			// Read posts again and import them
			fs.readdirSync(articleDir).forEach(file => {
				let filepath = path.join(articleDir, file);
				let filename = file.split('.')[0];

				let data = fs.readFileSync(filepath, {encoding: 'utf-8'});
				let post = {...getPostData(data), slug: filename};

				let key = 'article:' + filename;
				client.set(key, JSON.stringify(post));

				// Check if is new article
				if (keys.indexOf(key) === -1) {
					newArticle = post;
				}
			});

			resolve(newArticle);
		});
	});
}

(async () => {
	let newArticle = await scanAndImportArticles();

	if (newArticle && !dev) {
		// TODO: send email
	}

	process.exit();
})();

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

const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient();
const scanner = new redisScan(client);

const converter = new showdown.Converter({extensions: 
	['youtube', footnotes, showdownHighlight, 'prettify']});
const articleDir = './_articles';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

function scanAndImportArticles() { 
	return new Promise(resolve => {
		let newArticle = null;

		// Get old posts
		scanner.scan('article:*', (err, keys) => {
			// Remove old posts
			keys.forEach(key => client.del(key));

			// Read posts again and import them
			fs.readdirSync(articleDir).forEach(file => {
				let filePath = path.join(articleDir, file);
				let fileName = file.split('.')[0];

				let data = fs.readFileSync(filePath, {encoding: 'utf-8'});
				let lines = data.split('\n');
				let metadataString = lines.slice(1,7);

				// Because there is no metadata extension, we need to read the lines
				let post = {
					slug: fileName,
					title: metadataString[0].split(':')[1].trim(),
					category: metadataString[1].split(':')[1].trim(),
					date: metadataString[2].split(':')[1].trim(),
					thumbnail: metadataString[3].split(':')[1].trim(),
					tags: metadataString[4].split(':')[1].trim(),
					description: metadataString[5].split(':')[1].trim(),
					html:	converter.makeHtml(lines.slice(8,lines.length).join('\n')),
				}

				let key = 'article:' + fileName;
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

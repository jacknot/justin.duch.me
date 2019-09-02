/*
 * Builds post database in redis and sends email if new
 */

const fs = require('fs');
const path = require('path');

const showdown = require('showdown');
const footnotes = require('./src/showdown/footnotes'),
	showdownHighlight = require("showdown-highlight");
require('showdown-youtube');
require('showdown-prettify');
const readingTime = require('reading-time');

const { PORT, NODE_ENV, REDIS_URL, SENDGRID_API_KEY } = process.env;
const dev = NODE_ENV !== 'production';
const redisUrl = REDIS_URL || 'redis://127.0.0.1:6379';

const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient(redisUrl);
const scanner = new redisScan(client);

const converter = new showdown.Converter({extensions:
	['youtube', footnotes, showdownHighlight, 'prettify']});
const articleDir = './_articles';

const mail = require('@sendgrid/mail');
mail.setApiKey(SENDGRID_API_KEY);

function getPostData(data) {
	// Because there is no metadata extension, we need to read the lines
	let lines = data.split('\n');
	let metadataString = lines.slice(1,7);
	let body = lines.slice(8,lines.length).join('\n')

	return {
		title: metadataString[0].split(':')[1].trim(),
		category: metadataString[1].split(':')[1].trim(),
		date: metadataString[2].split(':')[1].trim(),
		thumbnail: metadataString[3].split(':')[1].trim(),
		tags: metadataString[4].split(':')[1].trim(),
		description: metadataString[5].split(':')[1].trim(),
		readtime: readingTime(body).text,
		html:	converter.makeHtml(body),
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

				// replace footnote tags will full path because I don't know how to change
				// the base url.
				post.html = post.html.replace(/#footnote/g, `article/${post.slug}/#footnote`);

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

function getSubscribers() {
	return new Promise(resolve => {
		scanner.scan('email:*', (err, keys) => {
			resolve(keys);
		});
	});
}

async function sendEmails(article) {
	return new Promise(async resolve => {
		let email_keys = await getSubscribers();
		let url = `https://blog.justinduch.com/article/${article.slug}`

		let count = email_keys.length;

		email_keys.forEach(key => {
			let [email, unsub_token] = key.split(':').slice(1,3);
			let unsub_url = `https://blog.justinduch.com/unsubscribe/${unsub_token}`;
			let body = `
				<p>Hey there,</p>
				<p>Here's a new article to read: ${url}</p></br>
				<p>Enjoy.</p></br>
				<small>If you want to unsubscribe click here: ${unsub_url}</small>
			`;

			const msg = {
				to: email,
				from: 'Justin Duch <noreply@justinduch.com>',
				subject: 'New Article',
				text: 'New Article!',
				html: body,
			};

			mail.send(msg)
				.then(() => {
					count -= 1;
					if (!count) { resolve(); }
				})
				.catch(err => {
					if (!count) { resolve(); }
				});
		});
	});
}

(async () => {
	let newArticle = await scanAndImportArticles();

	if (newArticle) {
		await sendEmails(newArticle);
	}

	process.exit();
})();

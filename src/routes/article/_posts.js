// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/article/posts` route — the leading
// underscore tells Sapper not to do that.
//
const { REDIS_HOST } = process.env;
const redisHost = REDIS_HOST || '127.0.0.1';

const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient(6379, redisHost);
const scanner = new redisScan(client);

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

function scanArticles() { 
	return new Promise(resolve => {
		let posts = [];

		scanner.scan('article:*', async (err, keys) => {
			for (const key of keys) {
				const res = await getAsync(key);
				posts.push(JSON.parse(res));
			};

			resolve(posts);
		});
	});
}


export default async () => {
	return await scanArticles();
};

const { REDIS_URL } = process.env;
const redisUrl = REDIS_URL || 'redis://127.0.0.1:6379';

const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient(redisUrl);
const scanner = new redisScan(client);

const {promisify} = require('util');
const delAsync = promisify(client.del).bind(client);

export async function del(req, res) {
	let { slug } = req.params;

	scanner.scan(`email:*:${slug}`, async (err, keys) => {
		for (const key of keys) {
			await delAsync(key);
		}
	});

	res.end(JSON.stringify({success: true}));
}

const uuidv4 = require('uuid/v4');
const { REDIS_URL } = process.env;
const redisUrl = REDIS_URL || 'redis://127.0.0.1:6379';

const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient(redisUrl);
const scanner = new redisScan(client);

const {promisify} = require('util');
const delAsync = promisify(client.del).bind(client);

export function post(req, res) {
	let { slug } = req.params;
	let success = false;
	let uuid = uuidv4();

	scanner.scan(`email:*:*:${slug}`, async (_, keys) => {
		if (keys.length === 0) {
			res.end(JSON.stringify({success}));
		}

		let [ email ] = keys[0].split(':').slice(2, 3);

		client.set(`email:${email}:${uuid}`, 1);

		for (const key of keys) {
			await delAsync(key);
			success = true;
		}

		res.end(JSON.stringify({success}));
	});
}

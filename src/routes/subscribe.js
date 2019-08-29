const uuidv4 = require('uuid/v4');
const redis = require('redis');
const redisScan = require('node-redis-scan');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const scanner = new redisScan(client);

const {promisify} = require('util');
const delAsync = promisify(client.del).bind(client);

export function post(req, res) {
	let json = req.body;
	let uuid = uuidv4();

	scanner.scan(`email:${json.email}:*`, async (err, keys) => {
		for (const key of keys) {
			await delAsync(key);
		}

		client.set(`email:${json.email}:${uuid}`, 1);
		res.end(JSON.stringify(json));
	});
}

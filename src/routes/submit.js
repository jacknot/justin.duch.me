const uuidv4 = require('uuid/v4');
const redis = require('redis');
const redisScan = require('node-redis-scan');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const scanner = new redisScan(client);

const {promisify} = require('util');
const delAsync = promisify(client.del).bind(client);

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const mail = require('@sendgrid/mail');
mail.setApiKey(SENDGRID_API_KEY);

export function post(req, res) {
	let json = req.body;
	let uuid = uuidv4();

	scanner.scan(`email:confirmation:${json.email}:*`, async (_, keys) => {
		for (const key of keys) {
			await delAsync(key);
		}

		client.set(`email:confirmation:${json.email}:${uuid}`, 1);

		let blog_url = 'https://blog.justinduch.com';
		let subscribe_url = `https://blog.justinduch.com/subscribe/${uuid}`;

		let body = `
			<p>Hello! I recently received a request to add this email address to <a href="${blog_url}">my mailing list.</a></p>
			<p>If you'd still like to join, please confirm by <a href="${subscribe_url}">clicking here.</a></p>
			<p>If you received this email in error, it's safe to ignore it. By default you will stay unsubscribed.</p>
		`;

		const msg = {
			to: json.email,
			from: 'Justin Duch <noreply@justinduch.com>',
			subject: 'Verify your email',
			text: 'Confirm email',
			html: body,
		};

		mail.send(msg)
			.then(() => res.end(JSON.stringify({email: json.email})))
			.catch(() => res.end());
	});
}

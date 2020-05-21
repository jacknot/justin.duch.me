const RSS = require('rss');

import { getPosts } from './../article/_posts.js';

export function get(_, res) {
	let feed = new RSS({
		title: 'blog.justinduch.com',
		description: 'a very good blog',
		feed_url: 'https://blog.justinduch.com/api/feed',
		site_url: 'https://blog.justinduch.com',
		managingEditor: 'Justin Duch',
		webMaster: 'Justin Duch',
		language: 'en',
	});

	getPosts().sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(p => {
		feed.item({
			title: p.title,
			description: p.html,
			url: `https://blog.justinduch.com/article/${p.slug}`,
			date: p.date,
		});
	});

	res.writeHead(200, {
		'Content-Type': 'application/rss+xml'
	});

	res.end(feed.xml());
}

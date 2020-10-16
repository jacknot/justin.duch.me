const RSS = require('rss');

import { getPosts } from './../post/_posts.js';

export function get(_, res) {
  let feed = new RSS({
    title: 'justin.duch.me',
    description: 'a very good blog',
    feed_url: 'https://justin.duch.me/api/feed',
    site_url: 'https://justin.duch.me',
    managingEditor: 'Justin Duch',
    webMaster: 'Justin Duch',
    language: 'en',
  });

  getPosts().sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(p => {
    feed.item({
      title: p.title,
      description: p.html,
      url: `https://justin.duch.me/post/${p.slug}`,
      date: p.date,
    });
  });

  res.writeHead(200, {
    'Content-Type': 'application/rss+xml'
  });

  res.end(feed.xml());
}

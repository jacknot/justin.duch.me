import RSS from 'rss';
import { getPosts } from './../post/_posts.js';

export const get = async (request) => {
  let feed = new RSS({
    title: 'justin.duch.me',
    description: 'a very good blog',
    feed_url: 'https://justin.duch.me/api/feed',
    site_url: 'https://justin.duch.me',
    managingEditor: 'justin@duch.me (Justin Duch)',
    webMaster: 'justin@duch.me (Justin Duch)',
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

  return {
    body: feed.xml(),
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/rss+xml'
    }
  };
}

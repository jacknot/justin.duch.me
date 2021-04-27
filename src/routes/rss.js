import { Feed } from 'feed';
import { getPosts } from './post/_posts.js';

export const makeFeed = () => {
  let feed = new Feed({
    title: 'justin.duch.me',
    description: 'a very good blog',
    id: 'https://justin.duch.me',
    link: 'https://justin.duch.me',
    author: {
      name: 'Justin Duch',
      email: 'justin@duch.me',
    },
    feedLinks: {
      json: 'https://justin.duch.me/rss',
      atom: 'https://justin.duch.me/atom'
    },
    language: 'en',
  });

  getPosts().sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(p => {
    feed.addItem({
      title: p.title,
      content: p.html,
      id: `https://justin.duch.me/post/${p.slug}`,
      date: new Date(p.date),
      author: [{
        name: 'Justin Duch',
        email: 'justin@duch.me',
        link: 'https://justin.duch.me'
      }]
    });
  });

  return feed;
};

export const get = async (request) => {
  let feed = makeFeed();

  return {
    body: feed.rss2(),
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/rss+xml'
    }
  };
}

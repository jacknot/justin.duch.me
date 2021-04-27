import { makeFeed } from './rss';

export const get = async (request) => {
  let feed = makeFeed();

  return {
    body: feed.atom1(),
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/rss+xml'
    }
  };
}

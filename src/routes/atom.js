import { makeFeed } from './rss';

export const get = async (request) => {
  let feed = makeFeed();

  return {
    body: feed.atom1(),
    headers: {
      'Content-Type': 'application/atom+xml'
    }
  };
};

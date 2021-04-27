import { getPost } from './_posts.js';

export const get = async (request) => {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = request.params;

  const post = getPost(slug);
  return { body: post };
};

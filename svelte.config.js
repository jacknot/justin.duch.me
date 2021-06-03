import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    target: '#svelte',
    adapter: adapter(),
    router: false,
    hydrate: true,
    prerender: {
      crawl: true,
      pages: ['/', '/404']
    }
  }
};

export default config;

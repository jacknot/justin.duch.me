import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    target: '#svelte',
    adapter: adapter(),
    router: false,
    hydrate: true
  }
};

export default config;

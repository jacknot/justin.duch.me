const adapter = require('@sveltejs/adapter-static');

module.exports = {
  kit: {
    target: '#svelte',
    adapter: adapter()
  }
};

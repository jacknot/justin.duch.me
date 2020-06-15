<script context="module">
  export const threshold = 1000;
  export const increment = 15;

  export function preload({ params, query }) {
    return this.fetch(`post.json`)
      .then(r => r.json())
      .then(data => data);
  }
</script>

<script>
  export let posts;
</script>

<style>
  a {
    padding: 0;
  }

  ul {
    margin-top: 0;
  }

  .monospace {
    font-family: monospace;
  }
</style>

<svelte:head>
  <title>archive</title>
</svelte:head>

<div class="space-yo">
  <h2>beinvenue</h2>

  <a href="/">vue l'accueil</a>
</div>

<ul>
  {#each posts as post}
    <li>
      <small class="monospace">[{post.date}]</small>
      <a rel="prefetch" href="post/{post.slug}">
        {post.title}
      </a>
    </li>
  {/each}
</ul>

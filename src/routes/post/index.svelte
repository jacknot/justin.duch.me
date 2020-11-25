<script context="module">
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
  .post {
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;
  }

  .post > p {
    padding-bottom: 1em;
    margin: 0;
  }

  a {
    text-transform: lowercase;
  }
</style>

<svelte:head>
  <title>articles</title>
</svelte:head>

<div class="space-yo">
  <h1>articles</h1>
  <small><a href=".">&#9166; retour</a></small>
</div>

{#each posts as post}
  <!-- we're using the non-standard `rel=prefetch` attribute to
    tell Sapper to load the data for the page as soon as
    the user hovers over the link or taps it, instead of
    waiting for the 'click' event -->
  <div class="post">
    <p>
      <a rel="prefetch" href="post/{post.slug}" class="no-underline">
        {post.title}
      </a>
    </p>
    <div class="space-yo space-column">
      <small>{post.readtime}</small>
      <small>from {post.category} on {post.date}</small>
    </div>
  </div>
{/each}

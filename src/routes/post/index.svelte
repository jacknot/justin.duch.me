<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("/post.json");
    if (res.ok) {
      const posts = await res.json();
      return {
        props: { posts },
      };
    }
  };
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>articles</title>
</svelte:head>

<div class="space-yo">
  <h1>articles</h1>
  <small><a href=".">&#9166; retour</a></small>
</div>

{#each posts as post}
  <div class="post">
    <p>
      <a sveltekit:prefetch href="/post/{post.slug}" class="no-underline">
        {post.title}
      </a>
    </p>
    <div class="post-info">
      <small>publié sur {post.date}</small>
      <small class="readtime">{post.readtime} min de lecture</small>
    </div>
  </div>
{/each}

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
    font-weight: 300;
    text-transform: lowercase;
  }
</style>

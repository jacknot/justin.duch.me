<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch('/post.json');
    if (res.ok) {
      const posts = await res.json();
      return {
        props: { posts },
      };
    }
  };
</script>

<script>
  import { Interval, DateTime } from 'luxon';

  export let posts;

  function distanceFromPrev(post) {
    const index = posts.map(p => p.date).indexOf(post.date);
    const prev_post = posts[index - 1];

    if (prev_post === undefined) {
      return '0';
    }

    const start = DateTime.fromISO(post.date);
    const end = DateTime.fromISO(prev_post.date);

    return Math.ceil(Interval.fromDateTimes(start, end).length('weeks') * 2);
  }
</script>

<svelte:head>
  <title>articles</title>
</svelte:head>

<div class="space-yo">
  <h1>articles</h1>
  <small><a href=".">&#9166; retour</a></small>
</div>

{#each posts as post}
  <div style="width: 100%; height: {distanceFromPrev(post)}em; padding: 1em 0.5em 1em 4em;">
    <div class="divider"></div>
  </div>

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
  .divider {
    height: 100%;
    border-left: dashed 1px #8a8a8a;
  }

  .post {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  .post > p {
    padding-bottom: 0;
    margin: 0;
  }

  a {
    font-weight: 300;
    text-transform: lowercase;
  }
</style>

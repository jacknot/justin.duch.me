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

  const current_build = DateTime.now();

  function distanceFromPrev(post) {
    const index = posts.map(p => p.date).indexOf(post.date);
    const prev_post = posts[index - 1];

    let end;
    const start = DateTime.fromISO(post.date);

    if (prev_post === undefined) {
      end = current_build;
    } else {
      end = DateTime.fromISO(prev_post.date);
    }

    return Math.ceil(Interval.fromDateTimes(start, end).length('days') / 2);
  }
</script>

<svelte:head>
  <title>chronologie</title>
</svelte:head>

<div class="space-yo">
  <h1>chronologie</h1>
  <small><a href="/">&#9166; retour</a></small>
</div>

<code>dernière compile: {current_build}</code>

{#each posts as post}
  <div style="max-width: 100%; height: {distanceFromPrev(post)}em; padding: 1em 0.5em 1em 4em;">
    <div class="divider"></div>
  </div>

  <div class="post">
    <p>
      <a sveltekit:prefetch href="/post/{post.slug}" class="no-underline">
        {post.title}
      </a>
    </p>

    <div class="bottom-border">
      <div style="border-bottom: 0.5em solid rgba(255, 255, 255, 0.2); max-width: 100%; width: {post.readtime}em;"></div>
    </div>

    <div class="post-info">
      <small>publié sur {post.date}</small>
      <small class="readtime">{post.readtime} min de lecture</small>
    </div>
  </div>
{/each}

<style>
  .divider {
    height: 100%;
    border-left: 2px dotted rgba(255, 255, 255, 0.2);
  }

  .bottom-border {
    margin-top: 0.2em;
    width: 100%;
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

  code {
    font-size: 0.7rem !important;
  }
</style>

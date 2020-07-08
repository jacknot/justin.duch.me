<script context="module">
  export const threshold = 1000;
  export const increment = 15;

  export function preload({ params, query }) {
    let page = parseInt(query.page);
    let start = page ? increment * (page - 1) : 0;
    let end = start + increment;

    return this.fetch(`post.json?start=${start}&end=${end}`)
      .then(r => r.json())
      .then(data => {
        return { ...data, start, end, page };
      });
  }
</script>

<script>
  import { onMount } from "svelte";
  import { Card } from "prisme-components-svelte";
  import Paginate from "../components/Paginate.svelte";

  export let posts;
  export let next;
  export let start;
  export let end;
  export let page;

  function debounce(func, wait, immediate) {
    let timeout;

    return function() {
      let context = this,
        args = arguments;

      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      let callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  const onScroll = debounce(e => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - threshold &&
      next
    ) {
      start += increment;
      end += increment;

      fetch(`post.json?start=${start}&end=${end}`)
        .then(r => r.json())
        .then(data => {
          posts = [...posts, ...data.posts];
          next = data.next;

          if (!next) {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
          }
        });
    }
  }, 50);

  onMount(() => {
    if (!page) {
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onScroll);
    }
  });
</script>

<style>
  a {
    padding: 0;
  }

  .no-underline {
    text-decoration: none;
  }

  h2 {
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    height: 100%;
  }

  :global(.darkmode--activated) .container {
    border: 1px solid rgb(225, 225, 225, 0.2);
  }

  img {
    width: 35%;
    height: 137px;
  }

  .info {
    padding: 1em;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .finish {
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08), 0 2px 8px 0 rgba(0, 0, 0, 0.16);
    padding: 5px;
    text-align: center;
  }

  :global(.darkmode--activated) .finish {
    border: 1px solid rgb(225, 225, 225, 0.3);
  }

  @media (max-width: 600px) {
    .container {
      flex-direction: column;
      height: auto;
    }

    img {
      width: 100%;
      height: 100%;
    }

    .info {
      width: auto;
    }
  }
</style>

<svelte:head>
  <title>accueil</title>
</svelte:head>

<div class="space-yo">
  <h2>beinvenue</h2>

  <a class="underline" href="/archive">vue les archives</a>
</div>

{#each posts as post}
  <!-- we're using the non-standard `rel=prefetch` attribute to
    tell Sapper to load the data for the page as soon as
    the user hovers over the link or taps it, instead of
    waiting for the 'click' event -->
  <a rel="prefetch" href="post/{post.slug}" class="no-underline">
    <Card bs="md" m="0 0 1em 0" h="100%">
      <div class="container">
        <img
          src="https://cdn.halcyonnouveau.xyz/blog/thumbnails/{post.thumbnail}?w=435&h=274"
          alt={post.thumbnail} />

        <div class="info">
          <h4>{post.title}</h4>
          <div class="space-yo">
            <small>{post.readtime}</small>
            <small>from {post.category} on {post.date}</small>
          </div>
        </div>
      </div>
    </Card>
  </a>
{/each}

{#if !next && !page}
  <h5 class="finish">la fin</h5>
{/if}

{#if page}
  <Paginate {page} {next} />
{:else}
  <noscript>
    <Paginate {page} {next} />
  </noscript>
{/if}

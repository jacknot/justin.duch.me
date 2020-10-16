<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`post/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { onMount } from "svelte";

  export let post;

  let currentDiv;
  let currentId;

  function toggleFootnote(event) {
    event.preventDefault();

    let parent = this.parentNode;
    let footnoteId = this.id;

    if (currentDiv) {
      let currentDivParent = currentDiv.parentNode;
      currentDivParent.removeChild(currentDiv);
      currentDiv = null;
    }

    if (currentId === footnoteId) {
      currentId = null;
      return;
    }

    let footHtml = document.getElementById(`${footnoteId}-body`).innerHTML;
    // Content as "(1) This is a footnote" becuase that's how it's shown with JS disabled
    // We have JS enabled so we remove the "(1)"
    footHtml = footHtml.replace(
      /^\(([\d\w]+)\)\s*(.*)$/gm,
      (str, name, content) => content
    );

    currentId = footnoteId;
    currentDiv = document.createElement("div");
    currentDiv.innerHTML = footHtml;
    currentDiv.className = "foot-tooltip";
    parent.insertBefore(currentDiv, this.nextSibling);

    setTimeout(() => currentDiv.style.opacity = "1", 0);
  }

  onMount(() => {
    let bodies = document.getElementsByClassName("footnote-body");
    let links = document.getElementsByClassName("footnote-link");

    for (let b of bodies) {
      b.style.display = "none";
    }

    for (let l of links) {
      l.onclick = toggleFootnote;
    }
  });
</script>

<style>
  .content .info-line {
    display: flex;
    justify-content: space-between;
  }

  .info-line a {
    text-decoration: none;
  }

  .content .thumbnail {
    padding-bottom: 2em;
  }

  .footer {
    padding-top: 1em;
  }

  /*
     By default, CSS is locally scoped to the component,
     and any unused styles are dead-code-eliminated.
     In this page, Svelte can't know which elements are
     going to appear inside the {{{post.html}}} block,
     so we have to use the :global(...) modifier to target
     all elements inside .content
 */
  .content :global(pre) {
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    max-width: 100%;
    overflow-x: auto;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .content :global(blockquote) {
    background: #282828;
    border-left: 1em solid #484848;
    margin: 1.5em 1em;
    padding: 0.5em 1em;
    quotes: "\201C""\201D""\2018""\2019";
  }

  .content :global(blockquote):before {
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.6em;
  }

  .content :global(blockquote):after {
    content: close-quote;
    font-size: 1px;
  }

  .content :global(blockquote) :global(p) {
    display: block;
  }

  .content :global(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  .content :global(table) {
    border-collapse: collapse;
    width: 100%;
  }

  .content :global(th),
  .content :global(td) {
    text-align: left;
    padding: 0.8em;
  }

  .content :global(tr):nth-child(even) {
    background-color: #f9f9f9;
  }

  .content :global(hr) {
    text-align: center;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 3.8em;
  }

  .content :global(hr):after {
    content: "§";
    display: inline-block;
    position: relative;
    top: -0.7em;
    font-size: 1.5em;
    padding: 0 0.25em;
    background: #191919;
  }

  /*
   * .footnote-body is shown when JS is disabled because you can't click on it
   */
  .content :global(.foot-tooltip),
  .content :global(.footnote-body) {
    font-size: smaller;
    background-color: #282828;
    padding: 0.5em 1em;
    border-radius: 1em;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .content :global(.footnote-body) {
    opacity: 1;
  }

  .e-content :global(a):after {
    position: relative;
    content: "\FEFF°";
    margin: 0 0.15em;
    top: -0.10em;
    color: #ec53dd;
    font-feature-settings: "caps";
    font-variant-numeric: normal;
  }

  .e-content :global(.footnote-link):after,
  .e-content :global(.reference-link):after {
    display: none;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="content h-entry">
  <h1 class="p-name">{post.title}</h1>
  <img
    src="https://cdn.halcyonnouveau.xyz/blog/thumbnails/{post.thumbnail}?w=672&h=410"
    alt="thumbnail"
    class="thumbnail" />

  <div class="info-line">
    <small>{post.readtime}</small>

    <small>
      from {post.category} on
      <span class="dt-published">{post.date}</span>
    </small>
  </div>

  <div class="e-content">
    {@html post.html}
  </div>

  <div class="info-line footer">
    <small>
      <a href=".">&#8617 retour à accueil</a>
    </small>
    <small>
      <a
        href="https://github.com/beanpuppy/justin.duch.me/edit/master/_posts/{post.date}-{post.slug}.md">
        see a mistake? edit it here.
      </a>
    </small>
  </div>
</div>

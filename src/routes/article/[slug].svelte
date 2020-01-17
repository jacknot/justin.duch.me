<script context="module">
	import SubscribeForm from '../../components/SubscribeForm.svelte';

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`article/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
  	import Scroller from '../../components/Scroller.svelte';

	let progress;

	function toTop() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
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
		padding: 2em 0;
	}

	.text-decorate {
		cursor: pointer;
	}

	[slot="background"] {
		width: 100%;
		bottom: 1px;
	}

	[slot="background"] progress {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 100%;
		height: 2px;
		border: none;
		background: transparent;
		color: #000;
	}

	[slot="background"] progress::-moz-progress-bar {
		background: #000;
	}

	[slot="background"] progress::-webkit-progress-value {
		background: #000;
	}

	[slot="background"] progress::-webkit-progress-bar {
		background: transparent;
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
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.content :global(blockquote) {
		background: #f9f9f9;
		border-left: 10px solid #ccc;
		margin: 1.5em 10px;
		padding: 0.5em 10px;
		quotes: "\201C""\201D""\2018""\2019";
	}

	.content :global(blockquote):before {
		color: #ccc;
		content: open-quote;
		font-size: 4em;
		line-height: 0.1em;
		margin-right: 0.25em;
		vertical-align: -0.4em;
	}

	.content :global(blockquote) :global(p) {
		display: inline;
	}

	.content :global(img) {
		display: block;
		max-width: 100%;
		height: auto;
		margin-left: auto;
		margin-right: auto;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="content">
	<img src='https://cdn.halcyonnouveau.xyz/blog/thumbnails/{post.thumbnail}' alt='thumbnail' class='thumbnail'/>
	<h1>{post.title}</h1>

	<Scroller top={0} bottom={1} position="bottom" bind:progress>
		<div slot="background">
			<progress value={progress || 0}></progress>
		</div>

		<div slot="foreground">
			<div class='info-line'>
				<small>from {post.category} on {post.date}</small>
				<small><a href=".">&#8617 back</a></small>
			</div>

			{@html post.html}

			<div class='info-line footer'>
				<small on:click={toTop} class="text-decorate">back to top</small>
				<small><a href='https://github.com/beanpuppy/blog.justinduch.com/edit/master/_posts/{post.slug}.md'>see a mistake? edit it here.</a></small>
			</div>
		</div>
	</Scroller>
</div>

<SubscribeForm />

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
		import { onMount } from 'svelte';
		import Scroller from '../../components/Scroller.svelte';

		export let post;

		let progress;
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
				footHtml = footHtml.replace(/^\(([\d\w]+)\)\s*(.*)$/mg, (str, name, content) => content);

				currentId = footnoteId;
				currentDiv = document.createElement("div");
				currentDiv.innerHTML = footHtml;
				currentDiv.className = "foot-tooltip";
				parent.insertBefore(currentDiv, this.nextSibling);

				setTimeout(function () {
						currentDiv.style.opacity = "1";
				}, 0);
		}

		function toTop() {
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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

		:global(.darkmode--activated) [slot="background"] progress {
				color: #fff;
		}

		:global(.darkmode--activated) [slot="background"] progress::-moz-progress-bar {
				background: #fff;
		}

		:global(.darkmode--activated) [slot="background"] progress::-webkit-progress-value {
				background: #fff;
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

		:global(.darkmode--activated) .content :global(blockquote) {
				background: #0f0f0f;
		}

		.content :global(blockquote):before {
				color: #ccc;
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

		.content :global(a):hover {
				color: #484848;
				background-color: #eeeeee;
		}

		.content :global(table) {
				border-collapse: collapse;
				width: 100%;
		}

		.content :global(th), .content :global(td) {
				text-align: left;
				padding: 8px;
		}

		.content :global(tr):nth-child(even) {
				background-color: #f9f9f9;
		}

		/*
		 * .footnote-body is shown when JS is disabled and you can't click on it
		 */
		.content :global(.foot-tooltip), .content :global(.footnote-body) {
				color: #555;
				font-size: smaller;
				background-color: #ddd;
				padding: 5px 10px;
				border-radius: 10px;
				opacity: 0;
				transition: opacity 0.5s;
		}

		.content :global(.footnote-body) {
				opacity: 1;
		}

		:global(.darkmode--activated) .content :global(.foot-tooltip){
				color: #bbb;
				background-color: #222;
		}

		:global(.darkmode--activated) .content :global(tr):nth-child(even) {
				background-color: #0f0f0f;
		}

		:global(.darkmode--activated) :global(td),
		:global(.darkmode--activated) :global(th) {
				color: #fff;
		}
</style>

<svelte:head>
		<title>{post.title}</title>
</svelte:head>

<div class="content">
		<img src='https://cdn.halcyonnouveau.xyz/blog/thumbnails/{post.thumbnail}?w=672&h=410' alt='thumbnail' class='thumbnail'/>
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
								<small>
										<a href='https://github.com/beanpuppy/blog.justinduch.com/edit/master/_posts/{post.slug}.md'>
												see a mistake? edit it here.
										</a>
								</small>
						</div>
				</div>
		</Scroller>
</div>

<SubscribeForm />

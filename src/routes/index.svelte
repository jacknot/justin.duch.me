<script context="module">
	import { Card } from 'prisme-components-svelte';

	export function preload({ params, query }) {
		return this.fetch('article.json').then(r => r.json()).then(posts => {
			posts.sort(function(a, b){
				return new Date(b.date) - new Date(a.date);
			});

			return { posts };
		});
	}
</script>

<script>
	export let posts;
</script>

<style>
	a {
		text-decoration: none;
		padding: 0;
	}

	.container {
		display: flex;
		height: 100%;
	}

	:global(.darkmode--activated) .container {
		border: 1px solid rgb(225,225,225,0.3);
	}

	img {
		width: 235px;
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

	.info .feet {
		display: flex;
		justify-content: space-between;
		width: 100%;
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

	@media (max-width: 345px) {
		.feet {
			flex-direction: column;
		}
	}
</style>

<svelte:head>
	<title>accueil</title>
</svelte:head>

<h2>beinvenue</h2>

{#each posts as post}
	<!-- we're using the non-standard `rel=prefetch` attribute to
			tell Sapper to load the data for the page as soon as
			the user hovers over the link or taps it, instead of
			waiting for the 'click' event -->
	<a rel='prefetch' href='article/{post.slug}'>
		<Card bs="md" m="0 0 1em 0" h="100%">
			<div class="container">
				<img
					src='https://cdn.halcyonnouveau.xyz/blog/thumbnails/{post.thumbnail}?w=435&h=274'
					alt='{post.thumbnail}'
				/>
				<div class="info">
					<h4>{post.title}</h4>
					<div class="feet">
						<small>{post.readtime}</small>
						<small>from {post.category} on {post.date}</small>
					</div>
				</div>
			</div>
		</Card>
	</a>
{/each}

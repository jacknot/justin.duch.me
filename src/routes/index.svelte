<script context="module">
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
	}

	.container {
		box-shadow: 0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16);
		margin-bottom: 1em;
		display: flex;
		height: 8em;
		transition: all .5s ease;
	}

	.container .image {
		flex: 1 1 auto;
		border-radius: 5px 0 0 5px;
		display: block;
		max-width: 35%;
		height: auto;
	}

	@media (max-width: 420px) {
		.container .image {
			display: none;
		}
	}

	.thumbnail {
		width: 100%;
		height: 100%;
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
</style>

<svelte:head>
	<title>maison</title>
</svelte:head>

<h2>beinvenue</h2>

{#each posts as post}
	<!-- we're using the non-standard `rel=prefetch` attribute to
			tell Sapper to load the data for the page as soon as
			the user hovers over the link or taps it, instead of
			waiting for the 'click' event -->
	<a rel='prefetch' href='article/{post.slug}'>
		<div class="container">
			<div class="image">
				<img src='https://beanpuppy.sirv.com/blog/thumbnails/{post.thumbnail}' alt='thumbnail' class='thumbnail'/>
			</div>
			<div class="info">
				<h4>{post.title}</h4>
				<div class="feet">
					<small>{post.readtime}</small>
					<small>from {post.category} on {post.date}</small>
				</div>
			</div>
		</div>
	</a>
{/each}

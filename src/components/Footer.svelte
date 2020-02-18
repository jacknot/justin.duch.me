<script>
	import { Link } from 'prisme-components-svelte';

	// Yes, I'm too lazy to update this every year.
	let year = (new Date()).getFullYear();
</script>

<style>
	footer {
		margin-top: 1em;
		border-top: 1px solid rgba(0,0,0,0.1);
		display: flex;
		justify-content: space-between;
	}

	small {
		padding-top: 1em;
	}
</style>

<footer>
	<small>Justin Duch © {year}</small>
	<small>
		The content for this site is <Link href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</Link>.
		The <Link href="https://github.com/beanpuppy/blog.justinduch.com">code</Link> for this site is <Link href="https://opensource.org/licenses/MIT">MIT</Link>.
	</small>
</footer>

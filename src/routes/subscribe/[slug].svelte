<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`subscribe/${params.slug}`, {method: 'POST'});
		const data = await res.json();

		if (res.status === 200) {
			return data;
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let success;
</script>

<svelte:head>
	<title>subscribe</title>
</svelte:head>

{#if success}
	<h3>bienvenue</h3>
	<p>subscribed</p>
{:else}
	<h3>error</h3>
	<p>invalid code</p>
{/if}

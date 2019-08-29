<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`unsubscribe/${params.slug}`, {method: 'DELETE'});
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
	<title>unsubscribe</title>
</svelte:head>

{#if success}
	<p>unsubscribed</p>
{:else}
	<p>an error occured</p>
{/if}

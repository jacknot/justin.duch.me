<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV !== "production";
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<a href=".">retour</a>
<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}

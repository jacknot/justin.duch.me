<script>
	import { FormField } from 'prisme-components-svelte';

	const re = /^\S+@\S+$/;
	let email = '';
	let subscribed = false;
	let error = '';
	let loading = false;

	async function subscribe() {
		loading = true;

		if (email && re.test(email)) {
			const res = await fetch('submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({email})
			});

			const content = await res.json();

			if (content.email) {
				subscribed = true;
				error = '';
				email = '';
			} else {
				error = 'submit failed, please try again later';
			}
		} else {
			error = 'invalid email';
		}

		loading = false;
	}
</script>

<style>
	.error {
		color: red;
	}
</style>


<h3>Subscribe</h3>
<p>Want to get an email every time I post something? Enter your email address below.</p>
<small>I promise I won't spam you.</small>

{#if error }
	<br>
	<small class="error">{error}</small>
{/if}

<FormField bind:value={email} />

{#if !subscribed}
	<button class="subscribe" on:click={subscribe} disabled={loading}>{loading ? 'please wait' : 'subscribe'}</button>
{:else}
	<small>success! check your email inbox for to confirm verification!</small>
{/if}

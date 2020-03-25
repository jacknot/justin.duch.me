<script>
	import { onMount } from 'svelte';
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

	onMount(() => {
		// Stay hidden when JS is disabled because it doesn't work
		let form = document.getElementById('subform');
		form.style.display = 'block';
	});
</script>

<style>
	#subform {
		display: none;
	}

	div {
		display: inline-block;
		width: 100%;
	}

	div :global(input) {
		width: 99%;
		margin-bottom: 10px;
	}

	.error {
		color: red;
	}

	:global(.darkmode--activated) button {
		background-color: #000;
		color: white;
	}

	:global(.darkmode--activated) :global(input) {
		color: #fff !important;
		background-color: #000;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
	}
</style>


<div id="subform">
	<h3>Subscribe</h3>

	<p>Want to get an email every time I post something? Enter your email address below.</p>
	<small>I promise I won't spam you.</small>
	<FormField bind:value={email} />

	<div class="bottom">
		<small class="error">{error}</small>
		{#if !subscribed}
			<button class="subscribe" on:click={subscribe} disabled={loading}>{loading ? 'please wait' : 'subscribe'}</button>
		{:else}
			<small>success! check your email inbox for to confirm verification!</small>
		{/if}
	</div>
</div>

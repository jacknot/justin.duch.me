<script>
	let time = Math.round((new Date - new Date('2000-02-08T03:00:00+10:00')) / 1000);
	setInterval(() => { time += 1 }, 1000);

	let email = '';
	let subscribed = false;
	let error = '';

	async function subscribe() {
		if (email) {
			let re = /^\S+@\S+$/;

			if (!re.test(email)) {
				error = 'invalid email';
				return;
			}

			const res = await fetch('subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({email})
			});

			const content = await res.json();

			if (content.email) {
				subscribed = true;
				error = '';
				email = '';
			}
		} else {
			error = 'email is required';
		}
	}
</script>

<style>
	.error {
		color: red;
	}
</style>

<svelte:head>
	<title>sur</title>
</svelte:head>

<h2>whoami</h2>
<p>I am a person with opinions. Sometimes I publish those opinions to the internet. If you like or dislike my opinions you can email me about your own opinions here:</p>
<p><strong>Mail:</strong> justin@justinduch.com <a href="/publickey.txt">(PGP: 311DC918E44F90D5)</a></p>
<p>It should go without saying that all opinions are my own and do not reflect those of anyone I work for.</p>

<br>
<h2>FAQ</h2>
<p><strong>What Linux distro do you use?</strong> <br> Hannah Montana Linux.</p>
<p><strong>How many mechanical keyboards do you have?</strong> <br> Five.</p>
<p><strong>Cute boys or girls?</strong> <br> Both.</p>
<p><strong>Where's the body?</strong> <br> Behind the windmill.</p>
<p><strong>How old are you?</strong> <br> {time} seconds.</p>

<br>
<h2>Subscribe</h2>
<p>Want to get an email every time I post something? Enter your email address below.</p>
<small>I promise I won't spam you.</small>

{#if error }
	<br>
	<small class="error">{error}</small>
{/if}

<input bind:value={email} required />

{#if !subscribed}
	<button class="subscribe" on:click={subscribe}>subscribe</button>
{:else}
	<span>subscribed!</span>
{/if}

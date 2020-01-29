<script>
	import SubscribeForm from '../components/SubscribeForm.svelte';

	let time = Math.round((new Date - new Date('2000-02-08T22:00:00+10:00')) / 1000);
	setInterval(() => { time += 1 }, 1000);
</script>

<style>
	.links > p {
		padding-left: 1em;
		margin: 4px;
	}
</style>

<svelte:head>
	<title>a propos</title>
</svelte:head>

<h2>whoami</h2>
<p>I am a person with opinions. Sometimes I publish those opinions to the internet. Here are a few of my opinions so you know what you're getting into:</p>
<ul>
	<li>Garbage men and pick-up artists should change names.</li>
	<li>Anyone who calls a red panda a "lesser" panda should return to the dumpster they came from.</li>
	<li>Stone Ocean is the best JoJo part.</li>
	<li>The bourgeoisie are destroying our planet.</li>
</ul>
<small><strong>Disclamer:</strong> One of these is actually a fact, not an opinion.</small>
<p>If you like or dislike my opinions you can email me about your own opinions here:</p>
<p><strong>Mail:</strong> justin@justinduch.com <a href="/publickey.txt">(PGP: 311DC918E44F90D5)</a></p>
<p>It should go without saying that all opinions are my own and do not reflect those of anyone I work for.</p>

<br>
<h2>links</h2>
<p>Want to stalk me around the Internet? Here's a handly list.</p>
<div class="links">
	<p><a href="https://github.com/beanpuppy"><i class="fab fa-github"></i> GitHub</a></p>
	<p><a href="https://www.instagram.com/beanpup.py/"><i class="fab fa-instagram"></i> Instagram</a></p>
	<p><a href="https://twitter.com/beanpup_py"><i class="fab fa-twitter"></i> Twitter</a></p>
	<p><a href="https://eldritch.cafe/@beanpup_py"><i class="fab fa-mastodon"></i> Mastodon</a></p>
	<p><a href="https://curiouscat.me/beanpup_py"><i class="fa fa-cat"></i> Curious Cat</a></p>
</div>

<br>
<h2>faq</h2>
<p><strong>How many mechanical keyboards do you have?</strong> <br> Five.</p>
<p><strong>Cute boys or girls?</strong> <br> Both.</p>
<p><strong>What Operating System do you use?</strong> <br> <a href="/article/i_use_arch_btw" target="_blank">NodeJS.</a></p>
<p><strong>How old are you?</strong> <br> {time} seconds.</p>
<p><strong>Where were you on Sunday 22 November 2015?</strong> <br> At a friend's house.</p>
<p><strong>Are these questions actually frequently asked?</strong> <br> Yes.</p>
<p><strong>UwU?</strong> <br> NO!</p>

<br>

<SubscribeForm />

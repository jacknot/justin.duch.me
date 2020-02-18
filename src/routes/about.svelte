<script>
	import { Link } from 'prisme-components-svelte';
	import SubscribeForm from '../components/SubscribeForm.svelte';

	let time = Math.round((new Date - new Date('2000-02-08T22:00:00+10:00')) / 1000);
	setInterval(() => { time += 1 }, 1000);
</script>

<style>
	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.links > p {
		margin: 10px;
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
<p><strong>Mail:</strong> justin@justinduch.com <Link href="/publickey.txt">(PGP: 311DC918E44F90D5)</Link></p>
<p>It should go without saying that all opinions are my own and do not reflect those of anyone I work for.</p>

<br>
<h2>links</h2>
<p>Want to stalk me around the Internet? Here's a handly list.</p>
<div class="links">
	<p><i class="fab fa-github"></i> <Link href="https://github.com/beanpuppy">GitHub</Link></p>
	<p><i class="fab fa-instagram"></i> <Link href="https://www.instagram.com/beanpup.py/">Instagram</Link></p>
	<p><i class="fab fa-twitter"></i> <Link href="https://twitter.com/beanpup_py">Twitter</Link></p>
	<p><i class="fab fa-mastodon"></i> <Link href="https://eldritch.cafe/@beanpup_py">Mastodon</Link></p>
	<p><i class="fa fa-film"></i> <Link href="https://myanimelist.net/profile/beanpup_py">MyAnimeList</Link></p>
	<p><i class="fa fa-cat"></i> <Link href="https://curiouscat.me/beanpup_py">Curious Cat</Link></p>
	<p><i class="fa fa-music"></i> <Link href="https://music.apple.com/profile/beanpup_py">Apple Music</Link></p>
	<p><i class="fa fa-cube"></i> <Link href="https://www.hackthebox.eu/profile/65491">Hack The Box</Link></p>
</div>

<br>
<h2>faq</h2>
<p><strong>How many mechanical keyboards do you have?</strong> <br> Five.</p>
<p><strong>Cute boys or girls?</strong> <br> Both.</p>
<p><strong>Are you actually okay with people stalking you?</strong> <br> I hardly use social media, there isn't much to stalk. This site is a better representation of me then all of those combined.</p>
<p><strong>How old are you?</strong> <br> {time} seconds.</p>
<p><strong>What Operating System do you use?</strong> <br> <Link href="/Linkrticle/i_use_arch_btw">NodeJS.</Link></p>
<p><strong>Where were you on Sunday 22 November 2015?</strong> <br> At a friend's house.</p>
<p><strong>I can‘t tell when you‘re joking or being serious.</strong> <br> Questions only please.</p>

<br>
<SubscribeForm />

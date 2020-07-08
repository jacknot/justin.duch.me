<script>
  let time = Math.round(
    (new Date() - new Date("2000-02-08T22:00:00+10:00")) / 1000
  );

  setInterval(() => {
    time += 1;
  }, 1000);
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
<p>
  I am a
  <s>person</s>
  <a href="/post/i_am_a_fish">fish</a>
  with opinions. Sometimes I publish those opinions to the internet. Here are a
  few of my opinions so you know what you're getting into:
</p>
<ul>
  <li>Garbage men and pick-up artists should change names.</li>
  <li>
    Anyone who calls a red panda a "lesser" panda should return to the dumpster
    they came from.
  </li>
  <li>Stone Ocean is the best JoJo part.</li>
  <li>The bourgeoisie are destroying our planet.</li>
</ul>
<small>
  <strong>Disclamer:</strong>
  One of these is actually a fact, not an opinion.
</small>
<p>
  If you like or dislike my opinions you can email me about your own opinions
  here:
</p>
<p>
  <strong>Mail:</strong>
  justin@justinduch.com
  <a href="/publickey.txt">(PGP: 311DC918E44F90D5)</a>
</p>
<p>
  It should go without saying that all opinions are my own and do not reflect
  those of anyone I work for.
</p>

<br />
<h2>links</h2>
<p>Want to stalk me around the Internet? Here's a handly list.</p>
<div class="links">
  <p>
    <i class="fab fa-github" />
    <a href="https://github.com/beanpuppy" rel="me">GitHub</a>
  </p>
  <p>
    <i class="fab fa-instagram" />
    <a href="https://www.instagram.com/beanpup.py/" rel="me">Instagram</a>
  </p>
  <p>
    <i class="fab fa-twitter" />
    <a href="https://twitter.com/beanpup_py" rel="me">Twitter</a>
  </p>
  <p>
    <i class="fab fa-mastodon" />
    <a href="https://eldritch.cafe/@beanpup_py" rel="me">Mastodon</a>
  </p>
</div>

<br />
<h2>faq</h2>
<p>
  <strong>Cute boys or girls?</strong>
  <br />
  Both.
</p>
<p>
  <strong>
    Why is does this site use a JavaScript framework? I'm a grumpy old man who
    spends all day on Hacker News and cowers at the sight of anything resembling
    the modern web because I'm constantly afraid of being left behind.
  </strong>
  <br />
  Wow ok, that was too much information. FYI, I've put a lot of work in making
  it work with JavaScript disabled so just do that.
</p>
<p>
  <a href="/post/i_use_arch_btw">
    <strong>What Operating System do you use?</strong>
  </a>
  <br />
  NodeJS.
</p>
<p>
  <strong>I can't tell when you're joking or being serious.</strong>
  <br />
  Questions only please.
</p>
<p>
  <strong>
    Why do you have these poorly drawn pictures for every post? I'm the same
    grumpy old man in the previous question and I only visit websites that are
    in plaintext with no styling because I HATE the modern web. I wish this was
    the 90s when I actually knew what was going on.
  </strong>
  <br />
  You really don't need to tell me all of that. But since I have no design
  creativity, those images are the only amount of character I know how to give
  to this boring site.
</p>
<p>
  <strong>Why is there random French everywhere?</strong>
  <br />
  It was originally going to be Japanese, but then I remembered that I don't
  know any Japansese. Also I don't want people to think I'm a weeb, because I'm
  definitely, absolutely 100% NOT.
</p>
<p>
  <strong>How old are you?</strong>
  <br />
  {time}* seconds.
</p>
<p>
  <strong>
    I'm a person you know in real life, and I just came here to ask why didn't
    you tell me about this site of yours? I think it's really neat and gives me
    a lot of insight into that closed off brain of yours.
  </strong>
  <br />
  Right, reading all these Pokèmon reviews will surely allow you to connect with
  me on an emotional level. And who can forget about my loosely constructed
  rambles about technology (a la every post) that really make you
  <strong>feel</strong>
  like the man behind the words.
</p>
<p>
  <strong>Were your parents supportive when you came out as a weeb?</strong>
  <br />
  Question time is over.
</p>

<p>
  <small>
    * I don't have a dead man's switch to stop this timer when I die, so it
    might be wrong.
  </small>
  <br />
</p>

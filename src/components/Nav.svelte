<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-weight: 300;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1em;
	}

	.nav-highlight {
		border-bottom: 1px solid rgba(0,0,0);
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(0,0,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	.title {
		color: black;
		font-weight: bold;
	}

	@media (max-width: 414px) {
		.title {
			display: none;
		}
	}
</style>

<nav class='{segment === "article" ? "nav-highlight" : ""}'>
	<ul>
		<li><a class="title" href='.'>ici ¿uᴉʇsnɾ</a></li>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>accueil</a></li>
		<li><a class='{segment === "about" ? "selected" : ""}' href='about'>a propos</a></li>
	</ul>

	<ul>
		<li><a class="navbar-link navbar-social-icon" aria-label="Github" href="https://github.com/beanpuppy"><i class="fab fa-github"></i></a></li>
		<li><a class="navbar-link navbar-social-icon" aria-label="Instagram" href="https://www.instagram.com/beanpup.py/"><i class="fab fa-instagram"></i></a></li>
		<li><a class="navbar-link navbar-social-icon" aria-label="Twitter" href="https://twitter.com/beanpup_py"><i class="fab fa-twitter"></i></a></li>
		<li><a class="navbar-link navbar-social-icon" aria-label="Mastodon" rel="me" href="https://eldritch.cafe/@beanpup_py"><i class="fab fa-mastodon"></i></a></li>
	</ul>
</nav>

<script>
  export let segment;
</script>

<style>
  nav-outer {
    display: flex;
  }

  nav {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    width: 100%;
  }

  :global(.darkmode--activated) nav {
    border-bottom: 1px solid rgba(225, 225, 225, 0.5);
  }

  .nav-highlight {
    border-bottom: 1px solid rgba(0, 0, 0);
  }

  :global(.darkmode--activated) .nav-highlight {
    border-bottom: 1px solid rgba(225, 225, 225);
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
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
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(0, 0, 0);
    display: block;
    bottom: -1px;
  }

  :global(.darkmode--activated) .selected::after {
    background-color: rgba(225, 225, 225);
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  a:hover {
    color: inherit;
    background-color: inherit;
  }

  img {
    width: 65px;
    margin: 0 5px 5px 5px;
    content: url(/icon.svg);
  }

  :global(.darkmode--activated) img {
    content: url(/icon-dark.svg);
  }
</style>

<nav-outer>
  <img
    title="I drew this horse when I was 14 for a Pokèmon fourm."
    alt="icon" />

  <nav class={segment === 'article' ? 'nav-highlight' : ''}>
    <ul>
      <li>
        <a class={segment === undefined ? 'selected' : ''} href=".">accueil</a>
      </li>
      <li>
        <a class={segment === 'about' ? 'selected' : ''} href="about">
          à propos
        </a>
      </li>
    </ul>

    <ul>
      <li>
        <a
          class="navbar-link navbar-social-icon"
          aria-label="RSS"
          href="/api/feed">
          <i class="fas fa-rss-square" />
        </a>
      </li>
    </ul>
  </nav>
</nav-outer>

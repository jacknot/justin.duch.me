<script>
  // Yes, I'm too lazy to update this every year.
  let year = new Date().getFullYear();
</script>

<style>
  footer {
    margin-top: 1em;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 630px) {
    footer {
      flex-direction: column;
    }
  }

  :global(.darkmode--activated) footer {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  small {
    padding-top: 1em;
  }

  a:hover {
    color: #484848;
    background-color: #eeeeee;
  }

  .h-card {
    text-decoration: none;
    color: inherit;
  }

  .h-card:hover {
    color: inherit;
    background-color: inherit;
  }
</style>

<footer>
  <small>
    <a class="h-card" href="https://blog.justinduch.com">Justin Duch</a>
    © {year}
  </small>
  <small>
    The content for this site is
    <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</a>
    . The
    <a href="https://github.com/beanpuppy/blog.justinduch.com">code</a>
    for this site is
    <a href="https://opensource.org/licenses/MIT">MIT</a>
    .
  </small>
</footer>

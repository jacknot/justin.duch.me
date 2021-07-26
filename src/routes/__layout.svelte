<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    max-width: 42em;
    padding: 12em 5em 5em 5em;
  }

  @media screen and (max-width: 724px) {
    main {
      padding: 8em 2em 2em 2em;
    }
  }
</style>

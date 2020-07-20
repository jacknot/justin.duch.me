<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";

  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  import PageLoadingBar from "../components/PageLoadingBar.svelte";

  export let segment;

  const { preloading } = stores();

  onMount(() => {
    window.goatcounter.count({
      path: location.pathname + location.search + location.hash
    });
  });
</script>

<style>
  main {
    position: relative;
    max-width: 46em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<PageLoadingBar {preloading} />

<main>
  <Nav {segment} />
  <slot />
  <Footer />
</main>

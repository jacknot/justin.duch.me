<script>
  import { onMount } from "svelte";

  export let progress = 0;

  let top = 0;
  let bottom = 1;
  let wh = 0;
  let foreground;

  $: hide_class = progress <= 0 || progress >= 1 ? "hide" : "show";
  $: top_px = Math.round(top * wh);
  $: bottom_px = Math.round(bottom * wh);

  $: top, bottom, update();

  onMount(() => {
    update();
    window.addEventListener("scroll", update);
  });

  function update() {
    if (!foreground) return;

    const fg = foreground.getBoundingClientRect();

    const foreground_height = fg.bottom - fg.top;
    const available_space = bottom_px - top_px;

    progress = (top_px - fg.top) / (foreground_height - available_space);
  }
</script>

<style>
  .hide {
    opacity: 0;
  }

  .show {
    opacity: 1;
  }

  svelte-scroller-outer {
    display: block;
    position: relative;
  }

  svelte-scroller-background {
    position: fixed;
    display: flex;
    top: 0px;
    -moz-box-align: center;
    align-items: center;
    height: 100vh;
    z-index: 3;
    margin-left: -550px;
    transition: opacity 0.4s linear 0s, visibility 0.4s linear 0s;
  }

  @media (max-width: 1440px) {
    svelte-scroller-background {
      margin-left: -400px;
    }
  }

  svelte-scroller-foreground {
    display: block;
    position: relative;
    z-index: 2;
  }

  svelte-scroller-foreground::after {
    content: " ";
    display: block;
    clear: both;
  }

  progress {
    transform: rotate(90deg);
    width: calc(-40px + 52vh);
    height: 1px;
    border: none;
    background: #bbb;
    color: #000;
  }

  progress::-moz-progress-bar {
    background: #000;
  }

  progress::-webkit-progress-value {
    background: #000;
  }

  progress::-webkit-progress-bar {
    background: #bbb;
  }

  :global(.darkmode--activated) progress {
    color: #fff;
    background: #444;
  }

  :global(.darkmode--activated) progress::-moz-progress-bar {
    background: #fff;
  }

  :global(.darkmode--activated) progress::-webkit-progress-value {
    background: #fff;
  }
</style>

<svelte:window bind:innerHeight={wh} />

<svelte-scroller-outer>
  <svelte-scroller-background class={hide_class}>
    <progress value={progress || 0} />
  </svelte-scroller-background>

  <svelte-scroller-foreground bind:this={foreground}>
    <slot name="foreground" />
  </svelte-scroller-foreground>
</svelte-scroller-outer>

<script>
  import { onMount } from "svelte";

  export let progress = 0;

  let top = 0;
  let bottom = 1;
  let wh = 0;
  let foreground;
  let margin = 0;

  $: top_px = Math.round(top * wh);
  $: bottom_px = Math.round(bottom * wh);

  onMount(() => {
    updatePos();
    updateMargin();
    window.addEventListener("scroll", updatePos);
    window.addEventListener('resize', updateMargin);
  });

  function updatePos() {
    if (!foreground) return;

    const fg = foreground.getBoundingClientRect();

    const foreground_height = fg.bottom - fg.top;
    const available_space = bottom_px - top_px;

    progress = (top_px - fg.top) / (foreground_height - available_space);
  }

  function updateMargin() {
    // Get margin of main so it's always near the middle
    const p = document.getElementsByTagName("main")[0]
    const style = p.currentStyle || window.getComputedStyle(p);
    const m = parseInt(style.marginLeft, 10);

    if (m < 350) {
      margin = `-350px`;
    } else {
      margin = `-${m}px`;
    }
  }
</script>

<style>
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
    transition: opacity 0.4s linear 0s, visibility 0.4s linear 0s;
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
  <svelte-scroller-background style="margin-left: {margin}; opacity: {progress <= 0 || progress >= 1 ? '0' : '1'}">
    <progress value={progress || 0} />
  </svelte-scroller-background>

  <svelte-scroller-foreground bind:this={foreground}>
    <slot name="foreground" />
  </svelte-scroller-foreground>
</svelte-scroller-outer>

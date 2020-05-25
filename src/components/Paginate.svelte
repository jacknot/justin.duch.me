<script>
  export let page;
  export let next;
</script>

<style>
  .space-yo {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  a {
    text-decoration: none;
    padding: 0;
  }
</style>

<div class="space-yo">
  <div>
    {#if page !== 1 && !isNaN(page)}
      <a href="/?page={page - 1}">back</a>
    {/if}
  </div>
  <div>
    {#if next}
      <a href="/?page={isNaN(page) ? 2 : page + 1}">next</a>
    {/if}
  </div>
</div>

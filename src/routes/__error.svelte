<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        title: status
      }
    };
  }
</script>

<script>
  export let title;
</script>

<div class="space-yo">
  <h1>error : {title}</h1>
  <small><a href="/">&#9166; retour</a></small>
</div>

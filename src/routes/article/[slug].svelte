<script context="module">
  export async function preload({ params }) {
    this.redirect(302, `/post/${params.slug}`);
  }
</script>

<p>
  <code>/article</code>
  is deprecated.
</p>

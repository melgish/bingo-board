<script>
  import Ball from '../src/Ball.svelte'
  export let lit = false
</script>

<Ball {lit} on:flip={() => (lit = !lit)}>{lit}</Ball>

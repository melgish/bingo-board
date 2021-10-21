<script>
  import { coverAll } from "./game-maps.js"

  // 5x5 array defaults to cover-all
  export let game = coverAll
</script>

<div class="grid" on:click role="button">
  {#each game as row}
    {#each row as col}
      <div class:lit={col} />
    {/each}
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-rows: repeat(5 1fr);
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.125rem;
    background-color: white;
  }
  .grid > div {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border: 1px dashed #600;
  }
  .grid > div.lit {
    background-color: #600;
  }
</style>

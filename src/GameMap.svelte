<script>
  import { coverAll } from "./game-maps.js"
  // 5x5 array defaults to cover-all
  export let game = coverAll
</script>

<button type="button" on:click aria-label="Select Game">
  {#each game as row}
    {#each row as col}
      <div class:filled={col} />
    {/each}
  {/each}
</button>

<style>
  button {
    /* strip styling from the button */
    padding: 0;
    margin: 0;
    border: 0;
    border-radius: 0;

    display: grid;
    grid-template-rows: repeat(5 1fr);
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.125rem;
    background-color: white;
  }
  button:hover,
  button:focus {
    outline: 2px solid red;
  }

  div {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border: 1px dashed #600;
  }
  div.filled {
    background-color: #600;
  }
</style>

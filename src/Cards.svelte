<script>
  import { onMount } from "svelte"
  import Button from "./Button.svelte"
  import Card from "./Card.svelte"
  import { getCard, getSeed } from "./bingo-utils.js"

  $: cards = []

  // Generate a set of cards on page load.
  onMount(() => load())

  // Generate a new set of cards on demand.
  function load() {
    cards = Array.from({ length: 4 }, () => getCard(getSeed()))
  }
</script>

<div class="no-print">
  <Button on:click={load}>Generate Cards</Button>
  <Button on:click={window.print}>Print</Button>
  <span>For best results print in portrait with minimal margins.</span>
</div>
<div class="frame">
  <div class="cards" data-testid="cards">
    {#each cards as card}
      <Card {card} />
    {/each}
  </div>
</div>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.25rem;
  }
  .frame {
    display: inline-block;
  }
</style>

<script>
  import Button from "./Button.svelte";
  import Card from "./Card.svelte";

  import { getCard, getSeed } from "./bingo-utils.js";

  $: cards = load();

  function load() {
    return Array.from({ length: 4 }, () => getCard(getSeed()));
  }

  function print() {
    window.print();
  }
</script>

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

<div class="no-print">
  <Button on:click={() => (cards = load())}>
    Generate Cards
  </Button>
  <Button on:click={print}>Print</Button>
  <span>For best results print in portrait with minimal margins.</span>
</div>
<div class="frame">
  <div class="cards" data-testid="cards">
    {#each cards as card}
      <Card {card} />
    {/each}
  </div>
</div>

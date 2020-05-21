<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing'
  import Button from './Button.svelte';
  import Ball from "./Ball.svelte";
  import Letter from "./Letter.svelte";
  import calls from "./calls.store.js";
  import Card from './Card.svelte';

  import { getCard, getSeed } from './bingo-utils.js';

  $: cards = (location && load()) || [];

  function load() {
    return Array.from({length:4}, () => getCard(getSeed()));
  }

  function print() {
    window.print();
  }
</script>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: .25rem;
  }
  .frame {
    display: inline-block;
  }
</style>
<div class="no-print">
  <Button on:click="{() => cards = load()}">Generate Cards</Button>
  <Button on:click="{() => print()}">Print</Button>
  <span>For best results print in portrait with minimal margins.</span>
</div>
<div class="frame">
  <div class="cards">
    {#each cards as card}
      <Card {card}></Card>
    {/each}
  </div>
</div>

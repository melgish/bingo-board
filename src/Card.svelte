<script>
  import Ball from "./Ball.svelte";
  import Letter from "./Letter.svelte";
  import { GAME } from './bingo-utils.js';

  export let card = { rows: [], seed: 0 };
  export let calls = {};
</script>

<style>
  .card {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 3rem);
    user-select: none;
    margin-bottom: 1rem;
    justify-items: stretch;
    align-content: center;
    background-color: silver;
    border: 2px solid silver;
    grid-gap: 0;
    color: black;
  }

  .card .foot {
    grid-column-start: 1;
    grid-column-end: 6;
    text-align: center;
    padding: 0.25rem 0;
  }

  .foot {
    font-weight: bold;
  }

  @media print {
    .card {
      color: black;
      border: 1px solid black;
    }
  }
</style>

<div class="card">
  {#each GAME as letter}
    <Letter {letter} />
  {/each}

  {#each card.rows as row}
    {#each row as col}
      <Ball lit={calls[col]}>{col || 'free'}</Ball>
    {/each}
  {/each}
  <div class="foot">{card.seed}</div>
</div>

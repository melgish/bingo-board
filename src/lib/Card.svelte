<script lang="ts">
  import Ball from "./Ball.svelte"
  import Letter from "./Letter.svelte"
  import { GAME } from "./bingo-utils"

  export let card: { seed: number; rows: number[][] }
  export let calls: { [key: number]: boolean } = {}
</script>

<div class="card" data-testid="card">
  {#each GAME as letter}
    <Letter {letter} />
  {/each}

  {#each card.rows as row}
    {#each row as col}
      <Ball checked={calls[col]}>{col || "free"}</Ball>
    {/each}
  {/each}
  <div class="foot">{card.seed}</div>
</div>

<style>
  .card {
    display: grid;
    grid-template-columns: repeat(5, 0.8in);
    grid-template-rows: 0.5in repeat(5, 0.8in) 0.25in;
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

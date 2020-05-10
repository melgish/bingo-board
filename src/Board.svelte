<script>
  import Button from "./Button.svelte";
  import Ball from "./Ball.svelte";
  import Letter from "./Letter.svelte";
  import Card from "./Card.svelte";
  import GameMaps from "./GameMaps.svelte";
  import calls from "./calls.store.js";
  import { getCard, BOARD, GAME } from "./bingo-utils.js";

  /**
   * card being inspected
   */
  let card = null;

  /**
   * Seed for input / card being inspected
   */
  let seed = null;

  /**
   *  Create rows to display letter
   */
  let rows = GAME.split("").map((letter, i) => ({
    letter,
    balls: BOARD[i]
  }));

  /**
   * Clear the card being inspected
   */
  function clearCard() {
    card = null;
    seed = null;
  }

  /**
   * Check the card made from current seed
   */
  function checkCard() {
    if (seed > 9999) {
      card = getCard(seed);
    }
  }

  /**
   * Reset the game
   */
  function resetGame() {
    calls.reset();
    clearCard();
  }

  /**
   * Flip a single ball
   *
   * @param {number} ball ball to flip.
   */
  function flip(ball) {
    calls.flip(ball);
  }
</script>

<style>
  .board {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(5, 3rem);
    grid-gap: 0.125rem;
    user-select: none;
    margin-bottom: .25rem;
    background-color: #333;
    justify-items: stretch;
    align-content: center;
    padding: 2px;
    border: 1px solid #600;
  }
  input {
    font-size: 12pt;
    font-weight: bold;
    color: #600;
    border-radius: 0.5rem;
    border-color: #600;
  }
  .check-card {
    width: 50%;
  }

 </style>

<div class="board">
  {#each rows as row}
    <Letter letter={row.letter} />
    {#each row.balls as ball}
      <Ball lit={$calls[ball]} on:flip={() => flip(ball)}>{ball}</Ball>
    {/each}
  {/each}
</div>

<GameMaps></GameMaps>
<div>
  <Button on:click={resetGame}>Reset Game</Button>
  <input
    type="number"
    min="10000"
    max="99999"
    placeholder="card #"
    bind:value={seed}
    disabled={card} />
  {#if card}
    <Button on:click={clearCard}>Clear</Button>
  {:else}
    <Button on:click={checkCard} disabled={!(seed && seed > 9999)}>
      Check Card
    </Button>
  {/if}
</div>
{#if card}
<div class="check-card">
  <Card {card} calls={$calls} />
</div>
{/if}

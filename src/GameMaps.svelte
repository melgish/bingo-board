<script>
  import { onMount } from "svelte";
  import GameMap from "./GameMap.svelte";
  import { GAME_MAPS, normals } from "./game-maps.js";

  let active = GAME_MAPS[0];
  let n = 0;

  onMount(() => {
    const i = setInterval(() => {
      if (active === normals) {
        n = (n + 1) % normals.length;
      }
    }, 500);

    return () => clearInterval(i);
  });
</script>

<style>
  .games {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.25rem;
  }
  .games > div {
    opacity: 0.5;
    margin-right: 0.5rem;
  }
  .games > div.active {
    opacity: 1;
  }
</style>

<div class="games">
  <div class:active={normals == active}>
    <GameMap game={normals[n]} on:click={() => (active = normals)} />
  </div>
  {#each GAME_MAPS as game}
    <div class:active={game == active}>
      <GameMap {game} on:click={() => (active = game)} />
    </div>
  {/each}
</div>

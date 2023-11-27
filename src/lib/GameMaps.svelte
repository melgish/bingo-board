<script lang="ts">
  import { onMount } from "svelte"
  import GameMap from "./GameMap.svelte"
  import { GAME_MAPS, normals } from "./game-maps"

  let active: (typeof normals)|(typeof normals[0]) = GAME_MAPS[0]
  let n = 0

  const advanceNormals = () => {
    if (active === normals) {
      n = (n + 1) % normals.length
    }
  }

  onMount(() => {
    // Animate normal game every 1/2 second
    const i = setInterval(advanceNormals, 500)
    return () => clearInterval(i)
  })
</script>

<div class="games" data-testid="games">
  <div class:active={normals == active}>
    <GameMap game={normals[n]} on:click={() => (active = normals)} />
  </div>
  {#each GAME_MAPS as game}
    <div class:active={game == active}>
      <GameMap {game} on:click={() => (active = game)} />
    </div>
  {/each}
</div>

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

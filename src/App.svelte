<script>
  import { Router, Route, Link, navigate } from 'svelte-routing';
  import Button from './Button.svelte';
  import Board from './Board.svelte';
  import Cards from './Cards.svelte';
  import { getSeed, GAME } from './bingo-utils.js';

  export let url = '';
</script>

<style>
.contianer {
  padding: 1rem 2rem;
}
nav {
  margin-bottom: 4px;
}
.nav-logo {
  display: inline-block;
  font-size: 18pt;
  font-weight: bold;
  font-variant: small-caps;
  color: #600;
}
.nav-item {
  border: 2px solid silver;
  border-radius: 1rem;
  padding: .25rem .75rem;
  font-size: 18pt;
  display: inline-block
}
</style>

<div class="contianer">
<Router {url}>
  <nav class="no-print">
    <div class="nav-logo">Nick's Cheapo {GAME} Game:</div>
    <div class="nav-item">
      <Link to="/board">Board</Link>
    </div>
    <div class="nav-item">
      <Link to="/cards">Cards</Link>
    </div>
   </nav>
  <div>
    <Route path="cards" component="{Cards}"></Route>
    <Route path="board" component="{Board}"></Route>
    <Route path="" component="{Board}"></Route>
  </div>
</Router>
</div>

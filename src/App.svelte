<script>
  import { Router, Route, Link } from "svelte-routing"
  import { GAME } from "./bingo-utils.js"
  import Board from "./Board.svelte"
  import Cards from "./Cards.svelte"

  export let url = ""
</script>

<div class="contianer">
  <Router {url}>
    <nav class="no-print">
      <div class="nav-logo">Nick's Cheapo {GAME} Game:</div>
      <div class="nav-item">
        <Link to="/">Board</Link>
      </div>
      <div class="nav-item">
        <Link to="/cards">Cards</Link>
      </div>
    </nav>
    <div>
      <Route path="cards"><Cards /></Route>
      <Route><Board /></Route>
    </div>
  </Router>
</div>

<style>
  .contianer {
    padding: 1rem 2rem;
  }
  nav {
    margin-bottom: 4px;
  }
  .nav-logo {
    display: inline-block;
    font-size: 16pt;
    font-weight: bold;
    font-variant: small-caps;
    color: #600;
  }
  .nav-item {
    border: 2px solid silver;
    border-radius: 1rem;
    padding: 0.125rem 0.75rem;
    font-size: 14pt;
    display: inline-block;
    margin-top: -4px;
  }
</style>

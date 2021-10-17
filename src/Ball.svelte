<script>
  import { createEventDispatcher } from 'svelte'
  // true when highlighted
  export let lit = false
  const dispatch = createEventDispatcher()

  $: hot = false

  function flip() {
    hot = true
    dispatch('flip')
    setTimeout(() => (hot = false), 2000)
  }
</script>

<div role="button" class:hot class:lit on:click={flip}>
  <span>
    <slot />
  </span>
</div>

<style>
  div {
    display: grid;
    justify-items: center;
    align-content: center;
    text-align: center;
  }

  span {
    display: grid;
    width: 40pt;
    height: 36pt;
    border-radius: 50px;
    font-size: 24pt;
    font-weight: bold;
  }
  @media screen {
    div {
      background-color: black;
      color: white;
      transition: background-color 2s ease;
      border: 1px solid #300;
    }
    div.hot {
      background-color: #cc0;
    }
    span {
      border-radius: 50%;
      border: 1pt solid currentColor;
      transition: background-color 1s ease;
    }
    .lit span {
      background-color: white;
      color: black;
    }
  }

  @media print {
    div {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
    span {
      border: 1px solid silver;
    }
  }
</style>

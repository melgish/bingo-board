<script>
  import { createEventDispatcher } from "svelte"
  // true when highlighted
  export let checked = false
  const dispatch = createEventDispatcher()

  $: hot = false

  /**
   * Sends event that switch wants to be flipped
   */
  function flip() {
    hot = true
    dispatch("flip")
    setTimeout(() => (hot = false), 2000)
  }
</script>

<button role="switch" aria-checked={!!checked} class:hot on:click={flip}>
  <div><slot /></div>
</button>

<style>
  [role="switch"] {
    /* strip styling from the button */
    padding: 0;
    margin: 0;
    border: 0;
    border-radius: 0;
    /* change container type */
    display: grid;
    justify-items: center;
    align-content: center;
    text-align: center;
  }
  [role="switch"]:hover,
  [role="switch"]:focus {
    outline: 2px solid red;
  }
  div {
    display: grid;
    width: 40pt;
    height: 36pt;
    border-radius: 50px;
    font-size: 24pt;
    font-weight: bold;
  }
  @media screen {
    [role="switch"] {
      background-color: black;
      color: white;
      transition: background-color 2s ease;
      border: 1px solid #300;
    }
    .hot {
      background-color: #cc0;
    }
    div {
      border-radius: 50%;
      border: 1pt solid currentColor;
      transition: background-color 1s ease;
    }
    [aria-checked="true"] div {
      background-color: white;
      color: black;
    }
  }

  @media print {
    [role="switch"] {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
    div {
      border: 1px solid silver;
    }
  }
</style>

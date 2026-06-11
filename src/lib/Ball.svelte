<script lang="ts">
  // spell-checker: ignore onflip

  interface Props {
    // true when highlighted
    checked?: boolean
    children?: import("svelte").Snippet
    onflip?: () => void
  }

  let { checked, children, onflip }: Props = $props()

  let hot = $state(false)

  /**
   * Sends event that switch wants to be flipped
   */
  function flip() {
    hot = true
    onflip?.()
    setTimeout(() => (hot = false), 2000)
  }
</script>

<button role="switch" aria-checked={!!checked} class:hot onclick={flip}>
  <div>{@render children?.()}</div>
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
    outline: 3px solid red;
    outline-offset: -3px;
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

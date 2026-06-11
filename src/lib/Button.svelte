<script lang="ts">
  interface Props {
    disabled?: boolean
    type?: any
    children?: import("svelte").Snippet
    onclick: () => void;
  }

  let {
    disabled = false,
    onclick,
    type = "button" as "button",
    children,
  }: Props = $props()
</script>

<button onclick={onclick} {type} {disabled}>
  {@render children?.()}
</button>

<style>
  button {
    font-weight: bold;
    background-color: #600;
    border-color: #300;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
  button:disabled {
    background-color: #66000080;
  }
</style>

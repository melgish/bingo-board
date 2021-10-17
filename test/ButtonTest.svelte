<script>
  import Button from "../src/Button.svelte"
  export let disabled = false
  export let text = "waiting"
</script>

<Button {disabled} on:click={() => (text = "clicked")}>{text}</Button>

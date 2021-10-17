<script>
  export let disabled = false
</script>

<button on:click type="button" {disabled}>
  <slot />
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

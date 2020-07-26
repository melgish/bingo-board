<script>
  /** @type string */
  export let letter = "B";
</script>

<style>
  div {
    display: grid;
    justify-items: center;
    align-content: center;
    text-align: center;
  }

  span {
    display: grid;
    width: 36pt;
    height: 26pt;
    font-size: 26pt;
    font-weight: bold;
    margin-top: -22px;
  }

  @media screen {
    div {
      background-color: #600;
      color: #fee;
      border: 1px solid #300;
    }
  }

  @media print {
    div {
      background-color: silver;
      color: black;
      border: 1px solid black;
    }
  }
</style>

<div>
  <span>{letter}</span>
</div>

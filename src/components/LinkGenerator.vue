<template>
  <div class="hello">
    <h1>Calendar Event Link</h1>
    <p>Enter your event information below for a custom invitation link you can share with your guests.</p>
    <form>
      <label>
        <span>Title</span>
        <input type="text" placeholder="Coffee with Anand">
      </label>
      <label>
        <span>Title</span>
        <input type="text" placeholder="Coffee with Anand">
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: "LinkGenerator"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  max-width: 500px;
  margin: 10vh auto;
}
form {
  text-align: left;
  label {
    display: block;
    span {
      font-weight: bold;
    }
    + label {
      margin-top: 1.5rem;
    }
  }
}
input,
button,
textarea,
select {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  padding: 1rem;
  margin-top: 0.35rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

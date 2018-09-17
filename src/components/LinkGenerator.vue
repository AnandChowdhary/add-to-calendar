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
        <span>Date</span>
        <input type="date">
      </label>
      <label>
        <span>Time</span>
        <input type="time">
      </label>
      <label>
        <span>Timezone</span>
        <select>
          <option>UTC (+0:00)</option>
        </select>
      </label>
      <h2>Your link</h2>
      <p>Copy and paste this link in an email or message to send this invitation to your guests:</p>
      <pre>https://this-website.com/#/ejiqo/asdjiqweq0eqi/ej0ej09qe0w</pre>
      <button type="submit">Share</button>
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
    margin-bottom: 1.5rem;
    span {
      font-weight: bold;
    }
  }
  button[type="submit"] {
    margin-top: 1rem;
    background-color: #333;
    color: #fff;
    font-weight: bold;
  }
}
input,
button,
textarea,
select,
pre {
  display: block;
  width: 100%;
  border-radius: 0.2rem;
  box-sizing: border-box;
  font: inherit;
  padding: 0 1rem;
  height: 3rem;
  margin-top: 0.35rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 3rem;
}
pre {
  font-family: "SF Mono", "Monaco", "Inconsolata", "Fira Mono",
    "Droid Sans Mono", "Source Code Pro", monospace;
  white-space: nowrap;
  overflow: hidden;
  background-color: whitesmoke;
}
</style>

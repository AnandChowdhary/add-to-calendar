<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    if (
      window.location.hostname !== "localhost" &&
      window.location.protocol !== "https:"
    ) {
      window.location.protocol = "https";
    }
  }
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600");
#app {
  font-family: "Open Sans", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: whitesmoke;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

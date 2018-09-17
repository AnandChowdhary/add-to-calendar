<template>
  <div class="home">
    <LinkGenerator />
  </div>
</template>

<script>
// @ is an alias to /src
import LinkGenerator from "@/components/LinkGenerator.vue";

export default {
  name: "home",
  components: {
    LinkGenerator
  }
};
</script>

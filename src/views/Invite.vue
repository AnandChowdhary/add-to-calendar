<template>
  <div class="invite">
	<div>title: {{title}}</div>
	<div>date: {{date}}</div>
	<div>time: {{time}}</div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      title: "",
      date: "",
      time: ""
    };
  },
  methods: {
    unurize(x) {
      return decodeURIComponent(atob(x));
    }
  },
  mounted() {
    this.title = this.unurize(this.$route.params.title);
    this.date = this.unurize(this.$route.params.date);
    this.time = this.unurize(this.$route.params.time);
  }
};
</script>

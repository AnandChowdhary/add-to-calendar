<template>
  <div class="invite">
    <div>title: {{event.title}}</div>
    <div>date: {{event.date}}</div>
    <div>time: {{event.time}}</div>
    <p><a target="_blank" :href="links.google">Add to your Google Calendar</a></p>
    <p><button>Download iCal (.ics) file</button></p>
  </div>
</template>

<script>
import google from "../modules/google";
export default {
  data: () => {
    return {
      event: {
        title: "",
        date: "",
        time: ""
      },
      links: {
        google: ""
      }
    };
  },
  methods: {
    unurize(x) {
      return decodeURIComponent(atob(x));
    }
  },
  mounted() {
    this.event.title = this.unurize(this.$route.params.title);
    this.event.date = this.unurize(this.$route.params.date);
    this.event.time = this.unurize(this.$route.params.time);
    this.links.google = google(this.event);
  }
};
</script>

<style lang="scss" scoped>
.invite {
  margin: 10vh auto;
  max-width: 720px;
}
button {
  font: inherit;
  border: 1px solid #ddd;
  background-color: transparent;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
</style>

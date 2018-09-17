<template>
  <div class="invite">
    <div>title: {{event.title}}</div>
    <div>datetime: {{event.datetime}}</div>
    <div>duration: {{event.duration}}</div>
    <div>timezone: {{event.timezone}}</div>
    <p><a target="_blank" :href="links.google">Add to your Google Calendar</a></p>
    {{links}}
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
        datetime: "",
        timezone: ""
      },
      links: {
        google: ""
      }
    };
  },
  methods: {
    unurize(x) {
      return decodeURIComponent(x);
    }
  },
  mounted() {
    this.event.title = this.unurize(this.$route.params.title);
    this.event.datetime = this.unurize(this.$route.params.datetime);
    this.event.timezone = this.unurize(this.$route.params.timezone);
    this.event.duration = this.unurize(this.$route.params.duration);
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

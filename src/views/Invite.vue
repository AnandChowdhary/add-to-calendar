<template>
  <div class="invite">
    <div>title: {{event.title}}</div>
    <div>datetime: {{event.datetime}}</div>
    <div>duration: {{event.duration}}</div>
    <div>location: {{event.location}}</div>
    <p><a target="_blank" :href="links.google">Add to your Google Calendar</a></p>
    <p><a target="_blank" :href="links.outlook">Add to Microsoft Outlook</a></p>
    <p><a target="_blank" :href="links.yahoo">Add to Yahoo! Calendar</a></p>
    <p><button @click="iCalDownload">Download iCal (.ics) file</button></p>
  </div>
</template>

<script>
import ct from "countries-and-timezones";
const google = () =>
  import(/* webpackChunkName: "google" */ "../modules/google");
const outlook = () =>
  import(/* webpackChunkName: "outlook" */ "../modules/outlook");
const yahoo = () => import(/* webpackChunkName: "yahoo" */ "../modules/yahoo");
export default {
  data: () => {
    return {
      event: {
        title: "",
        datetime: "",
        location: ""
      },
      links: {
        google: "",
        outlook: "",
        yahoo: "",
        ical: ""
      }
    };
  },
  methods: {
    unurize(x) {
      return decodeURIComponent(x);
    },
    iCalDownload() {
      import(/* webpackChunkName: "ical" */ "../modules/ical").then(ical => {
        this.links.ical = ical.default.call(this, this.event, this.timezone);
        import(/* webpackChunkName: "downloadjs" */ "downloadjs").then(
          download => {
            download.default.call(
              this,
              this.links.ical,
              "invite.ics",
              "text/calendar"
            );
          }
        );
      });
    }
  },
  mounted() {
    const timezones = ct.getAllTimezones();
    this.timezones = Object.keys(timezones);
    fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=14aadc9992e34663be5676388611b3a4"
    )
      .then(response =>
        response
          .json()
          .then(json => {
            this.timezone = json.time_zone.name;
            this.links.google = google(this.event, this.timezone);
            this.links.outlook = outlook(this.event, this.timezone);
            this.links.yahoo = yahoo(this.event, this.timezone);
          })
          .catch(() => {})
      )
      .catch(() => {});
    this.event.title = this.unurize(this.$route.params.title);
    this.event.datetime = this.unurize(this.$route.params.datetime);
    this.event.duration = this.unurize(this.$route.params.duration);
    this.event.location = this.unurize(this.$route.params.location);
  }
};
</script>

<style lang="scss" scoped>
.invite {
  margin: 10vh auto;
  max-width: 720px;
  background-color: #fff;
  padding: 3rem;
}
button {
  font: inherit;
  border: 1px solid #ddd;
  background-color: transparent;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
</style>

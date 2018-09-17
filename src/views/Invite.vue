<template>
  <div class="invite">
    <div>title: {{event.title}}</div>
    <div>datetime: {{event.datetime}}</div>
    <div>duration: {{event.duration}}</div>
    <div>location: {{event.location}}</div>
    <div class="options">
      <button @click="iCalDownload">
        <div class="icon"><FontAwesomeIcon :icon="[`fab`, `apple`]" /></div>
        <div class="label">Apple<br>Calendar</div>
      </button>
      <a :href="links.google" target="_blank">
        <div class="icon"><FontAwesomeIcon :icon="[`fab`, `google`]" /></div>
        <div class="label">Google<br>Calendar</div>
      </a>
      <a :href="links.outlook" target="_blank">
        <div class="icon"><FontAwesomeIcon :icon="[`fab`, `microsoft`]" /></div>
        <div class="label">Microsoft<br>Outlook</div>
      </a>
      <a :href="links.yahoo" target="_blank">
        <div class="icon"><FontAwesomeIcon :icon="[`fab`, `yahoo`]" /></div>
        <div class="label">Yahoo!<br>Calendar</div>
      </a>
      <button @click="iCalDownload">
        <div class="icon"><FontAwesomeIcon :icon="[`fas`, `calendar-check`]" /></div>
        <div class="label">Download<br>Invite (.ics)</div>
      </button>
    </div>
  </div>
</template>

<script>
import ct from "countries-and-timezones";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faApple,
  faGoogle,
  faMicrosoft,
  faYahoo
} from "@fortawesome/free-brands-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faApple, faGoogle, faMicrosoft, faYahoo, faCalendarCheck);
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
  },
  components: {
    FontAwesomeIcon
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
.options {
  display: flex;
  > * {
    flex: 1;
    display: block;
    padding: 0;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    text-decoration: none;
    text-align: center;
    padding: 1rem 0;
    border-radius: 0.25rem;
    &:hover {
      background-color: whitesmoke;
    }
  }
}
.icon {
  font-size: 200%;
  margin-bottom: 0.5rem;
}
</style>

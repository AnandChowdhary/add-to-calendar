<template>
  <div class="invite">
    <h1>{{event.title}}</h1>
    <!-- <div class="options info"> -->
      <!-- <div>1</div> -->
      <!-- <div> -->
        <p><strong>When: </strong>{{new Date(event.datetime * 1000).toLocaleString()}}</p>
        <p><strong>Where: </strong>{{event.location}}</p>
        <p><strong>Duration: </strong>{{event.duration}} minutes</p>
      <!-- </div> -->
    <!-- </div> -->
    <div class="options">
      <button class="apple" @click="iCalDownload">
        <div class="icon">
          <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg">
        </div>
        <div class="label">Apple<br>Calendar</div>
      </button>
      <a class="google" :href="links.google" target="_blank">
        <div class="icon">
          <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg">
        </div>
        <div class="label">Google<br>Calendar</div>
      </a>
      <a class="microsoft" :href="links.outlook" target="_blank">
        <div class="icon">
          <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/4/48/Outlook.com_icon.svg">
        </div>
        <div class="label">Microsoft<br>Outlook</div>
      </a>
      <a class="yahoo" :href="links.yahoo" target="_blank">
        <div class="icon"><FontAwesomeIcon :icon="[`fab`, `yahoo`]" /></div>
        <div class="label">Yahoo!<br>Calendar</div>
      </a>
      <button class="ical" @click="iCalDownload">
        <div class="icon"><FontAwesomeIcon :icon="[`fas`, `calendar-check`]" /></div>
        <div class="label">Download<br>Invite (.ics)</div>
      </button>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import ct from "countries-and-timezones";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYahoo } from "@fortawesome/free-brands-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faYahoo, faCalendarCheck);
import google from "../modules/google";
import outlook from "../modules/outlook";
import yahoo from "../modules/yahoo";
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
    const path = this.$route.path.split("/");
    this.event.title = path.length >= 1 ? this.unurize(path[1]) : "";
    this.event.datetime = path.length >= 2 ? this.unurize(path[2]) : "";
    this.event.duration = path.length >= 3 ? this.unurize(path[3]) : "";
    this.event.location = path.length >= 4 ? this.unurize(path[4]) : "";
    this.event.md5 = path.length >= 5 ? this.unurize(path[5]) : "";
    if (this.event.md5) {
      const calculatedHash = md5(
        this.event.title +
          this.event.datetime +
          this.event.duration +
          this.event.location
      );
      if (calculatedHash !== this.event.md5) {
        this.$router.replace("/");
      }
    }
    document.title = "Invitation: " + this.event.title;
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
  box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
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
    transition: 0.3s;
    padding: 1rem 0;
    border-radius: 0.25rem;
    &:hover {
      background-color: whitesmoke;
    }
  }
}
p {
  font-size: 1.25rem;
}
.icon {
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
  height: 3rem;
  img {
    height: 2.5rem;
  }
}
.yahoo .icon {
  color: #700097;
}
.ical .icon {
  color: #788;
}
.info {
  text-align: left;
  margin-bottom: 2rem;
  > * {
    text-align: left;
    &:hover {
      background: none;
    }
  }
}
</style>

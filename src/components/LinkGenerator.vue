<template>
  <div class="hello">
    <h1>Calendar Event Link</h1>
    <p>Enter your event information below for a custom invitation link you can share with your guests.</p>
    <form>
      <label>
        <span>Title</span>
        <input v-model="title" type="text" placeholder="Coffee with Anand">
      </label>
      <label>
        <span>Date</span>
        <input v-model="date" type="date">
      </label>
      <label>
        <span>Time</span>
        <input v-model="time" type="time">
      </label>
      <label>
        <span>Duration</span>
        <input v-model="duration" type="number">
      </label>
      <label>
        <span>Timezone</span>
        <select v-model="timezone">
          <option v-for="(tz, index) in timezones" :key="index">{{tz}}</option>
        </select>
      </label>
      <h2>Your link</h2>
      <p>Copy and paste this link in an email or message to send this invitation to your guests:</p>
      <pre>{{location.protocol}}//{{location.hostname}}{{location.port ? ":" + location.port : ""}}/{{urilize(title)}}/{{urilize(date)}}/{{urilize(time)}}/{{urilize(duration)}}/{{urilize(timezone)}}</pre>
      <a target="_blank" class="button" :href="`${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}/${urilize(title)}/${urilize(date)}/${urilize(time)}/${urilize(duration)}/${urilize(timezone)}`">Visit your invite link &rarr;</a>
    </form>
  </div>
</template>

<script>
import ct from "countries-and-timezones";
export default {
  name: "LinkGenerator",
  data: () => {
    return {
      title: "",
      date: "",
      time: "",
      timezone: "",
      duration: 0,
      location: window.location,
      timezones: []
    };
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
          })
          .catch(() => {})
      )
      .catch(() => {});
  },
  methods: {
    urilize(x) {
      return btoa(encodeURIComponent(x));
    }
  }
};
</script>

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
  button[type="submit"],
  .button {
    margin-top: 1rem;
    text-decoration: none;
    text-align: center;
    background-color: #333;
    color: #fff;
    font-weight: bold;
  }
}
input,
button,
textarea,
.button,
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
  overflow-x: auto;
  background-color: whitesmoke;
}
</style>

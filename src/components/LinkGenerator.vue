<template>
  <div class="hello">
    <h1>Calendar Event Link</h1>
    <p>Enter your event information below for a custom invitation link you can share with your guests.</p>
    <form>
      <label>
        <span>What's the event title?</span>
        <input v-model="title" type="text" placeholder="Coffee with Anand">
      </label>
      <label>
        <span>When is the event?</span>
        <input v-model="datetime" type="datetime-local">
      </label>
      <p><small>Enter the event date and time in your local timezone.</small></p>
      <label>
        <span>How long is the event (in minutes)?</span>
        <input v-model="duration" type="number">
      </label>
      <label>
        <span>Where is the event happening?</span>
        <textarea v-model="location" placeholder="Enter the venue for this meeting"></textarea>
      </label>
      <h2>Your link</h2>
      <p>Copy and paste this link in an email or message to send this invitation to your guests:</p>
      <pre>{{url.protocol}}//{{url.hostname}}{{url.port ? ":" + url.port : ""}}/{{urilize(title || 'Event')}}/{{urilize(new Date(datetime).getTime() / 1000 || 0)}}/{{urilize(duration)}}/{{urilize(location || 'Location')}}</pre>
      <a target="_blank" class="button" :href="`${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}/${urilize(title || 'Event')}/${urilize(new Date(datetime).getTime() / 1000 || 0)}/${urilize(duration)}/${urilize(location || 'Location')}`">Visit your invite link &rarr;</a>
    </form>
  </div>
</template>

<script>
// https://gist.github.com/WebReflection/6076a40777b65c397b2b9b97247520f0
Date.prototype.toDatetimeLocal = function toDatetimeLocal() {
  const date = this,
    ten = i => (i < 10 ? "0" : "") + i,
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes());
  return YYYY + "-" + MM + "-" + DD + "T" + HH + ":" + II;
};

export default {
  name: "LinkGenerator",
  data: () => {
    return {
      title: "",
      datetime: new Date().toDatetimeLocal(),
      duration: 30,
      location: "",
      url: window.location
    };
  },
  methods: {
    urilize(x) {
      return encodeURIComponent(x);
    }
  }
};
</script>

<style scoped lang="scss">
.hello {
  max-width: 500px;
  margin: 10vh auto;
  background-color: #fff;
  padding: 3rem;
}
form {
  text-align: left;
  label {
    display: block;
    span {
      font-weight: bold;
    }
    + label {
      margin-top: 1.5rem;
    }
    + p {
      margin-top: 0.25rem;
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
textarea {
  height: 5rem;
  padding: 1rem;
  line-height: 1.5;
}
pre {
  font-family: "SF Mono", "Monaco", "Inconsolata", "Fira Mono",
    "Droid Sans Mono", "Source Code Pro", monospace;
  white-space: nowrap;
  overflow-x: auto;
  background-color: whitesmoke;
}
</style>

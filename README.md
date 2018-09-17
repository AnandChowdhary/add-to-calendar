# Add to Calendar

![Travis (.org)](https://travis-ci.org/AnandChowdhary/add-to-calendar.svg?branch=master)
[![Uptime Robot ratio (7 days)](https://img.shields.io/uptimerobot/ratio/m780985727-38a595cf3111cb30748a71bb.svg)](https://stats.uptimerobot.com/D8rrmsN6g)
[![GitHub](https://img.shields.io/github/license/anandchowdhary/add-to-calendar.svg)](https://github.com/AnandChowdhary/add-to-calendar/blob/master/LICENSE)
[![Made in Enschede](https://img.shields.io/badge/made%20in-Enschede-brightgreen.svg)](https://cityofenschede.com/)

This is a backend-less service that generates an event invitation link over-the-air, allowing your guests to add it to their calendars. [**Try it now &rarr;**](https://addtocalendar.ga/)

![Invitation screenshot](https://raw.githubusercontent.com/AnandChowdhary/add-to-calendar/master/public/img/screenshot.png)

Users can click on their preferred calendar client and directly add it to their calendars. Supported services are Google Calendar, Microsoft Outlook, and Yahoo! Calendar (Apple Calendar and download .ics are done through the iCal format).

There is also an interface to create calendar links, or you can do them through the API. All links are public and open and use the URL for data.

## API

You can generate links on-the-fly using the following URL structure. URI encode your parameters; duration is in minutes.

```
https://addtocalendar.ga/EVENT_TITLE/UNIX_TIMESTAMP/DURATION/LOCATION
```

For example:

```
https://addtocalendar.ga/Coffee%20with%20Anand/1537198500/30/DesignLab
```

### Security

Since this approach uses just plain URLs for communication, you can add a JWT-inspired MD5 hash as the last parameter which is the hash of the concatenation of all the other parameters. We compare this hash with the data to verify the integrity of the calendar contents, so if a user changes the URL, the invitation will not work.

```
https://addtocalendar.ga/Coffee%20with%20Anand/1537198500/30/DesignLab/f1fe1c244f29e7bb4faf382362636577
```

Where the hash is generated like this:

```js
import md5 from "md5";
const hash = md5("Coffee with Anand" + "1537198500" + "30" + "DesignLab");
return hash === "f1fe1c244f29e7bb4faf382362636577" // true
```

## Development

You can run this service from any static host, since it doesn't require a backend. If you want to use GitHub pages, you should disable the HTML5-mode in `src/router.js` and add `/#/` in your URL before the parameters.

This service is currently hosted for free by [Surge.sh](https://surge.sh), with a free domain from [Freenom](https://www.freenom.com/).

### Project setup

Clone the repository and install dependencies:

```bash
yarn
```

### Development

This starts a local server with hot module reloading:

```
yarn run serve
```

### Production build

Create a `./dist` folder with production assets (code splitting and minification preconfigured):

```
yarn run build
```

### Linting

Lint your files using ESLint + Prettier:

```
yarn run lint
```

### Tests

Run unit test (end-to-end test coming soon):

```
yarn run test
```
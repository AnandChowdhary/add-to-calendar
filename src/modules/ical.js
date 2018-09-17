import ical from "ical-generator";
import moment from "moment-timezone";

export default ({ title, datetime, duration, location }, timezone) => {
  const day = moment.tz(
    parseInt(moment.tz(datetime * 1000, timezone).format("x")),
    "UTC"
  );
  return ical({
    domain: window.location.hostname,
    prodId: "//Anand Chowdhary//Calendar Event Link//EN",
    events: [
      {
        start: day,
        end: day.add(duration, "minutes"),
        timestamp: moment(),
        summary: title,
        location
      }
    ]
  }).toString();
};

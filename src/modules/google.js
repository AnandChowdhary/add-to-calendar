import moment from "moment-timezone";

export default ({ title, datetime, duration, location }, timezone) => {
  const day = moment.tz(
    parseInt(moment.tz(datetime * 1000, timezone).format("x")),
    "UTC"
  );
  return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
    title
  )}&dates=${day.format("YYYYMMDD")}T${day.format("HHmmss")}Z/${day
    .add(duration, "minutes")
    .format("YYYYMMDD")}T${day.format("HHmmss")}Z&location=${encodeURIComponent(
    location
  )}&pli=1&sf=true&output=xml`;
};

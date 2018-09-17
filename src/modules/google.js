import moment from "moment-timezone";

export default ({ title, datetime, duration }, timezone) => {
  const day = moment.tz(
    parseInt(moment.tz(datetime * 1000, timezone).format("x")),
    "UTC"
  );
  return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${day.format(
    "YYYYMMDD"
  )}T${day.format("HHmmss")}Z/${day
    .add(duration, "minutes")
    .format("YYYYMMDD")}T${day.format("HHmmss")}Z`;
};

// 2009 06 21 T 06 30 00 Z

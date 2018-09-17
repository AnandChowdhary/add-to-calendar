import moment from "moment-timezone";

export default ({ title, datetime, duration, location }, timezone) => {
  const day = moment.tz(datetime * 1000, timezone);
  const hours = duration / 60;
  let rHours = Math.floor(hours);
  if (rHours < 10) rHours = "0" + rHours;
  let rMinutes = Math.round((hours - rHours) * 60);
  if (rMinutes < 10) rMinutes = "0" + rMinutes;
  return `http://calendar.yahoo.com/?v=60&TITLE=${encodeURIComponent(
    title
  )}&ST=${day.format("YYYYMMDD")}T${day.format(
    "HHmmss"
  )}&in_loc=${encodeURIComponent(location)}&DESC=&DUR=${rHours}${rMinutes}`;
};

import moment from "moment-timezone";

export default ({ title, datetime, duration, location }, timezone) => {
  const day = moment.tz(datetime * 1000, timezone);
  const hours = duration / 60;
  let rhours = Math.floor(hours);
  if (rhours < 10) rhours = "0" + rhours;
  let rminutes = Math.round((hours - rhours) * 60);
  if (rminutes < 10) rminutes = "0" + rminutes;
  return `http://calendar.yahoo.com/?v=60&TITLE=${encodeURIComponent(
    title
  )}&ST=${day.format("YYYYMMDD")}T${day.format(
    "HHmmss"
  )}&in_loc=${encodeURIComponent(location)}&DESC=&DUR=${rhours}${rminutes}`;
};

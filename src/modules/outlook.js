import moment from "moment-timezone";

export default ({ title, datetime, duration, location }, timezone) => {
  const day = moment.tz(
    parseInt(moment.tz(datetime * 1000, timezone).format("x")),
    "UTC"
  );
  return `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
    title
  )}&startdt=${day.format("YYYYMMDD")}T${day.format("HHmmss")}Z&enddt=${day
    .add(duration, "minutes")
    .format("YYYYMMDD")}T${day.format("HHmmss")}Z&location=${encodeURIComponent(
    location
  )}&body=&allday=`;
};

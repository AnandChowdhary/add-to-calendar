// import dayjs from "dayjs";

export default ({ title, date, time }) => {
  // const day = dayjs(date + " " + time);
  return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${date}&time=${time}`;
};

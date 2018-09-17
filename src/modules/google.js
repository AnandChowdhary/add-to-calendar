module.exports = ({ title, date, time }) => {
  return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${date}&time=${time}`;
};

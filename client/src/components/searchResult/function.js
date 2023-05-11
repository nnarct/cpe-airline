
const shortMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const formatDate = (date) => {
  const d = new Date(date);
  return d.getDate() + " " + shortMonth[d.getMonth()] + " " + d.getFullYear();
};


import moment from "moment";
export const toDATETIME = (time) => {
  return moment(time).format("ddd DD-MM-YYYY hh:mm a");
};

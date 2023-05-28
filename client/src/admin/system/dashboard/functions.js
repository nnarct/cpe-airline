import Axios from "axios";
export const getCountFromBackend = async (setCountf, setCountm) => {
  try {
    const response = await Axios.get(
      "http://localhost:3001/system/genderCount"
    );
    const maleCount = Number(response.data.MaleCount);
    const femaleCount = Number(response.data.FemaleCount);
    setCountf(femaleCount);
    setCountm(maleCount);
    return;
  } catch (error) {
    console.error("Error:", error.response.data.Error);
    return; // Return default values or handle the error as per your requirement
  }
};

export const getBookCountFromBackend = async (setBookCount) => {
  try {
    const response = await Axios.get("http://localhost:3001/system/bookCount"); // Replace '/api/gendercount' with the actual endpoint URL
    const BookCount = Number(response.data.BookingCount);
    setBookCount(BookCount);
  } catch (error) {
    console.error("Error:", error.response.data.Error);
    return 0; // Return 0 or handle the error as per your requirement
  }
};

export const getFlightCountFromBackend = async (setFlightCount) => {
  try {
    const response = await Axios.get(
      "http://localhost:3001/system/flightCount"
    ); // Replace '/api/gendercount' with the actual endpoint URL
    const FlightCount = Number(response.data.FlightCount);
    setFlightCount(FlightCount);
  } catch (error) {
    console.error("Error:", error.response.data.Error);
    return 0; // Return 0 or handle the error as per your requirement
  }
};
export const getUserCountFromBackend = async (setUserCount) => {
  try {
    const response = await Axios.get(
      "http://localhost:3001/system/userCount"
    ); // Replace '/api/gendercount' with the actual endpoint URL
    const UserCount = Number(response.data.UserCount);
    setUserCount(UserCount);
  } catch (error) {
    console.error("Error:", error.response.data.Error);
    return 0; // Return 0 or handle the error as per your requirement
  }
};

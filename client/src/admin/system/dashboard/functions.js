import Axios from "axios";
import { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

// export const getCountFromBackend = async (setCountf, setCountm) => {
//   try {
//     const response = await Axios.get(
//       "http://localhost:3001/system/genderCount"
//     );
//     const maleCount = Number(response.data.MaleCount);
//     const femaleCount = Number(response.data.FemaleCount);
//     setCountf(femaleCount);
//     setCountm(maleCount);
//     return;
//   } catch (error) {
//     console.error("Error:", error.response.data.Error);
//     return; // Return default values or handle the error as per your requirement
//   }
// };

export const getBookCountFromBackend = async (setBookCount) => {
  try {
    const response = await Axios.get("http://localhost:3001/system/bookCount");
    const BookCount = Number(response.data.BookingCount);
    setBookCount(BookCount);
    return;
  } catch (error) {
    console.error("Error:", error.response.data.Error);
    return;
  }
};

// export const getFlightCountFromBackend = async (setFlightCount) => {
//   try {
//     const response = await Axios.get(
//       "http://localhost:3001/system/flightCount"
//     ); // Replace '/api/gendercount' with the actual endpoint URL
//     const FlightCount = Number(response.data.FlightCount);
//     setFlightCount(FlightCount);
//   } catch (error) {
//     console.error("Error:", error.response.data.Error);
//     return 0; // Return 0 or handle the error as per your requirement
//   }
// };

// export const getUserCountFromBackend = async (setUserCount) => {
//   try {
//     const response = await Axios.get(
//       "http://localhost:3001/system/userCount"
//     ); // Replace '/api/gendercount' with the actual endpoint URL
//     const UserCount = Number(response.data.UserCount);
//     setUserCount(UserCount);
//   } catch (error) {
//     console.error("Error:", error.response.data.Error);
//     return 0; // Return 0 or handle the error as per your requirement
//   }
// };

export class BookingsCountByAirlineChart extends Component {
  state = {
    bookingsCountByAirline: {},
  };

  async componentDidMount() {
    try {
      const response = await Axios.get(
        "http://localhost:3001/system/bookEachday"
      );
      const bookingsCountByAirline = response.data.BookingsCountByAirline;
      // console.log("Daycount :", bookingsCountByAirline);
      this.setState({ bookingsCountByAirline });
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { bookingsCountByAirline } = this.state;

    if (
      !bookingsCountByAirline ||
      Object.keys(bookingsCountByAirline).length === 0
    ) {
      return null;
    }

    const airlineIDs = Object.keys(bookingsCountByAirline);
    const airlineNames = airlineIDs.map(
      (id) => bookingsCountByAirline[id].Name
    );
    const mondayCounts = airlineIDs.map(
      (id) => bookingsCountByAirline[id].MondayCount
    );
    const tuesdayCounts = airlineIDs.map(
      (id) => bookingsCountByAirline[id].TuesdayCount
    );
    const wednesdayCounts = airlineIDs.map(
      (id) => bookingsCountByAirline[id].WednesdayCount
    );
    const thursdayCounts = airlineIDs.map(
      (id) => bookingsCountByAirline[id].ThursdayCount
    );
    const fridayCounts = airlineIDs.map(
      (id) => bookingsCountByAirline[id].FridayCount
    );
    const saturdayCounts = airlineIDs.map(
      (id) => bookingsCountByAirline[id].SaturdayCount
    );
    const sundayCounts = airlineIDs.map(
      (id) => bookingsCountByAirline[id].SundayCount
    );

    const chartData = {
      labels: airlineNames,
      datasets: [
        {
          label: "Monday",
          data: mondayCounts,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Tuesday",
          data: tuesdayCounts,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
        {
          label: "Wednesday",
          data: wednesdayCounts,
          backgroundColor: "rgba(255, 206, 86, 0.5)",
        },
        {
          label: "Thursday",
          data: thursdayCounts,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
        {
          label: "Friday",
          data: fridayCounts,
          backgroundColor: "rgba(153, 102, 255, 0.5)",
        },
        {
          label: "Saturday",
          data: saturdayCounts,
          backgroundColor: "rgba(255, 159, 64, 0.5)",
        },
        {
          label: "Sunday",
          data: sundayCounts,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    };

    return <Bar data={chartData} options={chartOptions} />;
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}

export class GenderCountsChart extends Component {
  state = {
    genderCountsByAirline: {},
    airlineNames: [],
  };

  async componentDidMount() {
    try {
      const response = await Axios.get(
        "http://localhost:3001/system/genderCount"
      );
      const genderCountsByAirline = response.data.GenderCountsByAirline;
      const airlineNames = Object.values(genderCountsByAirline).map(
        (airline) => airline.AirlineName
      );
      console.log("Gender : ", genderCountsByAirline);
      this.setState({ genderCountsByAirline, airlineNames });
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { genderCountsByAirline, airlineNames } = this.state;

    if (Object.keys(genderCountsByAirline).length === 0) {
      return null;
    }

    const airlines = Object.keys(genderCountsByAirline);

    const maleCounts = airlines.map(
      (airline) => genderCountsByAirline[airline].MaleCount
    );
    const femaleCounts = airlines.map(
      (airline) => genderCountsByAirline[airline].FemaleCount
    );

    const chartData = {
      labels: airlineNames,
      datasets: [
        {
          label: "Male",
          data: maleCounts,
          backgroundColor: [
            "rgba(54, 162, 235, 0.5)",
            // Add more colors if needed
          ],
        },
        {
          label: "Female",
          data: femaleCounts,
          backgroundColor: [
            "rgba(255, 165, 210, 0.5)",
            // Add more colors if needed
          ],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      indexAxis: "x", // Set to 'y' for horizontal bar chart
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    return <Bar data={chartData} options={chartOptions} />;
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}

export class FlightCountsChart extends Component {
  state = {
    flightCountsBySection: {},
    AirlineName: {},
  };

  async componentDidMount() {
    try {
      const response = await Axios.get(
        "http://localhost:3001/system/destination"
      );
      const flightCountsBySection = response.data.FlightCountsBySection;
      const AirlineName = response.data.Airlinename;
      console.log("Flight : ", flightCountsBySection);
      this.setState({ flightCountsBySection, AirlineName });
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { flightCountsBySection, AirlineName } = this.state;

    if (!Object.keys(flightCountsBySection).length) {
      return null;
    }
    const sections = Object.keys(flightCountsBySection);
    const airlines = Object.keys(flightCountsBySection[sections[0]]);
    const airlineNames = AirlineName.map((airline) => airline.Name);
    // console.log(airlineNames)
    const sectionColors = {
      North: "rgba(75, 192, 192, 0.5)",
      Northeast: "rgba(255, 116, 98, 0.5)",
      Central: "rgba(54, 162, 235, 0.5)",
      South: "rgba(255, 165, 210, 0.5)",
    };
    const Datasets = sections.map((section, index) => ({
      label: [section],
      data: airlines.map((airline) => flightCountsBySection[section][airline]),
      backgroundColor: sectionColors[section],
    }));

    const chartData = {
      labels: airlineNames,
      datasets: Datasets,
    };

    const chartOptions = {
      indexAxis: "y",
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    return <Bar data={chartData} options={chartOptions} />;
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}

export class BookSecCountsChart extends Component {
  state = {
    bookCountsByAirport: {},
    AirlineName: {},
  };

  async componentDidMount() {
    try {
      const response = await Axios.get(
        "http://localhost:3001/system/bookBySec"
      );
      const bookCountsByAirport = response.data.BookCountsBySection;
      const AirlineName = response.data.Airlinename;
      // console.log('Book :',bookCountsByAirport)
      this.setState({ bookCountsByAirport, AirlineName });
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { bookCountsByAirport, AirlineName } = this.state;

    if (!Object.keys(bookCountsByAirport).length) {
      return null;
    }
    const airportIDs = Object.keys(bookCountsByAirport);
    const airportData = airportIDs.map((id) => bookCountsByAirport[id]);
    const airportIATA = airportData.map((data) => data.IATA);
    const bookingCounts = airportData.map((data) => data.BookingCount);
    // console.log(airlineNames)
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const barColors = bookingCounts.map(() => getRandomColor());

    const chartData = {
      labels: airportIATA,
      datasets: [
        {
          label: "Booking Count",
          data: bookingCounts,
          backgroundColor: barColors,
        },
      ],
    };

    const chartOptions = {
      indexAxis: "x",
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    return <Bar data={chartData} options={chartOptions} />;
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}

export class AddonsCountChart extends Component {
  state = {
    addonCountsByAirport: {},
  };

  async componentDidMount() {
    try {
      const response = await Axios.get(
        "http://localhost:3001/system/airportbyAdds"
      );
      const addonCountsByAirport = response.data.AddonsCountByAirport;
      // console.log("Counts : ", addonCountsByAirport);
      this.setState({ addonCountsByAirport });
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { addonCountsByAirport } = this.state;

    if (
      !addonCountsByAirport ||
      Object.keys(addonCountsByAirport).length === 0
    ) {
      return null;
    }

    const airportIDs = Object.keys(addonCountsByAirport);
    const airportIATA = airportIDs.map((id) => addonCountsByAirport[id].IATA);
    const addonsCounts = airportIDs.map(
      (id) => addonCountsByAirport[id].AddonsCount
    );

    const chartData = {
      labels: airportIATA,
      datasets: [
        {
          label: "Addons Count",
          data: addonsCounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    };

    return <Doughnut data={chartData} options={chartOptions} />;
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
// import { countfemale } from "../Dashboard.js"
import Axios from "axios";

import { Doughnut } from "react-chartjs-2";

import { Bar } from "react-chartjs-2";

import { Header } from "./components/header";

import React, { Component } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  Title,
  CategoryScale,
  PointElement,
  LineElement
);

const options = {};

let countm;
let countf;
const getCountFromBackend = async () => {
  try {
    const response = await Axios.get(
      "http://localhost:3001/system/genderCount"
    );
    const maleCount = Number(response.data.MaleCount);
    const femaleCount = Number(response.data.FemaleCount);
    countm = maleCount;
    countf = femaleCount;
    return countm, countf;
  } catch (error) {
    console.error("Error:", error.response.data.Error);
    return 0; // Return default values or handle the error as per your requirement
  }
};

getCountFromBackend();

let bookcount;
const getBookCountFromBackend = async () => {
  try {
    const response = await Axios.get("http://localhost:3001/system/bookCount"); // Replace '/api/gendercount' with the actual endpoint URL
    const BookCount = Number(response.data.BookingCount);
    bookcount = BookCount;
    return BookCount;
  } catch (error) {
    console.error("Error:", error.response.data.Error);
    return 0; // Return 0 or handle the error as per your requirement
  }
};

getBookCountFromBackend();

let chartData = [];
class FlightCountsChart extends Component {
  state = {
    flightCountsBySection: {},
  };

  async componentDidMount() {
    try {
      const response = await Axios.get(
        "http://localhost:3001/system/destinaton"
      );
      const flightCountsBySection = response.data.FlightCountsBySection;
      this.setState({ flightCountsBySection });
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { flightCountsBySection } = this.state;

    if (!Object.keys(flightCountsBySection).length) {
      return null;
    }

    const sections = Object.keys(flightCountsBySection);
    const airlines = Object.keys(flightCountsBySection[sections[0]]);
    const sectionColors = {
      North: "rgba(75, 192, 192, 0.5)",
      NorthEast: "rgba(255, 99, 113, 0.5)",
      Central: "rgba(54, 162, 235, 0.5)",
      South: "rgba(255, 165, 210, 0.5)",
    };
    const datasets = sections.map((section, index) => ({
      label: [section],
      data: airlines.map((airline) => flightCountsBySection[section][airline]),
      backgroundColor: sectionColors[section],
    }));

    const chartData = {
      labels: [
        "Bangkok Airways",
        "Nok Air",
        "Nok Air",
        "Thai Airways",
        "Thai Lion Air",
        "Thai Smile",
        "Thai VietJet Air",
      ],
      datasets: datasets,
    };

    const chartOptions = {
      indexAxis: "y",
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      elements: {
        bar: {
          borderWidth: 1,
        },
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

export const Dashboard = () => {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Poll",
        data: [countm, countf],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)"],
      },
    ],
  };
  return (
    <>
      <div className="ml-10">
        <Header>Dashboard</Header>
      </div>
      <div className="Dashboard">
        <div className="flex m-3 flex-wrap gap-1 items-center ml-10">
          <div className="bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300 dark:bg-secondary-dark-bg md:w-110 rounded-2xl">
            <p className="mt-3 p-4">
              <span className="text-lg font-bold text-white">Bookings</span>
            </p>
            <p className="mt-3 p-4 pt-0.5">
              <svg
                className="h-10 w-10 text-white rounded-full bg-black bg-opacity-10 inline"
                width="30"
                height="30"
                viewBox="-3 0 30 25"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path
                  d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z"
                  transform="rotate(-15 12 12) translate(0 -1)"
                />
                <line x1="3" y1="21" x2="21" y2="21" />
              </svg>
              <span className="text-3xl font-bold text-white p-5">
                {bookcount}
              </span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:bg-secondary-dark-bg md:w-110 rounded-2xl">
            <p className="mt-3 p-4">
              <span className="text-lg font-bold text-white">New Users</span>
            </p>
            <p className="mt-3 p-4 pt-0.5">
              <svg
                className="h-10 w-10 text-white rounded-full bg-black bg-opacity-10 inline"
                fill="none"
                viewBox="-3 0 30 25"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-3xl font-bold text-white p-5">24123</span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 via-green-400 to-green-200 dark:bg-secondary-dark-bg md:w-110 rounded-2xl">
            <p className="mt-3 p-4">
              <span className="text-lg font-bold text-white">Viewers</span>
            </p>
            <p className="mt-3 p-4 pt-0.5">
              <svg
                className="h-10 w-10 text-white rounded-full bg-black bg-opacity-10 inline"
                width="30"
                height="30"
                viewBox="-3 0 30 25"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 11l2 2l4 -4" />
              </svg>
              <span className="text-3xl font-bold text-white p-5">24123</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="font-bold text-xl ml-10 mt-10">Destination</h1>
            <div className="ml-20">
              <FlightCountsChart Width={380} height={200}></FlightCountsChart>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mt-10 ml-28">Gender</h1>
            <div className="w-100 h-100 ml-36">
              <Doughnut data={data} options={options}></Doughnut>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

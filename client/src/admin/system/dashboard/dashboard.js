import Axios from "axios";
import { Component, useEffect, useState } from "react";
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
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  getBookCountFromBackend,
  getCountFromBackend,
  getFlightCountFromBackend,
  getUserCountFromBackend,
} from "./functions";
import { Header } from "../components/header";
import { Content } from "../components/content";
import { TbPlaneDeparture } from "react-icons/tb";
import { HiOutlineUsers, HiOutlineTicket } from "react-icons/hi";

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
class FlightCountsChart extends Component {
  state = {
    flightCountsBySection: {},
  };

  async componentDidMount() {
    try {
      const response = await Axios.get(
        "http://localhost:3001/system/destination"
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
  const [countm, setCountm] = useState(0);
  const [countf, setCountf] = useState(0);
  const [bookcount, setBookCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    getCountFromBackend(setCountf, setCountm);
    getBookCountFromBackend(setBookCount);
    getFlightCountFromBackend(setFlightCount);
    getUserCountFromBackend(setUserCount);
  }, []);
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
      <Content>
        <Header>Dashboard</Header>

        <div className="flex container w-full items-center justify-between space-x-3">
          <div className="bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300 w-full rounded-2xl flex flex-col h-40 p-5">
            <p className="h-1/2 flex items-center">
              <span className="text-3xl font-bold text-white">Bookings</span>
            </p>
            <p className="h-1/2 flex items-center space-x-3">
              <HiOutlineTicket color="#fff" size={32} />
              <span className="text-3xl font-bold text-white">{bookcount}</span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-full rounded-2xl flex flex-col h-40 p-5">
            <p className="h-1/2 flex items-center">
              <span className="text-3xl font-bold text-white">Users</span>
            </p>
            <p className="h-1/2 flex items-center space-x-3">
              <HiOutlineUsers color="#fff" size={32} />
              <span className="text-3xl font-bold text-white">{userCount}</span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 via-green-400 to-green-200 w-full rounded-2xl flex flex-col h-40 p-5">
            <p className="h-1/2 flex items-center">
              <span className="text-3xl font-bold text-white">Flights</span>
            </p>
            <p className="h-1/2 flex items-center space-x-3">
              <TbPlaneDeparture color="#fff" size={32} />

              <span className="text-3xl font-bold text-white">
                {flightCount}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full container mx-auto mt-6">
          <div className="w-full bg-white p-4 rounded-2xl shadow border">
            <Header>Flight Counts By Section</Header>
            <FlightCountsChart Width={380} height={200} />
          </div>
        </div>
        <div className="w-full container mx-auto mt-6">
          <div className="p-4 bg-white rounded-xl w-fit border shadow">
            <Header>Passenger Group By Gender</Header>
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </Content>
    </>
  );
};

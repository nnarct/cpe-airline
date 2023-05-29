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
  Legend
} from 'chart.js';
// import { countfemale } from "../Dashboard.js"
import axios from "axios";

import {Doughnut} from 'react-chartjs-2';

import {Bar} from 'react-chartjs-2';

import { Header } from "./components/header";

import React, { Component }  from "react";

import { MdGroupAdd } from 'react-icons/md';

import { BsFillPersonLinesFill } from 'react-icons/bs'

import { TbPlaneDeparture } from 'react-icons/tb'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  Title,
  CategoryScale,
  PointElement,
  LineElement,
);


const options = {

}


// let datacount = 0;
console.log('5555555')
export class GenderCountsChart extends Component {
  state = {
    genderCountsByAirline: {},
    airlineNames: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:3001/system/genderCount");
      const genderCountsByAirline = response.data.GenderCountsByAirline;
      const airlineNames = Object.values(genderCountsByAirline).map((airline) => airline.AirlineName);
      console.log('Gender : ',genderCountsByAirline)
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
    
    const maleCounts = airlines.map((airline) => genderCountsByAirline[airline].MaleCount);
    const femaleCounts = airlines.map((airline) => genderCountsByAirline[airline].FemaleCount);

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

    return <Bar  data={chartData} options={chartOptions} />;
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}

let bookcount = 0;
const getBookCountFromBackend = async () => {
  try {
    const response = await axios.get("http://localhost:3001/system/bookCount"); // Replace '/api/gendercount' with the actual endpoint URL
    const BookCount = Number(response.data.BookingCount);
    // console.log(response.data.BookingCount)
    bookcount = BookCount
    // console.log('bookcount : ', bookcount)
    return BookCount;
  } catch (error) {
    console.error('Error:', error.response.data.Error);
    return 0; // Return 0 or handle the error as per your requirement
  }
};

getBookCountFromBackend()

export class FlightCountsChart extends Component {
  state = {
    flightCountsBySection: {},
    AirlineName: {}
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:3001/system/destinaton");
      const flightCountsBySection = response.data.FlightCountsBySection;
      const AirlineName = response.data.Airlinename
      console.log('Flight : ',flightCountsBySection)
      this.setState({ flightCountsBySection,AirlineName })
      
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { flightCountsBySection,AirlineName } = this.state;

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
    const datasets = sections.map((section, index) => ({
      label: [section],
      data: airlines.map((airline) => flightCountsBySection[section][airline]),
      backgroundColor: sectionColors[section],
    }));

    const chartData = {
      labels: airlineNames,
      datasets: datasets,
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
    AirlineName: {}
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:3001/system/bookBySec");
      const bookCountsByAirport = response.data.BookCountsBySection;
      const AirlineName = response.data.Airlinename
      // console.log('Book :',bookCountsByAirport)
      this.setState({ bookCountsByAirport,AirlineName })
      
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { bookCountsByAirport,AirlineName } = this.state;

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
      const response = await axios.get("http://localhost:3001/system/airportbyAdds");
      const addonCountsByAirport = response.data.AddonsCountByAirport;
      console.log('Counts : ',addonCountsByAirport)
      this.setState({ addonCountsByAirport });
    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { addonCountsByAirport } = this.state;

    if (!addonCountsByAirport || Object.keys(addonCountsByAirport).length === 0) {
      return null;
    }
  
    const airportIDs = Object.keys(addonCountsByAirport);
    const airportIATA = airportIDs.map((id) => addonCountsByAirport[id].IATA);
    const addonsCounts = airportIDs.map((id) => addonCountsByAirport[id].AddonsCount);
  
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

export class BookingsCountByAirlineChart extends Component {
  state = {
    bookingsCountByAirline: {},
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:3001/system/bookEachday");
      const bookingsCountByAirline = response.data.BookingsCountByAirline;
      console.log('Daycount :' , bookingsCountByAirline)
      this.setState({ bookingsCountByAirline });

    } catch (error) {
      console.error("Error:", error.response.data.Error);
    }
  }

  renderChart() {
    const { bookingsCountByAirline } = this.state;

    if (!bookingsCountByAirline || Object.keys(bookingsCountByAirline).length === 0) {
      return null;
    }

    const airlineIDs = Object.keys(bookingsCountByAirline);
    const airlineNames = airlineIDs.map((id) => bookingsCountByAirline[id].Name);
    const mondayCounts = airlineIDs.map((id) => bookingsCountByAirline[id].MondayCount);
    const tuesdayCounts = airlineIDs.map((id) => bookingsCountByAirline[id].TuesdayCount);
    const wednesdayCounts = airlineIDs.map((id) => bookingsCountByAirline[id].WednesdayCount);
    const thursdayCounts = airlineIDs.map((id) => bookingsCountByAirline[id].ThursdayCount);
    const fridayCounts = airlineIDs.map((id) => bookingsCountByAirline[id].FridayCount);
    const saturdayCounts = airlineIDs.map((id) => bookingsCountByAirline[id].SaturdayCount);
    const sundayCounts = airlineIDs.map((id) => bookingsCountByAirline[id].SundayCount);

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


export const Dashboard = () => {
  return (
    <>
      <div className="ml-10 mt-5">
      <Header>Dashboard</Header>
      </div>
      <div className="Dashboard">
      <div className="flex m-3 flex-wrap items-center ml-10 grid gap-2 grid-cols-3">
        <div className="bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300 dark:bg-secondary-dark-bg md:w-96 rounded-2xl ml-5">
            <a href="#" className="flex flex-col items-center border-gray-200 rounded-2xl shadow md:flex-row md:max-w-xl hover:shadow-lg dark:hover:shadow-black/30 bg-opacity-10 dark:border-gray-700 dark:bg-gray-800 ">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 ml-3 text-xl font-semibold tracking-tight text-white dark:text-white">Bookings</h5>
              <div className="flex items-center mb-2">
              <TbPlaneDeparture className='w-20 h-20 text-white bg-black bg-opacity-10 rounded-full ml-3' viewBox='-3 0 30 25'/><span className="mb-3 font-bold text-3xl text-white dark:text-gray-400 ml-10 justify-center">{bookcount}</span>
            </div>
            </div>
            </a>
        </div>
        {/* <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:bg-secondary-dark-bg md:w-110 rounded-2xl"> */}
        <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:bg-secondary-dark-bg md:w-96 rounded-2xl">
            <a href="#" className="flex flex-col items-center border-gray-200 rounded-2xl shadow md:flex-row md:max-w-xl hover:shadow-lg dark:hover:shadow-black/30 bg-opacity-10 dark:border-gray-700 dark:bg-gray-800 ">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 ml-3 text-xl font-semibold tracking-tight text-white dark:text-white">New Users</h5>
              <div className="flex items-center mb-2">
            <MdGroupAdd className='w-20 h-20 text-white bg-black bg-opacity-10 rounded-full ml-3' viewBox='-4 0 31 25'/><span className="mb-3 font-bold text-3xl text-white dark:text-gray-400 ml-10 justify-center">1,543</span>
            </div>
            </div>
            </a>
        </div>
        {/* <div className="bg-gradient-to-r from-green-500 via-green-400 to-green-200 dark:bg-secondary-dark-bg md:w-110 rounded-2xl"> */}
        <div className="bg-gradient-to-r from-green-500 via-green-400 to-green-200 dark:bg-secondary-dark-bg md:w-96 rounded-2xl">
            <a href="#" className="flex flex-col items-center border-gray-200 rounded-2xl shadow md:flex-row md:max-w-xl hover:shadow-lg dark:hover:shadow-black/30 bg-opacity-10 dark:border-gray-700 dark:bg-gray-800 ">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 ml-3 text-xl font-semibold tracking-tight text-white dark:text-white">Visits</h5>
              <div className="flex items-center mb-2">
              <BsFillPersonLinesFill className='w-20 h-20 text-white bg-black bg-opacity-10 rounded-full ml-3' viewBox='-2 0 20 18'/><span className="mb-3 font-bold text-3xl text-white dark:text-gray-400 ml-10 justify-center">1,543</span>
            </div>
            </div>
            </a>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-2xl ml-5 mt-5">
          <h1 className="font-bold text-xl p-5">Destination</h1>
          <div>
          <FlightCountsChart Width={20} height={20}></FlightCountsChart>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-2xl ml-5 mt-5 w-100">
          <h1 className="font-bold text-xl p-5">Addons Count</h1>
          <div>
          <AddonsCountChart Width={360} height={200}></AddonsCountChart>
        </div>
      </div>
      </div>
      <div>
        <div className="bg-white rounded-2xl ml-5 mt-5 w-50">
          <h1 className="font-bold text-xl p-5">Gender Count</h1>
          <div>
          <GenderCountsChart Width={360} height={200}></GenderCountsChart>
        </div>
      </div>
      </div>
      <div>
        <div className="bg-white rounded-2xl ml-5 mt-5 w-50">
          <h1 className="font-bold text-xl p-5">BookCount</h1>
          <div>
          <BookSecCountsChart Width={360} height={200}></BookSecCountsChart>
        </div>
      </div>
      </div>
      <div>
        <div className="bg-white rounded-2xl ml-5 mt-5 w-500">
          <h1 className="font-bold text-xl p-5">BookingEachDay</h1>
          <div>
          <BookingsCountByAirlineChart Width={360} height={200}></BookingsCountByAirlineChart>
        </div>
      </div>
      </div>
      </div>

        
      </div>
    </>
  );
  }
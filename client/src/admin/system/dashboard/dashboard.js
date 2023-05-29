import Axios from "axios";
import { useEffect, useState } from "react";
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
import {
  getBookCountFromBackend,
  AddonsCountChart,
  BookSecCountsChart,
  FlightCountsChart,
  GenderCountsChart,
  BookingsCountByAirlineChart,
  BookByday
} from "./functions";
import { Header } from "../components/header";
import { Content } from "../components/content";
import { TbPlaneDeparture } from "react-icons/tb";
import { HiOutlineUsers, HiOutlineTicket } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Chart } from "./styles";

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

export const Dashboard = () => {
  const [countm, setCountm] = useState(0);
  const [countf, setCountf] = useState(0);
  const [bookcount, setBookCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    // getCountFromBackend(setCountf, setCountm);
    getBookCountFromBackend(setBookCount);
    // getFlightCountFromBackend(setFlightCount);
    // getUserCountFromBackend(setUserCount);
  }, []);

  return (
    <>
      <Content>
        <Header>Dashboard</Header>

        <div className="w-full container flex space-x-5">
          <div className="w-full text-white p-5 bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300 rounded-2xl">
            <h5 className="text-2xl font-semibold pb-5">Bookings</h5>
            <div className="flex items-center space-x-4">
              <TbPlaneDeparture size={36} />
              <span className="font-bold text-4xl text-white justify-center">
                {bookcount}
              </span>
            </div>
          </div>
          <div className="w-full text-white p-5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-2xl">
            <h5 className="text-2xl font-semibold pb-5">New Users</h5>
            <div className="flex items-center space-x-4">
              <MdGroupAdd size={36} />
              <span className="font-bold text-4xl text-white justify-center">
                1,543
              </span>
            </div>
          </div>

          <div className="w-full text-white p-5 bg-gradient-to-r from-green-500 via-green-400 to-green-200 rounded-2xl">
            <h5 className="text-2xl font-semibold pb-5">Visits</h5>
            <div className="flex items-center space-x-4">
              <BsFillPersonLinesFill size={36} />
              <span className="font-bold text-4xl text-white justify-center">
                1,543
              </span>
            </div>
          </div>
        </div>
        <Chart topic={"Flight Destinations Group by Airlines"}>
          <FlightCountsChart />
        </Chart>

        <div className="flex space-x-7 w-full container">
          <Chart topic={"Count Add-ons by Destination"}>
            <AddonsCountChart/>
          </Chart>
          <Chart className={''}
            topic={"Count Passenger By Gender, Group by Airlines"}
          >
            <GenderCountsChart />
          </Chart>
        </div>

        <div className="flex space-x-7 w-full container">
          <Chart topic={"Most Booked Destination"}>
            <BookSecCountsChart />
          </Chart>

          <Chart topic={"Most Flying Day"}>
            <BookingsCountByAirlineChart />
          </Chart>
        </div>
        <Chart topic={"Most Booking Day"}>
            <BookByday />
          </Chart>
      </Content>
    </>
  );
};
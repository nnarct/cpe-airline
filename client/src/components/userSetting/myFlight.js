import { Sidebar } from "./sidebar";
import { useState } from 'react';
import Transaction from "./transactionflight"
// import {TbPlaneInflight} from "react-icon/tb"

export const MyFlight = () => {
  // initialize the state to show the upcoming flights section by default
  const [selectedSection, setSelectedSection] = useState('upcomingFlights');

  // create a function to handle section link clicks
  const handleSectionLinkClick = (event) => {
    event.preventDefault();
    setSelectedSection(event.target.dataset.section);
  };

  return (
    <>
      <h1 class="mt-5 mb-2 text-5xl font-bold text-center text-cyan-950"> MyFlight </h1>
      
      <div class="w-full flex justify-center ">
        <div class="container">
          <div class="font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px">
              <li class="mr-2">
                <a href="#" data-section="upcomingFlights" onClick={handleSectionLinkClick} class={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${selectedSection === 'upcomingFlights' ? 'text-blue-700' : ''}`}>Upcoming Flights</a>
              </li>
              <li class="mr-2">
                <a href="#" data-section="departedFlights" onClick={handleSectionLinkClick} class={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${selectedSection === 'departedFlights' ? 'text-blue-700' : ''}`}>Departed Flights</a>
              </li>
              <li class="mr-2">
                <a href="#" data-section="canceledFlights" onClick={handleSectionLinkClick} class={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${selectedSection === 'canceledFlights' ? 'text-blue-700' : ''}`}>Canceled Flights</a>
              </li>
            </ul>
          </div>

          
          
          
          <div id="upcomingFlights" class="flight-section" style={{ display: selectedSection === 'upcomingFlights' ? 'block' : 'none' }}>
            {/* <h2>upcoming Flights</h2> */}
            <Transaction />

          </div>

          <div id="departedFlights" class="flight-section" style={{ display: selectedSection === 'departedFlights' ? 'block' : 'none' }}>
            {/* <h2>departed Flights</h2> */}
            <Transaction />

          </div>

          <div id="canceledFlights" class="flight-section" style={{ display: selectedSection === 'canceledFlights' ? 'block' : 'none' }}>
            {/* <h2>Canceled Flights</h2> */}
            <Transaction />
          </div>
        </div>
      </div>
    </>
  );
};
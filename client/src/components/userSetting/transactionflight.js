import { useState } from 'react';
import { TbPlaneInflight } from "react-icons/tb"


const Item = (props)=>{
    const {Airline,BookingID,FlightID,Date,DepartureTime,OriginAirportID,ArrivalTime,DestinationAirportID} = props
    return (
        <div  class="p-5">
            <div class="container mx-auto flex py-4 gap-80">
                <div class="left-0">
                    <h1 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{Airline}</h1>
                    <div class="container mx-auto flex py-4 gap-40">
                        <div>
                            <li>Flight</li>
                            <span class="font-bold text-xl">{FlightID}</span>
                        </div>
                        <div>
                            <li >Date</li>
                            <span class="font-bold text-xl">{Date}</span>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="flex gap-60">
                        <div>
                            <li>From</li>
                            <li class="font-bold text-4xl">{DepartureTime}</li>
                            <li class="font-bold text-2xl">{OriginAirportID}</li>
                        </div>
                        <div>
                            <TbPlaneInflight size="2.5em" className="flex bg-cyan-900 rounded-full  p-2 mt-6" color="white"/>
                        </div>
                        
                        <div>
                            <li>To</li>
                            <li class="font-bold text-4xl">{ArrivalTime}</li>
                            <li class="font-bold text-2xl text-right">{DestinationAirportID}</li>
                        </div>
                    </div>
                    <div class="border-b-2 border-gray-200 mt-2"></div>
                    <li >Booking ID: <span>{BookingID}</span></li>
                </div>
            </div>
            
            
        </div>
    );
}

function Transition(){
    const data = [
        {
            Airline : "Thai Smile",
            BookingID : "5B4502",
            FlightID : "WE103",
            Date : "22 Feb 2023",
            DepartureTime : "09:30",
            OriginAirportID : "CNX",
            ArrivalTime : "10:35",
            DestinationAirportID : "BKK"
        },
        {
            Airline : "Nok Air",
            BookingID : "5C4503",
            FlightID : "WE103",
            Date : "26 Feb 2023",
            DepartureTime : "13:30",
            OriginAirportID : "BKK",
            ArrivalTime : "14:35",
            DestinationAirportID : "CNX"
        }
    ]
    return(
        <ul>
            
            <div class="mt-3">
                {data.map((element)=>{
                    return (
                    <a href="#" class="flex items-center mt-3 bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <Item {...element}/>  
                    </a>
                    );
                })}
               
            </div>
        </ul>
        
    );
}

export default Transition
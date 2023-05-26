import { TbPointFilled } from "react-icons/tb"
import { Seat } from "./seat"

//  0 : avaliable
//  1 : not valiable
const seatsRowA = [
    {
        seatNumber: "A1",
        seatStatus: 1,
    },
    {
        seatNumber: "A2",
        seatStatus: 1,
    },
    {
        seatNumber: "A3",
        seatStatus: 0,
    },
];
const seatsRowB = [
    {
        seatNumber: "B1",
        seatStatus: 1,
    },
    {
        seatNumber: "B2",
        seatStatus: 1,
    },
    {
        seatNumber: "B3",
        seatStatus: 0,
    },
];
const seatsRowC = [
    {
        seatNumber: "C1",
        seatStatus: 1,
    },
    {
        seatNumber: "C2",
        seatStatus: 1,
    },
    {
        seatNumber: "C3",
        seatStatus: 0,
    },
];
const seatsRowH = [
    {
        seatNumber: "H1",
        seatStatus: 1,
    },
    {
        seatNumber: "H2",
        seatStatus: 1,
    },
    {
        seatNumber: "H3",
        seatStatus: 0,
    },
];
const seatsRowJ = [
    {
        seatNumber: "J1",
        seatStatus: 1,
    },
    {
        seatNumber: "J2",
        seatStatus: 1,
    },
    {
        seatNumber: "J3",
        seatStatus: 0,
    },
];
const seatsRowK = [
    {
        seatNumber: "K1",
        seatStatus: 1,
    },
    {
        seatNumber: "K2",
        seatStatus: 1,
    },
    {
        seatNumber: "K3",
        seatStatus: 0,
    },
];

export const Seatselect = () => {
    return (
        <div>
            <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">Seat Number</h1>
            <diV className="flex">
                <p className="flex items-center text-m"><TbPointFilled color="orange" size="2.5em" border="solid black" />avaliable</p>
                <p className="flex items-center text-m"><TbPointFilled color="gray" size="2.5em" />not avaliable</p>
            </diV>
            <div className="flex ">
                <diV>
                    {seatsRowA.map((seat) => {
                        return (
                            <Seat {...seat} />
                        );
                    })}
                </diV>
                <diV>
                    {seatsRowB.map((seat) => {
                        return (
                            <Seat {...seat} />
                        );
                    })}
                </diV>
                <diV>
                    {seatsRowC.map((seat) => {
                        return (
                            <Seat {...seat} />
                        );
                    })}
                </diV>

                <diV className="ml-8">
                    {seatsRowH.map((seat) => {
                        return (
                            <Seat {...seat} />
                        );
                    })}
                </diV>
                <diV>
                    {seatsRowJ.map((seat) => {
                        return (
                            <Seat {...seat} />
                        );
                    })}
                </diV>
                <diV>
                    {seatsRowK.map((seat) => {
                        return (
                            <Seat {...seat} />
                        );
                    })}
                </diV>

            </div>

        </div>

    );
};
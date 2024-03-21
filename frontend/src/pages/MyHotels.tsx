import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import ReactLoading from "react-loading";

const MyHotels = () => {
    const { data: hotelData, isFetching: loadingHotel } = useQuery(
        "getMyHotels",
        apiClient.getMyHotels,
        {
            onError: (error: Error) => {
                console.log(error.message);
            },
        }
    );

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link
                    to="/add-hotel"
                    className="flex bg-amber-500 text-white text-xl font-bold p-2 hover:bg-amber-600 "
                >
                    Add Hotel
                </Link>
            </span>

            {loadingHotel && (
                <div className="flex justify-center items-center">
                    <ReactLoading
                        type={"spin"}
                        color={"#F59E0B"}
                        height={"50px"}
                        width={"50px"}
                    />
                </div>
            )}

            {!hotelData ? (
                <span>No Hotels Found</span>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {hotelData?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="flex flex-col justify-between border border-slate-300 rounded-lg p-6"
                            >
                                <h2 className="text-2xl font-bold">
                                    {item.name}
                                </h2>
                                <div className="whitespace-pre-line">
                                    {item.description}
                                </div>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                                    <div className="border border-slate-300 rounded-sm p-2 flex items-center ">
                                        <BsMap className="mr-1" />
                                        {item.city}, {item.state},{" "}
                                        {item.country}
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-2 flex items-center ">
                                        <BsBuilding className="mr-1" />
                                        {item.type}
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-2 flex items-center ">
                                        <BiMoney className="mr-1" />₹
                                        {item.pricePerNight} per night
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-2 flex items-center ">
                                        <BiHotel className="mr-1" />
                                        {item.adultCount} adults,{" "}
                                        {item.childCount} children
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-2 flex items-center ">
                                        <BiStar className="mr-1" />
                                        {item.starRating} Star Rating
                                    </div>
                                </div>
                                <span className="flex gap-2 justify-end">
                                    <Link
                                        to={`/edit-hotel/${item._id}`}
                                        className="flex bg-amber-500 text-white text-sm font-bold p-2 mt-6 hover:bg-amber-600 "
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        to={`/bookings/${item._id}`}
                                        className="flex bg-amber-500 text-white text-sm font-bold p-2 mt-6 hover:bg-amber-600 "
                                    >
                                        Booking
                                    </Link>
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyHotels;

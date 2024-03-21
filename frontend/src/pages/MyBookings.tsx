import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
    const { data: hotels } = useQuery(
        "gettingMyBookings",
        apiClient.getMyBookings
    );

    if (!hotels || hotels?.length === 0) {
        return <span>No Bookings found</span>;
    }
    return (
        <div className="space-y-5">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            {hotels.map((item, i) => {
                return (
                    <div
                        key={i}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-6 gap-4"
                    >
                        <div className="lg:w-full lg:h-[300px]">
                            <img
                                src={item.imageUrls[0]}
                                className="w-full h-full rounded-lg object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                            <div className="text-2xl font-bold">
                                {item.name}
                                <div className="text-sm font-normal">
                                    {item.city}, {item.state}, {item.country}
                                </div>
                            </div>
                            {item.bookings.map((bookingsItem, i) => {
                                return (
                                    <div key={i}>
                                        <div>
                                            <span className="font-bold mr-2">
                                                Dates:{" "}
                                            </span>
                                            <span>
                                                {new Date(
                                                    bookingsItem.checkIn
                                                ).toDateString()}
                                                {" - "}
                                                {new Date(
                                                    bookingsItem.checkOut
                                                ).toDateString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-bold mr-2">
                                                Guest:{" "}
                                            </span>
                                            <span>
                                                {bookingsItem.adultCount}{" "}
                                                adults,{" "}
                                                {bookingsItem.childCount}{" "}
                                                children
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-bold mr-2">
                                                Amount:{" "}
                                            </span>
                                            <span>
                                                ₹{bookingsItem.totalCost}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyBookings;

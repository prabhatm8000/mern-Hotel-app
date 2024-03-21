import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import MyHotelBookingCard from "../components/MyHotelBookingCard";

const MyHotelsBooking = () => {
    const { hotelId } = useParams();
    const { data: bookingsData } = useQuery("gettingMyHotelBooking", () =>
        apiClient.getMyHotelBookings(hotelId as string)
    );

    if (!bookingsData) {
        return <span>Hotel not found!</span>
    }

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-3xl font-bold">Bookings for My Hotel</h1>
                <h3 className="text-xl font-semibold">{bookingsData?.name}</h3>
            </div>
            {bookingsData?.bookings.length === 0 ? (
                <span>No Bookings found</span>
            ) : (
                <MyHotelBookingCard bookingData={bookingsData.bookings} />
            )}
        </div>
    );
};

export default MyHotelsBooking;

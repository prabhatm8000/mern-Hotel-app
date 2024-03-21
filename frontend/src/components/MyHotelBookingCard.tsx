import { BookingType } from "../../../backend/src/shared/types";

interface MyHotelBookingCardProps {
    bookingData: BookingType[];
}

const MyHotelBookingCard = ({ bookingData }: MyHotelBookingCardProps) => {
    const getNumberOfNights = (checkOut: Date, checkIn: Date) => {
        const nights =
            Math.abs(
                new Date(checkOut).getTime() - new Date(checkIn).getTime()
            ) /
            (1000 * 60 * 60 * 24);
        return Math.ceil(nights);
    };
    return (
        <div className="flex flex-col gap-4">
            {bookingData.map((item, i) => {
                return (
                    <div
                        key={i}
                        className="border border-slate-300 rounded-md p-4"
                    >
                        <div className="flex justify-between items-center gap-4 ">
                            <div>
                                <h3 className="text-xl font-bold">
                                    {`${item.firstName} ${item.lastName}`}
                                </h3>
                                <h5 className="text-sm">{item.email}</h5>
                                <h5 className="text-md font-bold">
                                    Check-in Date:{" "}
                                    <span className="font-normal">
                                        {new Date(item.checkIn).toDateString()}
                                    </span>
                                </h5>
                                <h5 className="text-md font-bold">
                                    Check-out Date:{" "}
                                    <span className="font-normal">
                                        {new Date(item.checkOut).toDateString()}
                                    </span>
                                </h5>
                                <h5 className="text-md font-bold">
                                    Stay length:{" "}
                                    <span className="font-normal">
                                        {getNumberOfNights(
                                            item.checkOut,
                                            item.checkIn
                                        )}{" "}
                                        {" nights"}
                                    </span>
                                </h5>
                                <h5 className="text-md font-bold">
                                    Guests:{" "}
                                    <span className="font-normal">
                                        {`${item.adultCount} adults, ${item.childCount} children`}
                                    </span>
                                </h5>
                            </div>
                            <div className="flex flex-col items-center text-green-700 font-semibold">
                                <h2 className="text-2xl">₹{item.totalCost.toFixed(2)}</h2>
                                <h3 className="text-sm">PAID</h3>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyHotelBookingCard;

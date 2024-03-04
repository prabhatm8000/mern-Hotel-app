import { BiCalendar, BiSolidMap } from "react-icons/bi";
import { HotelType } from "../../../backend/src/shared/types";

interface BookingDetailSummaryProps {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType;
}

const BookingDetailSummary = ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNights,
    hotel,
}: BookingDetailSummaryProps) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <h2 className="text-xl font-bold">Your Booking Details</h2>
            <div className="border-b py-2">
                <BiSolidMap />
                Location:
                <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.state}, ${hotel.country}`}</div>
            </div>
            <div>
                <BiCalendar />
                <div className="flex justify-between">
                    <div>
                        Check-in
                        <div className="font-bold">
                            {checkIn.toDateString()}
                        </div>
                    </div>
                    <div>
                        Check-out
                        <div className="font-bold">
                            {checkOut.toDateString()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-b py-2">
                Total stay:
                <div className="font-bold">{numberOfNights} night</div>
            </div>

            <div>
                Guest:
                <div className="font-bold">
                    {adultCount} adults & {childCount} children
                </div>
            </div>
        </div>
    );
};

export default BookingDetailSummary;

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Details = () => {
    const { hotelId } = useParams();

    const { data: hotel } = useQuery(
        "getHotelById",
        () => apiClient.getHotelById(hotelId as string),
        {
            // only render and call api, when hotelId is available
            enabled: !!hotelId,
        }
    );

    if (!hotel) {
        return <></>;
    }

    return (
        <div className="space-y-6">
            <div>
                <span className="flex">
                    {Array.from({ length: hotel.starRating }).map((_, i) => {
                        return (
                            <AiFillStar key={i} className="fill-yellow-400" />
                        );
                    })}
                </span>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {hotel.imageUrls.map((item, i) => {
                    return (
                        <div key={i} className="h-[300px]">
                            <img
                                src={item}
                                alt={hotel.name}
                                className="rounded-md w-full h-full object-cover object-center"
                            />
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
                {hotel.facilities.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="border border-slate-300 rounded-sm p-3"
                        >
                            {item}
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="h-fit">
                    <GuestInfoForm
                        pricePerNight={hotel.pricePerNight}
                        hotelId={hotel._id}
                    />
                </div>
            </div>
        </div>
    );
};

export default Details;

import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

interface SearchResultCardProps {
    hotel: HotelType;
}

const SearchResultCard = ({ hotel }: SearchResultCardProps) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] shadow-xl border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px] ">
                <img
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr] justify-between">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(
                                (_, i) => {
                                    return (
                                            <AiFillStar key={i} className="fill-yellow-400" />
                                    );
                                }
                            )}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>

                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                        {hotel.facilities.slice(0, 3).map((item, i) => {
                            return (
                                <span key={i} className="bg-blue-600 px-2 py-1 rounded-lg text-white font-bold text-xs whitespace-nowrap">
                                    {item}
                                </span>
                            );
                        })}
                        <span className="text-sm">
                            {hotel.facilities.length > 3 &&
                                `+${hotel.facilities.length - 3} more`}
                        </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">
                            ₹{hotel.pricePerNight} per night
                        </span>
                        <Link to={`/detail/${hotel._id}`} className="bg-amber-500 h-full p-2 text-white font-bold text-xl max-w-fit hover:bg-amber-600">
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;

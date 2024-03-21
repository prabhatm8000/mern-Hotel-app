import {
    AiFillStar,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
} from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

interface SearchResultCardProps {
    hotel: HotelType;
}

const SearchResultCard = ({ hotel }: SearchResultCardProps) => {
    const handlePrevImgBtn = () => {
        const imgGallery = document.getElementById(hotel._id) as HTMLDivElement;
        imgGallery?.scrollTo({
            left: (imgGallery.scrollLeft -= 300),
            behavior: "smooth",
        });
    };

    const handleNextImgBtn = () => {
        const imgGallery = document.getElementById(hotel._id) as HTMLDivElement;
        imgGallery?.scrollTo({
            left: (imgGallery.scrollLeft += 300),
            behavior: "smooth",
        });
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] shadow-xl border border-slate-300 rounded-lg p-8 gap-8">
            <div className="flex items-center relative">
                <button
                    onClick={handlePrevImgBtn}
                    className="absolute left-[-13px] border bg-gray-300 p-1 rounded-full"
                >
                    <AiOutlineArrowLeft />
                </button>
                <div
                    id={hotel._id}
                    className="w-full h-[300px] flex gap-2 overflow-y-hidden overflow-x-scroll"
                >
                    {hotel.imageUrls.map((item, i) => {
                        return (
                            <img
                                key={i}
                                src={item}
                                className="w-full h-full rounded-md object-cover object-center"
                            />
                        );
                    })}
                </div>
                <button
                    onClick={handleNextImgBtn}
                    className="absolute right-[-13px] border bg-gray-300 p-1 rounded-full"
                >
                    <AiOutlineArrowRight />
                </button>
            </div>
            <div className="grid grid-rows-[0.5fr_1.5fr_0.5fr] justify-between">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(
                                (_, i) => {
                                    return (
                                        <AiFillStar
                                            key={i}
                                            className="fill-yellow-400"
                                        />
                                    );
                                }
                            )}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    <Link
                        to={`/detail/${hotel._id}`}
                        className="text-2xl font-bold cursor-pointer"
                    >
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className="line-clamp-6 h-[150px]">
                        {hotel.description}
                    </div>
                </div>

                <div className="flex gap-2 items-center whitespace-nowrap">
                    {hotel.facilities.slice(0, 3).map((item, i) => {
                        return (
                            <span
                                key={i}
                                className={`bg-blue-600 px-2 py-1 rounded-lg text-white font-bold text-xs whitespace-nowrap`}
                            >
                                {item}
                            </span>
                        );
                    })}
                    <span className="text-sm">
                        {hotel.facilities.length > 3 &&
                            `+${hotel.facilities.length - 3} more`}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-700">
                        ₹{hotel.pricePerNight} per night
                    </span>
                    <Link
                        to={`/detail/${hotel._id}`}
                        className="bg-amber-500 h-full p-2 text-white font-bold text-xl max-w-fit hover:bg-amber-600"
                    >
                        View More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;

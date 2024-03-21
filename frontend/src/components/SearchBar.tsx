import { FormEvent, useState } from "react";
import { useSearchContxt } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { BsFilePerson } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";

const SearchBar = () => {
    const search = useSearchContxt();
    const navigate = useNavigate();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
            destination.trim(),
            checkIn,
            checkOut,
            adultCount,
            childCount
        );
        navigate("/search");
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form
            onSubmit={handleSubmit}
            className="-mt-6 bg-blue-700/[.80] p-1 rounded-md shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.5fr_2fr_0.5fr] xl:grid-cols-[3fr_2fr_2fr_1fr] gap-1 items-center"
        >
            <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-md">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    type="text"
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-[1fr_1fr] items-center px-2 py-1 bg-white rounded-md">
                <label className="flex items-center">
                    Adults:
                    <input
                        type="number"
                        className="w-full p-1 font-bold focus:outline-none"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(e) =>
                            setAdultCount(parseInt(e.target.value))
                        }
                    />
                </label>

                <label className="flex items-center ml-1">
                    Children:
                    <input
                        type="number"
                        className="w-full p-1 font-bold focus:outline-none"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(e) =>
                            setChildCount(parseInt(e.target.value))
                        }
                    />
                </label>
            </div>
            <div className="flex gap-2 items-center px-2 py-2 bg-white rounded-md">
                <div className="flex items-center">
                    <BiCalendar />
                    <DatePicker
                        selected={checkIn}
                        onChange={(date) => setCheckIn(date as Date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText="Check-in Date"
                        className="w-full focus:outline-none"
                        wrapperClassName="ml-1 w-3/4"
                    />
                </div>
                <div className="flex items-center">
                    <BiCalendar />
                    <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date as Date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={checkIn}
                        maxDate={maxDate}
                        placeholderText="Check-out Date"
                        className="w-full focus:outline-none"
                        wrapperClassName="ml-1 w-3/4"
                    />
                </div>
            </div>
            <button className="rounded-md bg-amber-500 h-full p-1 text-white font-semibold text-xl hover:bg-amber-600">
                Search
            </button>
        </form>
    );
};

export default SearchBar;

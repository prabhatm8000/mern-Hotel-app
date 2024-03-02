import { FormEvent, useState } from "react";
import { useSearchContxt } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { BsFilePerson } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const search = useSearchContxt();
    const navigate = useNavigate();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(
        search.adultCount
    );

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
            className="-mt-8 bg-blue-700/[.80] p-3 rounded-md shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 items-center"
        >
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    type="text"
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            <div className="flex gap-2 items-center px-2 py-1 bg-white">
                <BsFilePerson size={25} />
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

                <label className="flex items-center">
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
            <div>
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full bg-white py-2 pl-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>
            <div>
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn}
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="min-w-full bg-white py-2 pl-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>
            <div className="flex gap-2">
                <button className=" w-2/3 bg-amber-500 h-full p-2 text-white font-bold hover:bg-amber-600">
                    Search
                </button>
                <button className="material-symbols-outlined w-1/3 bg-red-500 h-full p-2 text-white font-bold hover:bg-red-600">
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchBar;

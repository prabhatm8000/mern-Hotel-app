import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContxt } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

interface GuestInfoFormProps {
    hotelId: string;
    pricePerNight: number;
}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: GuestInfoFormProps) => {
    const search = useSearchContxt();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        );
        navigate("/sign-in", { state: { from: location } });
    };

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        );
        navigate(`/hotel/${hotelId}/booking`);
    };

    return (
        <div className="flex flex-col p-4 bg-amber-200 gap-4">
            <h3 className="text-xl font-bold">₹{pricePerNight}</h3>
            <form
                onSubmit={
                    isLoggedIn
                        ? handleSubmit(onSubmit)
                        : handleSubmit(onSignInClick)
                }
            >
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) =>
                                setValue("checkIn", date as Date)
                            }
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
                            required
                            selected={checkOut}
                            onChange={(date) =>
                                setValue("checkOut", date as Date)
                            }
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="min-w-full bg-white py-2 pl-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    <div className="flex gap-2 justify-between px-2 py-1 bg-white">
                        <label className="flex flex-1 items-center">
                            Adults:
                            <input
                                type="number"
                                className="w-full p-1 font-bold focus:outline-none"
                                min={1}
                                max={20}
                                {...register("adultCount", {
                                    required: "This field is required",
                                    min: {
                                        value: 1,
                                        message:
                                            "There must be at least one adult",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>

                        <label className="flex flex-1 items-center">
                            Children:
                            <input
                                type="number"
                                className="w-full p-1 font-bold focus:outline-none"
                                min={0}
                                max={20}
                                {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>

                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <button
                            type="submit"
                            className="bg-amber-500 h-full p-2 text-white text-xl font-bold hover:bg-amber-600"
                        >
                            Book Now
                        </button>
                    ) : (
                        <button className="bg-amber-500 h-full p-2 text-white text-xl font-bold hover:bg-amber-600">
                            Sign in to Book
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default GuestInfoForm;

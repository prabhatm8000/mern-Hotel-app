import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 text-gray-700">Guests</h2>
            <div className="grid grid-cols-2 p-6 gap-5 bg-amber-100">
                <label className="text-gray-700 text-sm font-bold">
                    Adults
                    <input
                        type="number"
                        min={1}
                        className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                        {...register("adultCount", {
                            required: "This feild is required",
                        })}
                    />
                    {errors.adultCount && (
                        <span className="text-red-500 font-normal">
                            {errors.adultCount.message}
                        </span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold">
                    Children
                    <input
                        type="number"
                        min={0}
                        className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                        {...register("childCount", {
                            required: "This feild is required",
                        })}
                    />
                    {errors.childCount && (
                        <span className="text-red-500 font-normal">
                            {errors.childCount.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestSection;

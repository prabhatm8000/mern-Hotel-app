import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    const typeWatch = watch("type");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 text-gray-700">Type</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {hotelTypes.map((type, i) => {
                    return (
                        <label
                            key={i}
                            className={
                                typeWatch === type
                                    ? "cursor-pointer bg-amber-500 rounded-full px-4 py-2 font-semibold text-sm text-amber-900"
                                    : "cursor-pointer bg-amber-100 rounded-full px-4 py-2 font-semibold text-sm text-amber-900"
                            }
                        >
                            <input
                                className="hidden"
                                type="radio"
                                value={type}
                                {...register("type", {
                                    required: "This field is required",
                                })}
                            />
                            <span>{type}</span>
                        </label>
                    );
                })}
            </div>
            {errors.type && (
                <span className="text-red-500">
                    {errors.type.message}
                </span>
            )}
        </div>
    );
};

export default TypeSection;

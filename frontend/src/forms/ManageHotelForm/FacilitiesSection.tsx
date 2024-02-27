import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 text-gray-700">Facilities</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {hotelFacilities.map((item, i) => {
                    return (
                        <label key={i} className="text-sm flex gap-1 text-">
                            <input
                                type="checkbox"
                                value={item}
                                {...register("facilities", {
                                    validate: (facilities) => {
                                        if (
                                            facilities &&
                                            facilities.length > 0
                                        ) {
                                            return true;
                                        } else {
                                            return "At least one facility is required";
                                        }
                                    },
                                })}
                            />
                            {item}
                        </label>
                    );
                })}
            </div>
            {
                errors.facilities &&
                <span className="text-red-500">{errors.facilities.message}</span>
            }
        </div>
    );
};

export default FacilitiesSection;

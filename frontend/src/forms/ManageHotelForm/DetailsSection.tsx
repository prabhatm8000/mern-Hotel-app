import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3 text-gray-700">Add Hotel</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                    type="text"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
                {errors.name && (
                    <span className="text-red-500 font-normal">
                        {errors.name.message}
                    </span>
                )}
            </label>

            <div className="flex flex-col gap-4 justify-between sm:flex-row">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input
                        className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                        type="text"
                        {...register("city", {
                            required: "This field is required",
                        })}
                    />
                    {errors.city && (
                        <span className="text-red-500 font-normal">
                            {errors.city.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    State
                    <input
                        className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                        type="text"
                        {...register("state", {
                            required: "This field is required",
                        })}
                    />
                    {errors.state && (
                        <span className="text-red-500 font-normal">
                            {errors.state.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input
                        className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                        type="text"
                        {...register("country", {
                            required: "This field is required",
                        })}
                    />
                    {errors.country && (
                        <span className="text-red-500 font-normal">
                            {errors.country.message}
                        </span>
                    )}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                    rows={10}
                    className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
                {errors.description && (
                    <span className="text-red-500 font-normal">
                        {errors.description.message}
                    </span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price Per Night
                <input
                    type="number"
                    min={1}
                    className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                    {...register("pricePerNight", {
                        required: "This field is required",
                    })}
                />
                {errors.pricePerNight && (
                    <span className="text-red-500 font-normal">
                        {errors.pricePerNight.message}
                    </span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select
                className="border rounded w-full p-2 text-gray-600 font-normal"
                    {...register("starRating", {
                        required: "This field is required",
                    })}
                >
                    <option value="" className="tex-sm font-bold">
                        Select as Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((item) => {
                        return <option key={item} value={item}>{item}</option>;
                    })}
                </select>
                {errors.starRating && (
                    <span className="text-red-500 font-normal">
                        {errors.starRating.message}
                    </span>
                )}
            </label>
        </div>
    );
};

export default DetailSection;

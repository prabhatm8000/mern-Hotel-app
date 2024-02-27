import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-700">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length;
                            if (totalLength === 0) {
                                return "At least one image should be added";
                            } else if (totalLength > 6) {
                                return "Cannot be more than 6";
                            } else return true;
                        },
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    );
};

export default ImagesSection;

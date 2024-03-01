import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<HotelFormData>();

    const existingImageUrls = watch("imageUrls");

    const handleDeleteBtn = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        // if imageUrl not equal to delete image return
        setValue(
            "imageUrls",
            existingImageUrls.filter((url) => url !== imageUrl)
        );
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-700">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {existingImageUrls.map((item, i) => {
                            return (
                                <div className="relative group" key={i}>
                                    <img
                                        src={item}
                                        className="min-h-full object-cover"
                                    />
                                    <button
                                        onClick={(e) =>
                                            handleDeleteBtn(e, item)
                                        }
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
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

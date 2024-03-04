import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    state: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type ManageHotelFormProps = {
    onSave: (hoteFormData: FormData) => void;
    isLoading: boolean;
    hotel?: HotelType;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: ManageHotelFormProps) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(hotel);
    }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();

        if (hotel) {
            // for edit page
            formData.append("hotelId", hotel._id);
        }

        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("state", formDataJson.state);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        // facilities -> array
        // handling array in form data
        formDataJson.facilities.forEach((item, i) => {
            formData.append(`facilities[${i}]`, item);
        });

        // for edit page
        // adding the pre existing images
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((item, i) => {
                formData.append(`imageUrls[${i}]`, item)
            })
        }

        // FileList not allows forEach,
        // so, making array out of FileList
        Array.from(formDataJson.imageFiles).forEach((item) => {
            formData.append("imageFiles", item);
        });

        // saving (sending to api)
        onSave(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-amber-500 text-white font-bold text-xl p-2 hover:bg-amber-600 disabled:bg-amber-400"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;

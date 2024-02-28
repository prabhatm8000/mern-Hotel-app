import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQuery } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    // hotelId can be undefined
    const { hotelId } = useParams();
    const {showToast} = useAppContext();

    const { data: hotel } = useQuery(
        "getMyHotelById",
        // this is to handle that
        () => apiClient.getMyHotelById(hotelId || ""),
        {
            // this is to handle that
            enabled: !!hotelId,
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({type: 'SUCCESS', message: 'Hotel Saved'})
        },
        onError: (error: Error) => {
            showToast({type: 'ERROR', message: error.message})
        },
    });

    const handleSave = (hotelFormDate: FormData) => {
        mutate(hotelFormDate);
    };

    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />;
};

export default EditHotel;

import { useMutation } from "react-query";

import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ type: "SUCCESS", message: "Hotel Saved" });
        },
        onError: () => {
            showToast({ type: "ERROR", message: "Error Saving Hotel" });
        },
    });

    const handleSave = (hoteFormData: FormData) => {
        mutate(hoteFormData);
    };
    return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;

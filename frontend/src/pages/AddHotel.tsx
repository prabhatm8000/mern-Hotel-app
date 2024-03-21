import { useMutation } from "react-query";

import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ type: "SUCCESS", message: "Hotel Saved" });
            navigate("/my-hotels");
        },
        onError: () => {
            showToast({ type: "ERROR", message: "Error Saving Hotel" });
        },
    });

    const handleSave = (hoteFormData: FormData) => {
        mutate(hoteFormData);
    };
    return (
        <>
            <h1 className="text-3xl font-bold mb-3 text-gray-700">Add Hotel</h1>
            <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
        </>
    );
};

export default AddHotel;

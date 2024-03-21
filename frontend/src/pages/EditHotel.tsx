import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQuery } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useState } from "react";

const EditHotel = () => {
    // hotelId can be undefined
    const { hotelId } = useParams();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { data: hotel } = useQuery(
        "getMyHotelById",
        // this is to handle that
        () => apiClient.getMyHotelById(hotelId || ""),
        {
            // this is to handle that
            enabled: !!hotelId,
        }
    );

    const [deleteState, setDeleteState] = useState<boolean>(false);

    const { isLoading: deleting } = useQuery(
        "deletingMyHotelByid",
        () => apiClient.deleteMyHotelById(hotelId as string),
        {
            enabled: deleteState,
            onSuccess: () => {
                showToast({ type: "SUCCESS", message: "Hotel deleted" });
                navigate("/my-hotels")
            },
            onError: () => {
                showToast({ type: "ERROR", message: "Something went wrong" });
            },
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ type: "SUCCESS", message: "Hotel Saved" });
        },
        onError: (error: Error) => {
            showToast({ type: "ERROR", message: error.message });
        },
    });

    const handleSave = (hotelFormDate: FormData) => {        
        mutate(hotelFormDate);
    };

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-3 text-gray-700">
                    Edit Hotel
                </h1>
                <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => setDeleteState((prev) => !prev)}
                    className="bg-red-500 text-white font-bold text-lg p-2 hover:bg-red-600 disabled:bg-red-400"
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
            <ManageHotelForm
                hotel={hotel}
                onSave={handleSave}
                isLoading={isLoading}
            />
            ;
        </>
    );
};

export default EditHotel;

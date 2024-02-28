import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { BiLogOut } from "react-icons/bi";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            // to make validateToken query invalid, when signing out
            await queryClient.invalidateQueries('validateToken');
            showToast({ message: "Signed Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        <button
            onClick={handleClick}
            className="flex bg-white items-center justify-center text-amber-500 px-1 font-bold hover:bg-amber-900"
        >
            <BiLogOut />
            Sign Out
        </button>
    );
};

export default SignOutButton;

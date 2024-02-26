import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign in Successfull!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData);
    });

    return (
        <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                    type="email"
                    {...register("email", {
                        required: "This field is required",
                    })}
                />
                {errors.email && (
                    <span className="text-red-500 font-normal">
                        {errors.email.message}
                    </span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                    type="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message:
                                "Password must be at least 6 Characters long",
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500 font-normal">
                        {errors.password.message}
                    </span>
                )}
            </label>

            <span className="flex items-center justify-between flex-row-reverse">
                <span className="text-sm">
                    Not Registered?{" "}
                    <Link to={"/register"} className="underline text-blue-600">
                        Create an Account
                    </Link>
                </span>
                <button
                    type="submit"
                    className="bg-amber-500 text-white p-2 font-bold hover:bg-amber-600"
                >
                    Sign In
                </button>
            </span>
        </form>
    );
};

export default SignIn;

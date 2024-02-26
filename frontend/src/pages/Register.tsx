import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    // handles all onChange, onError... stuff
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ type: "SUCCESS", message: "Registration Success!" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ type: "ERROR", message: error.message });
        },
    });

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-blod">Create an Account</h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                        type="text"
                        {...register("firstName", {
                            required: "This field is required",
                        })}
                    />
                    {errors.firstName && (
                        <span className="text-red-500 font-normal">
                            {errors.firstName.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                        type="text"
                        {...register("lastName", {
                            required: "This field is required",
                        })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500 font-normal">
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>

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

            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    className="border rounded border-gray-300 w-full py-3 px-2 font-normal"
                    type="password"
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required";
                            } else if (watch("password") !== val) {
                                return "Your Passwords do not match";
                            }
                        },
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 font-normal">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>

            <span>
                <button
                    type="submit"
                    className="bg-amber-500 text-white p-2 font-bold hover:bg-amber-600"
                >
                    Create Account
                </button>
            </span>
        </form>
    );
};

export default Register;

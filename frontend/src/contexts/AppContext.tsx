import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

export type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

export type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    stripePromise: Promise<Stripe | null>;
}

const AppContext = createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}

export const AppContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    })

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage)
                },
                isLoggedIn: !isError,
                stripePromise
            }}>
            {
                toast &&
                <Toast
                    message={toast.message}
                    type={toast.type}

                    // when timer runout, setToast(undefined)
                    onClose={() => setToast(undefined)}
                />
            }
            {children}
        </AppContext.Provider>
    );
}
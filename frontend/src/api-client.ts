import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
    HotelSearchResponse,
    HotelType,
    PaymentIntentResponse,
    UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

// env variable for vite react
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        // for sending cookies to the backend
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return await response.json();
};

export const getCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error getting data");
    }

    return await response.json();
};

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Something went wrong, while signing out");
    }

    return await response.json();
};

export const addMyHotel = async (hoteFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hoteFormData,
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return await response.json();
};

export const getMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return await response.json();
};

export const getMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching Hotel");
    }

    return await response.json();
};

export const updateMyHotelById = async (newHoteFromData: FormData) => {
    const response = await fetch(
        `${API_BASE_URL}/api/my-hotels/${newHoteFromData.get("hotelId")}`,
        {
            credentials: "include",
            method: "PUT",
            body: newHoteFromData,
        }
    );

    if (!response.ok) {
        throw new Error("Faild to update Hotel");
    }

    return await response.json();
};

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

export const searchHotels = async (
    searchParams: SearchParams
): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    searchParams.facilities?.forEach((item) =>
        queryParams.append("facilities", item)
    );
    searchParams.types?.forEach((item) => queryParams.append("types", item));
    searchParams.stars?.forEach((item) => queryParams.append("stars", item));

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    const response = await fetch(
        `${API_BASE_URL}/api/hotels/search?${queryParams}`
    );

    if (!response.ok) {
        throw new Error("Error fetch hotels");
    }

    return await response.json();
};

export const getHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

    if (!response.ok) {
        throw new Error("Error fetching hotel data");
    }

    return await response.json();
};

export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
): Promise<PaymentIntentResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
        {
            body: JSON.stringify({ numberOfNights }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }
    );

    if (!response.ok) {
        throw new Error("Error getting payment intent");
    }

    return await response.json();
};

export const createBooking = async (formData: BookingFormData) => {
    
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
        {
            body: JSON.stringify(formData),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }
    );

    if (!response.ok) {
        throw new Error("Error getting payment intent");
    }
    // console.log(await response.json());
    
};

import React, { useContext, useState } from "react";

type SearchContextType = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childrenCount: number;
    hotelId: string;
    saveSearchValues: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childrenCount: number,
        hotelId: string
    ) => void;
};

const SearchContext = React.createContext<SearchContextType | undefined>(
    undefined
);

interface SearchContextProviderProps {
    children: React.ReactNode;
}

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [destination, setDestionation] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>("");

    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childrenCount: number,
        hotelId?: string
    ) => {
        setDestionation(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildrenCount(childrenCount);
        if (hotelId) {
            setHotelId(hotelId);
        }
    };

    return (
        <SearchContext.Provider
            value={{
                destination,
                checkIn,
                checkOut,
                adultCount,
                childrenCount,
                hotelId,
                saveSearchValues,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContxt = () => {
    const context = useContext(SearchContext);
    return context;
};

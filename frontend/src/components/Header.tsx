import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <div className="bg-amber-500 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to={"/"}>MernHotel.com</Link>
                </span>
                <span className="flex flex-col md:flex-row gap-4">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="flex items-center bg-amber-500 text-white px-3 font-bold hover:bg-amber-900"
                                to={"/my-bookings"}
                            >
                                My Bookings
                            </Link>

                            <Link
                                className="flex items-center bg-amber-500 text-white px-3 font-bold hover:bg-amber-900"
                                to={"/my-hotels"}
                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link
                            className="flex bg-white items-center text-amber-500 px-3 font-bold hover:bg-amber-900"
                            to={"/sign-in"}
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;

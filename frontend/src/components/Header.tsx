import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { BiBookAlt, BiLogIn, BiSolidHotel } from "react-icons/bi";

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <div className="bg-amber-500 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to={"/"}>MernHotel.com</Link>
                </span>
                <span className="flex flex-col md:flex-row gap-2">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="flex items-center justify-center bg-amber-500 text-white px-1 font-bold hover:bg-amber-900"
                                to={"/my-bookings"}
                            >
                                <BiBookAlt />
                                My Bookings
                            </Link>

                            <Link
                                className="flex items-center justify-center bg-amber-500 text-white px-1 font-bold hover:bg-amber-900"
                                to={"/my-hotels"}
                            >
                                <BiSolidHotel />
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link
                            className="flex bg-white items-center justify-center text-amber-500 px-1 font-bold hover:bg-amber-900"
                            to={"/sign-in"}
                        >
                            <BiLogIn />
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;

import { useEffect, useState } from "react";
import homeBg from "../static/images/homeBg.png";

const Home = () => {
    const flips = ["Hotels", "Motels", "Resorts"];

    const [currFlipIndex, setCurrFlipIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrFlipIndex((prevIndex) => (prevIndex + 1) % flips.length);
        }, 2000);

        return () => clearInterval(interval);
    });

    return (
        <div className="relative border border-slate-300 rounded-xl grid grid-cols-[1fr_1fr] overflow-hidden items-center">
            <div className="absolute left-[-80px] z-0 w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px] bg-blue-700 rounded-full"></div>
            <div
                className={`relative z-1 p-2 text-5xl font-bold text-white item-container`}
            >
                Find <span className="fade-animate">{flips[currFlipIndex]}</span> for your next trip.
            </div>
            <div className="relative z-1">
                <img src={homeBg} />
            </div>
        </div>
    );
};

export default Home;

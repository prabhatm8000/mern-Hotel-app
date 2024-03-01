import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

import heroBanner1 from "../static/images/hero-banner1.jpg";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-amber-500 relative">
                <div className="absolute opacity-30 z-0 h-full w-full">
                    <img src={heroBanner1} className="h-full w-full object-cover" />
                </div>
                <div className="relative z-10">
                    <Header />
                    <Hero />
                </div>
            </div>
            <div className="container mx-auto z-10">
                <SearchBar />
            </div>

            <div className="container mx-auto py-10 flex-1">{children}</div>
            <div className="bg-amber-500 relative overflow-hidden">
                <div className="absolute opacity-30 z-0 h-full w-full">
                    <img src={heroBanner1} className="h-full w-full object-cover object-center" />
                </div>
                <div className="relative z-10">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;

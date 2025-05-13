import About from "@/components/Home/About";
import AllProduct from "@/components/Home/AllProduct";
import Contact from "@/components/Home/Contact";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/Hero";
import React from "react";

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <About />
            <AllProduct />
            <Faq />
            <Contact />
        </div>
    );
};

export default HomePage;

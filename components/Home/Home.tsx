import React from "react";
import Hero from "./Hero";
import AllProduct from "./AllProduct";
import About from "./About";
import Contact from "./Contact";
import Faq from "./Faq";

const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <AllProduct />
            <Faq />
            <Contact />
        </div>
    );
};

export default Home;

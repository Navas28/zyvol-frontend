import React from "react";
import Hero from "./Hero";
// import Category from './Category'
import AllProduct from "./AllProduct";
import About from "./About";

const Home = () => {
    return (
        <div>
            <Hero />
            {/* <Category/> */}
            <About />
            <AllProduct />
        </div>
    );
};

export default Home;

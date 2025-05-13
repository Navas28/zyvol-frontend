import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
            <footer className="mt-10">
                <div className="container px-4 mx-auto">
                    <div className="pt-24 pb-11 mx-auto max-w-4xl">
                        <a className="block md:mx-auto mb-5 max-w-max" href="#">
                           <Image src={"/image/logo.png"} alt="logo" width={230} height={230}/>
                        </a>
                        <div className="flex flex-wrap justify-center -mx-3 lg:-mx-6">
                            <div className="w-full md:w-auto p-3 md:px-6">
                                <a
                                    href="#home"
                                    className="inline-block text-lg text-gray-500 hover:text-gray-600 font-medium"
                                >
                                    Home
                                </a>
                            </div>
                            <div className="w-full md:w-auto p-3 md:px-6">
                                <a
                                    href="#about"
                                    className="inline-block text-lg text-gray-500 hover:text-gray-600 font-medium"
                                >
                                    About
                                </a>
                            </div>
                            <div className="w-full md:w-auto p-3 md:px-6">
                                <a  href="#sneakers" className="inline-block text-lg text-gray-500 hover:text-gray-600 font-medium" >
                                    Sneakers
                                </a>
                            </div>
                         
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-100"></div>
                <div className="container px-4 mx-auto">
                    <p className="py-10 md:pb-20 text-md text-gray-400 font-medium text-center">
                        © 2025 Zyvol. All rights reserved.
                    </p>
                </div>
            </footer>
    );
};

export default Footer;

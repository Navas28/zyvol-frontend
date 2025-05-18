import Image from "next/image";
import React from "react";

const About = () => {
    return (
        <div id="about" className="relative flex items-center justify-center min-h-screen overflow-hidden">
            <div className="relative mx-auto w-full h-full px-4  pb-20  md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-7xl lg:px-8">
                <div className="flex flex-col items-center justify-between lg:flex-row py-16 gap-20">
                    <div className="relative">
                        <div className="lg:max-w-xl lg:pr-5 relative">
                            <p className="flex text-sm uppercase">About Us</p>
                            <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight  sm:text-7xl sm:leading-snug">
                                We make you look
                                <span className="inline-block border-b-8 border-green bg-white font-bold animate__animated animate__flash">
                                    extraordinary
                                </span>
                            </h2>
                            <p className="text-base text-gray-700">
                                Zyvol has revolutionized the sneaker industry with our commitment to bold design, superior
                                comfort, and unmatched quality. We believe that sneakers are more than just footwear—they
                                are a statement of identity, a canvas for self-expression, and the foundation of your
                                personal style. Every pair of Zyvol sneakers combines cutting-edge design with traditional
                                craftsmanship to create footwear that&apos;s as unique as you are.
                            </p>
                            <div className="mt-10 flex flex-col items-center md:flex-row">
                                <a
                                    href="#contact"
                                    className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-green px-6 font-medium tracking-wide text-white shadow-md transition  focus:outline-none md:mr-4 md:mb-0 md:w-auto"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative lg:block">
                        <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[3rem]">
                            <Image src="/image/about.jpg" width={500} height={500} alt=" sneaker" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

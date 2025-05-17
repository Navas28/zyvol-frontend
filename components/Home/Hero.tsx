"use client";

import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

export default function HeroSection() {
    const sneakers = [
        {
            id: 1,
            title: "The New Balance 550 Gol\nWhite/Green",
            subtitle: "12000",
            image1: "/image/nb-2.png",
            image2: "/image/nb-1.png",
            image3: "/image/nb-3.png",
            color: "bg-[#12392a]",
        },

        {
            id: 2,
            title: "PSG x Nike Air Max Plus\nAnthracite",
            subtitle: "17000",
            image1: "/image/paris-2.png",
            image2: "/image/paris-1.png",
            image3: "/image/paris-3.png",
            color: "bg-[#525E68]",
        },

        {
            id: 3,
            title: "Air Jordan Type 39\nGym Red",
            subtitle: "17000",
            image1: "/image/red-2.png",
            image2: "/image/red-1.png",
            image3: "/image/red-3.png",
            color: "bg-[#ab052d]",
        },
        {
            id: 4,
            title: "Nike Air Max Craze WMNS\nLaser Orange",
            subtitle: "14000",
            image1: "/image/airmax-2.png",
            image2: "/image/airmax-1.png",
            image3: "/image/airmax-3.png",
            color: "bg-[#fa9a43]",
        },
    ];

    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    const goNext = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };

    return (
        <div className="relative bg-gray-100 overflow-hidden" id="home">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                onSwiper={setSwiperInstance}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full h-screen"
            >
                {sneakers.map((sneaker) => (
                    <SwiperSlide key={sneaker.id}>
                        <div className="flex flex-col md:flex-row min-h-screen">
                            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 relative">
                                <div className={`absolute top-0 left-0 w-full h-full  ${sneaker.color}`}></div>
                                <div className="relative z-20 mb-10">
                                    <p className="font-semibold text-lg text-white mt-10 md:mt-0 font-rob">NEW IN</p>
                                    <h1 className=" text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wide font-pop">
                                        {sneaker.title.split("\n").map((line, index) => (
                                            <span key={index} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </h1>
                                    <p className="text-white text-xl md:text-2xl mb-4 max-w-lg">
                                        &#8377; {sneaker.subtitle}
                                    </p>
                                    <a
                                        href="#sneakers"
                                        className="bg-white/20 text-white font-semibold py-2 px-8 rounded-md text-lg transition-all duration-300 transform hover:scale-105 mb-10 md:mb-0 font-rob"
                                    >
                                        More <ArrowRight className="inline" />
                                    </a>
                                </div>

                                <div className="absolute md:bottom-12 -bottom-20 left-8 md:left-16 lg:left-24 flex space-x-4">
                                    <button
                                        onClick={goPrev}
                                        className=" px-7 h-9 bg-white rounded-md shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
                                    >
                                        <ArrowLeft />
                                    </button>
                                    <button
                                        onClick={goNext}
                                        className="px-7 h-9 rounded-md bg-black text-white shadow-lg flex items-center justify-center hover:text-black hover:bg-white transition-colors duration-300"
                                    >
                                        <ArrowRight />
                                    </button>
                                </div>
                            </div>

                            <div className="w-full xl:w:1/2 2xl:w-1/3 relative flex items-center justify-center bg-gray-100">
                                <div className="relative w-full h-full flex items-center justify-center top-100 md:top-0">
                                    <div className="absolute rounded-full w-full h-full 2xl:w-4/5 2xl:h-4/5 2xl:flex-none 2xl:justify-normal max-w-2xl max-h-2xl  flex flex-col justify-center">
                                        <Image src={sneaker.image3} alt="sneaker" width={500} height={500} className="object-cover" />
                                    </div>
                                    <Image
                                        src={sneaker.image1}
                                        alt="Sneaker"
                                        className="hidden 2xl:block relative z-10 w-full max-w-lg xl:max-w-xl transform rotate-12  transition-transform duration-500 drop-shadow-2xl object-cover"
                                        width={500} height={500}
                                    />
                                    <Image
                                        src={sneaker.image2}
                                        alt="Sneaker"
                                        className="hidden 2xl:block relative z-10 w-full max-w-lg xl:max-w-xl transform -rotate-12 transition-transform duration-500 drop-shadow-2xl object-cover"
                                        width={500} height={500}
                                    />
                                    <div className="absolute md:bottom-12 bottom-80 right-12 flex space-x-6 z-20">
                                        <a
                                            href="#"
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-300"
                                        >
                                            <Instagram className="w-5 h-5 text-gray-800" />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-300"
                                        >
                                            <Facebook className="w-5 h-5 text-gray-800" />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-300"
                                        >
                                            <Twitter className="w-5 h-5 text-gray-800" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

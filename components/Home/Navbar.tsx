import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBox from "../Helper/SearchBox";
import { Heart, UserIcon } from "lucide-react";
import ShopingCartButton from "../Helper/ShopingCartButton";

const Navbar = () => {
    return (
        <div className="h-[12vh] sticky top-0 z-[1] bg-white shadow-md">
            <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full">
                <Link href={"/"}>
                    <Image src={"/image/logo.png"} alt="logo" width={140} height={140} />
                </Link>
                <div className="flex items-center space-x-6">
                    <SearchBox />
                    <Heart size={26} cursor={"pointer"} />
                    <ShopingCartButton/>
                    <UserIcon size={26} cursor={"pointer"}/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

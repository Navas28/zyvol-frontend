"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBox from "../Helper/SearchBox";
import { ShieldUser, UserIcon } from "lucide-react";
import ShopingCartButton from "../Helper/ShopingCartButton";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import FavoriteButton from "../Helper/FavoriteButton";

const Navbar = () => {

    return (
        <div className="h-[12vh] sticky top-0 z-10 bg-white shadow-md">
            <div className="flex items-center justify-evenly w-[95%] md:w-4/5 mx-auto h-full">
                <Link href={"/"}>
                    <Image src={"/image/logo.png"} alt="logo" width={140} height={140} />
                </Link>
                <SearchBox />
                <div className="flex items-center gap-4">
                    <FavoriteButton />
                    <ShopingCartButton />
                    <Link href="/admin/products" className="hover:underline underline-offset-2">
                        <ShieldUser size={30} />
                    </Link>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <UserIcon size={26} cursor={"pointer"} />
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

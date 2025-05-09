"use client";

import { RootState } from "@/store/store";
import { ShoppingBagIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import CartSidebar from "./CartSidebar";

const ShopingCartButton = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    return (
        <Sheet>
            <SheetTrigger>
                <div className="relative">
                    {totalQuantity > 0 && (
                        <span className="absolute -top-3 -right-2 w-6 h-6 bg-green text-center flex items-center justify-center text-white rounded-full text-sm font-semibold">
                            {totalQuantity}
                        </span>
                    )}
                    <ShoppingBagIcon size={26} cursor={"pointer"} />
                </div>
            </SheetTrigger>
            <SheetContent className="overflow-auto h-full" side="left">
                <SheetTitle className="text-center font-bold text-lg mt-10">Your Cart</SheetTitle>
                <CartSidebar items={items} />
            </SheetContent>
        </Sheet>
    );
};

export default ShopingCartButton;

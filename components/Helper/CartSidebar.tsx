import { addItem, CartItem, removeItem } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";

type Props = {
    items: CartItem[];
};

const CartSidebar = ({ items }: Props) => {
    const dispatch = useDispatch();

    const addCart = (item: CartItem) => dispatch(addItem(item));
    const removeCart = (id: string, size: number) => {
        dispatch(removeItem({ id, size }));
      };

    return (
        <div className="mt-6 h-full mb-6">
            {items.length == 0 && (
                <div className="flex items-center w-full h-[80vh] flex-col justify-center">
                    <Image
                        src={"/image/logo.png"}
                        alt="empty cart"
                        width={200}
                        height={200}
                        className="object-cover mx-auto"
                    />
                    <h1 className="mt-8 text-2xl font-semibold">Your Cart is Empty</h1>
                </div>
            )}

            {items.length > 0 && (
                <div>
                    {items?.map((item) => {
                        return (
                            <div key={item.id} className="pb-4 border-b-2 border-gray-300 border-opacity-60 p-4">
                                <div>
                                    <Image
                                        src={item?.image}
                                        alt={item.title}
                                        width={60}
                                        height={60}
                                        className="object-cover mb-4"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-sm w-4/5 font-semibold truncate">{item?.title}</h1>
                                    <h1 className="text-base text-blue-950 font-bold">
                                        ${(item?.price * item?.quantity).toFixed(2)}
                                    </h1>
                                    <button className="bg-black text-white px-5 rounded-md">{item?.size}</button>
                                    <h1 className="text-base font-bold mb-2">Quantity : {item?.quantity}</h1>
                                    <div className="flex items-center space-x-4">
                                        <button onClick={() => {removeCart(item.id, item.size)}}  className="bg-black text-white px-3 py-2">Remove</button>
                                        <button onClick={() => {addCart(item)}} className="bg-red-500 text-white px-3 py-2">Add</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <Link href="/cart">
                        <SheetClose className="w-full mb-6 mt-6 bg-black text-white text-center px-4 py-2">
                            View All Cart
                        </SheetClose>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;

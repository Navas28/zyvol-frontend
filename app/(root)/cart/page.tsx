"use client";

import { CartItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { removeItem } from "@/store/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = Math.round (items.reduce((total, item) => total + item.price * item.quantity, 0));
    const discount = Math.round(totalPrice * 0.05 );
    const finalPrice = Math.round(totalPrice - discount).toFixed(2);

    const addItemCart = (item: CartItem) => {
        dispatch(addItem(item));
    };

    const removeItemCart = (id: string, size: number) => {
        dispatch(removeItem({ id, size }));
    };

    const handleCheckout = async () => {
        const response = await fetch('http://localhost:4000/api/checkout/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: finalPrice, 
          }),
        });
      
        const data = await response.json();
        
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error('Error:', data.error);
        }
      };
      

    return (
        <div className="mt-8 min-h-[60vh]">
            {items.length == 0 && (
                <div className="flex items-center w-full h-[80vh] flex-col justify-center">
                    <Image
                        src="/image/airmax-1.png"
                        alt="empty cart"
                        width={400}
                        height={400}
                        className="object-cover mx-auto"
                    />
                    <h1 className="mt-8 text-2xl font-semibold">Your Cart is Empty</h1>
                    <Link href="/">
                        <button className="bg-black text-white px-4 py-2">Shop now</button>
                    </Link>
                </div>
            )}
            {items.length > 0 && (
                <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 xl:grid-cols-6 gap-12">
                    <div className="rounded-lg shadow-md overflow-hidden xl:col-span-4">
                        <h1 className="p-4 text-xl sm:text-2xl font-bold bg-black text-white">
                            Your Cart {totalQuantity} Items
                        </h1>

                        {items.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="flex pb-6 mt-2 p-5 border-b-2 border-opacity-25 border-gray-700 items-center space-x-10">
                                        <div>
                                            <Image src={item.image} alt={item.title} width={180} height={180} />
                                        </div>
                                        <div>
                                            <h1>{item.title}</h1>
                                            <h1>category: {item.category}</h1>
                                            <h1>&#8377;{item.price}</h1>
                                            <h1>quantity: {item.quantity}</h1>
                                            {item.size && <h1>Size: {item.size}</h1>}
                                        </div>
                                        <div className="flex items-center mt-4 space-x-2">
                                            <button
                                                onClick={() => {
                                                    addItemCart(item);
                                                }}
                                                className="bg-red-400"
                                            >
                                                Add more
                                            </button>
                                            <button
                                                onClick={() => removeItemCart(item.id, item.size)}
                                                className="bg-red-200"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="xl:col-span-2">
                        <div className="sticky top-[25vh] p-6 rounded-lg">
                            <h1 className="text-center mt-8 mb-8 text-2xl font-semibold">Bill</h1>
                            <div className="w-full h-[1.2px] bg-black bg-opacity-20"></div>
                            <div className="flex mt-4 text-xl uppercase font-semibold items-center justify-between">
                                <span>Subtotal</span>
                                <span>&#8377;
                                {totalPrice}</span>
                            </div>
                            <div className="flex mt-10 text-xl uppercase font-semibold items-center justify-between">
                                <span>Special Discount (5%)</span>
                                <span>&#8377;
                                {discount}</span>
                            </div>
                            <div className="flex mb-6 text-xl uppercase font-semibold items-center justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="w-full h-[1.2px] bg-black bg-opacity-20"></div>
                            <div className="flex mb-6 mt-6 text-xl uppercase font-semibold items-center justify-between">
                                <span>Total</span>
                                <span>&#8377;
                                  {finalPrice}</span>
                            </div>

                            <button onClick={handleCheckout} className="bg-amber-300">Pay now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

"use client";

import { CartItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/store/cartSlice";
import { ArrowRight, ChevronLeftIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Cart = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const items = useSelector((state: RootState) => state.cart.items);

    const totalPrice = Math.round(items.reduce((total, item) => total + item.price * item.quantity, 0));
    const discount = Math.round(totalPrice * 0.05);
    const finalPrice = Math.round(totalPrice - discount).toFixed(2);

    const addItemCart = (item: CartItem) => {
        dispatch(addItem(item));
    };

    const removeItemCart = (id: string, size: number) => {
        dispatch(removeItem({ id, size }));
    };

    const handleCheckout = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: finalPrice,
            }),
        });

        const data = await response.json();

        if (data.url) {
            window.location.href = data.url;
        } else {
            console.error("Error:", data.error);
        }
    };

    return (
        <div className="mt-8 min-h-[60vh]">
            <Button variant="link" onClick={() => router.back()} className="gap-1 cursor-pointer ml-10">
                <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
                Go back
            </Button>
            {items.length === 0 && (
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
                <section className="bg-white py-8 antialiased md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">Shopping Cart</h2>

                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div
                                            key={`${item.id}-${item.size}`}
                                            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                                        >
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        width={80}
                                                        height={80}
                                                        className="h-20 w-20"
                                                    />
                                                </a>

                                                <label htmlFor="counter-input" className="sr-only">
                                                    Choose quantity:
                                                </label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        <button
                                                            type="button"
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                                            onClick={() => removeItemCart(item.id, item.size)}
                                                        >
                                                            <svg
                                                                className="h-2.5 w-2.5 text-gray-900 "
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 2"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M1 1h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <input
                                                            type="text"
                                                            id="counter-input"
                                                            data-input-counter
                                                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                                                            placeholder=""
                                                            value={item.quantity}
                                                            readOnly
                                                        />
                                                        <button
                                                            type="button"
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                                            onClick={() => addItemCart(item)}
                                                        >
                                                            <svg
                                                                className="h-2.5 w-2.5 text-gray-900"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M9 1v16M1 9h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900">
                                                            &#8377;{item.price}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <a
                                                        href="#"
                                                        className="text-base font-medium text-gray-900 hover:underline"
                                                    >
                                                        {item.title}
                                                    </a>
                                                    <div className="text-sm">
                                                        <p>{item.brand}</p>
                                                        {item.size && <p>Size: {item.size}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900 ">Order summary</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 ">Original price</dt>
                                                <dd className="text-base font-medium text-gray-900 ">
                                                    &#8377;{totalPrice}
                                                </dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">
                                                    Special Discount (5%)
                                                </dt>
                                                <dd className="text-base font-medium text-green-600">-&#8377;{discount}</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">Shipping</dt>
                                                <dd className="text-base font-medium text-gray-900">Free</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">Tax</dt>
                                                <dd className="text-base font-medium text-gray-900">Included</dd>
                                            </dl>
                                        </div>

                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">&#8377;{finalPrice}</dd>
                                        </dl>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white bg-red hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 cursor-pointer"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-normal text-gray-500 "> or </span>
                                        <Link
                                            href="/"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                                        >
                                            Continue Shopping
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                                    <div className="flex items-center">
                                        <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                                        <p className="text-xl font-semibold text-gray-900">Shipping Address</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="fullName"
                                                className="mb-2 block text-sm font-medium text-gray-900 "
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 "
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="mb-2 block text-sm font-medium text-gray-900 "
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="addressLine1"
                                                className="mb-2 block text-sm font-medium text-gray-900 "
                                            >
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                name="addressLine1"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-900">
                                                State/Province
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="postalCode"
                                                className="mb-2 block text-sm font-medium text-gray-900"
                                            >
                                                ZIP/Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Cart;

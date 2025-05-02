"use client";

import { addItem } from "@/store/cartSlice";
import { Product } from "@/typing";
import { Heart, ShoppingCart, ShoppingCartIcon, StarIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const availableSizes = [4, 5, 6, 7, 8, 9, 10];

    const dispatch = useDispatch();

    const handleAddtoCart = () => {
        if (!selectedSize) {
            toast.error("Select a size to add to cart");
            return;
        }

        dispatch(
            addItem({
                id: product._id,
                title: product.title,
                price: product.price,
                category: product.category,
                image: product.image,
                size: selectedSize,
            })
        );
        setShowModal(false);
        setSelectedSize(null);
    };

    return (
        <div className="p-4 relative">
            <div className="w-[200px] h-[150px]">
                <Image
                    src={product.image}
                    alt={product.title}
                    className="w-[80%] h-[80%] object-contain"
                    width={100}
                    height={100}
                />
            </div>
            <p className="mt-5 text-xs capitalize text-gray-600">{product.category}</p>
            <Link href={`/product/product-details/${product._id}`}>
                <h1 className="text-lg cursor-pointer hover:text-blue-900 transition-all hover:underline sm:w-full sm:truncate mt-2 text-black font-semibold">
                    {product.title}
                </h1>
            </Link>
            <div className="flex mt-2 items-center space-x-2">
                <p className="text-black text-base line-through font-semibold opacity-50">
                    {`$${(product.price + 10).toFixed(2)}`}
                </p>
                <p className="text-black text-lg font-semibold opacity-80">${product.price}</p>
            </div>
            <div className="mt-4 flex items-center space-x-2">
                <button onClick={() => setShowModal(true)}>
                    <ShoppingCartIcon size={18} />
                </button>
                <button>
                    <Heart size={18} />
                </button>
            </div>

            {showModal && (
                <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-[280px]">
                        <button
                            className="absolute right-3 top-3 text-gray-500 hover:text-black"
                            onClick={() => setShowModal(false)}
                        >
                            <X size={18} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Select Size</h2>
                        <div className="flex flex-wrap gap-2">
                            {availableSizes.map((size) => (
                                <button
                                    key={size}
                                    className={`px-3 py-1 rounded border ${
                                        selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                                    }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleAddtoCart} className="mt-4 bg-black text-white w-full py-2 rounded">
                            Confirm Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;

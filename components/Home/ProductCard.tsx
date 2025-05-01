"use client";

import { addItem } from "@/store/cartSlice";
import { Product } from "@/typing";
import { Heart, ShoppingCart, ShoppingCartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    const num = Math.round(product.rating.rate);
    const ratingArray = new Array(num).fill(0);
    
    const dispatch = useDispatch();

    const addToCartHandler = (product: Product) => {
        dispatch(addItem(product));
        toast.success(`"${product.title}" Added to Cart`, {
            description: "Its now availiable in your shopping cart.",
            icon: <ShoppingCart className="text-emerald-500" size={18}/>,
            className: "bg-white border border-emerald-500 text-emerald-700",
            duration: 3000
        })
    };
    return (
        <div className="p-4">
            <div className="w-[200px] h-[150px]">
                <Image
                    src={product.image}
                    alt={product.title}
                    className="w-[80%] h-[80%] object-contain"
                    width={100}
                    height={100}
                />
            </div>
            <p className="mt-5 text-xs capitalize text-gra-600">{product.category}</p>
            <Link href={`/product/product-details/${product.id}`}>
                <h1 className="text-lg cursor-pointer hover:text-blue-900 transition-all hover:underline sm:w-full sm:truncate mt-2 text-black font-semibold">
                    {product.title}
                </h1>
            </Link>
            <div className="flex items-center">
                {ratingArray.map((star) => {
                    return <StarIcon key={Math.random() * 1000} size={16} fill="yellow" className="text-yellow-500" />;
                })}
            </div>
            <div className="flex mt-2 items-center space-x-2">
                <p className="text-black text-base line-through font-semibold opacity-50">
                    {`$${(product.price + 10).toFixed(2)}`}
                </p>
                <p className="text-black text-lg font-semibold opacity-80">${product.price}</p>
            </div>
            <div className="mt-4 flex items-center space-x-2">
                <button
                    onClick={() => {
                        addToCartHandler(product);
                    }}
                >
                    <ShoppingCartIcon size={18} />
                </button>
                <button>
                    <Heart size={18} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

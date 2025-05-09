"use client";

import { addItem } from "@/store/cartSlice";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";
import { Product } from "@/typing";
import { useUser } from "@clerk/nextjs";
import { Heart, ShoppingCartIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ComponentModal from "../comp-323";

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const favorites = useSelector((state: any) => state.favorites.items);
    const isFavorite = favorites.some((item: Product) => item._id === product._id);

    const handleFavoriteToggle = () => {
        if (!isLoaded || !isSignedIn) {
            toast.error("Please log in to add to favorites.");
            return;
        }
        if (isFavorite) {
            dispatch(removeFavorite(product._id));
            toast.success(`"${product.title}" removed from favorites!`, {
                icon: <Heart size={18} className="text-red-600" />,
            });
        } else {
            dispatch(addFavorite(product));
            toast.success(`"${product.title}" added to favorites!`, {
                icon: <Heart size={18} className="text-red-600" />,
            });
        }
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
            <p className="mt-5 text-md font-bold capitalize text-gray-600">{product.brand}</p>
            <p className="text-xs text-gray-600">{product.color}</p>
            <Link href={`/product/product-details/${product._id}`}>
                <h1 className="text-lg cursor-pointer hover:text-blue-900 transition-all hover:underline sm:w-full sm:truncate mt-2 text-black font-semibold">
                    {product.title}
                </h1>
            </Link>
            <div className="flex mt-2 items-center space-x-2">
                <p className="text-black text-base line-through font-semibold opacity-50">
                    &#8377;{`${(product.price * 1.25).toFixed(2)}`}
                </p>
                <p className="text-black text-lg font-semibold opacity-80">&#8377;{product.price}</p>
            </div>
            <div className="mt-4 flex items-center space-x-2">
                {isLoaded && isSignedIn ? (
                    <ComponentModal
                        availiableSizes={product.sizes ?? []}
                        onAddToCart={(size) => {
                            dispatch(
                                addItem({
                                    id: product._id,
                                    title: product.title,
                                    price: product.price,
                                    category: product.category,
                                    image: product.image,
                                    size,
                                })
                            );
                            toast.success(`"${product.title}" added to cart!`);
                            setShowModal(false);
                        }}
                    />
                ) : (
                    <button className="cursor-not-allowed opacity-50" disabled>
                        <ShoppingCartIcon size={18} />
                    </button>
                )}

                {isLoaded && isSignedIn ? (
                    <button onClick={handleFavoriteToggle}>
                        <Heart size={18} className={isFavorite ? "text-red-600" : "text-gray-600"} />
                    </button>
                ) : (
                    <button className="cursor-not-allowed opacity-50" disabled>
                        <Heart size={18} className="text-gray-600" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

"use client";

import { addItem } from "@/store/cartSlice";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";
import { Product } from "@/typing";
import { useUser } from "@clerk/nextjs";
import { Heart, HeartCrack, ShoppingCartIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ComponentModal from "../comp-323";
import { RootState } from "@/store/store";

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    const { isLoaded, isSignedIn } = useUser();
    const dispatch = useDispatch();

    const favorites = useSelector((state: RootState) => state.favorites.items);
    const isFavorite = favorites.some((item: Product) => item._id === product._id);

    const handleFavoriteToggle = () => {
        if (!isLoaded || !isSignedIn) {
            toast.error("Please log in to add to favorites.");
            return;
        }
        if (isFavorite) {
            dispatch(removeFavorite(product._id));
            toast.error(`"${product.title}" removed from favorites!`, {
                icon: <HeartCrack size={18} className="text-red-600" />,
            });
        } else {
            dispatch(addFavorite(product));
            toast.success(`"${product.title}" added to favorites!`, {
                icon: <Heart size={18} className="text-red-600" />,
            });
        }
    };

    return (
        <article className="max-w-sm w-full rounded-lg shadow-lg overflow-hidden  hover:scale-105 duration-500 ease-in-out">
            <div>
                <Image
                    src={product.image}
                    alt={product.title}
                    className="object-cover h-64 w-full"
                    width={400}
                    height={400}
                />
            </div>

            <div className="flex flex-col gap-1 mt-4 px-4">
                <Link href={`/product/product-details/${product._id}`}>
                    <h1 className="text-lg cursor-pointer hover:text-blue-900 transition-all hover:underline sm:w-full sm:truncate mt-2 text-black font-semibold">
                        {product.title}
                    </h1>
                </Link>

                <span className="font-normal text-gray-600 dark:text-gray-300">{product.brand}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{product.color}</span>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 line-through dark:text-gray-400">
                        ₹{(product.price * 1.25).toFixed(2)}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-50">₹{product.price}</span>
                </div>
            </div>

            <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500 flex justify-between items-center">
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
                                    brand: product.brand,
                                    size,
                                })
                            );
                            toast.success(`"${product.title}" added to cart!`);
                        }}
                    />
                ) : (
                    <button className="cursor-not-allowed opacity-50" disabled>
                        <ShoppingCartIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>
                )}

                {isLoaded && isSignedIn ? (
                    <button onClick={handleFavoriteToggle}>
                        <Heart className={`h-6 w-6 ${isFavorite ? "text-red-600" : "text-gray-600 dark:text-gray-300"}`} />
                    </button>
                ) : (
                    <button className="cursor-not-allowed opacity-50" disabled>
                        <Heart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>
                )}
            </div>
        </article>
    );
};

export default ProductCard;

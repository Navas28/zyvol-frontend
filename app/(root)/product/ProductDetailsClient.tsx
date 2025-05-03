'use client'

import { Product } from "@/typing";
import { ShoppingCart, StarIcon, TriangleAlert } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
// import CartButton from "./product-details/[id]/CartButton";
import ProductCard from "@/components/Home/ProductCard";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const ProductDetailsClient = ({ product, relatedProduct }: { product: Product, relatedProduct: Product[] }) => {
    const {isLoaded,isSignedIn} = useUser();
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const dispatch = useDispatch();

    const handleSize = (size: number) => {
        setSelectedSize(size);
    };

    const handleAddtoCart = () => { 
        if (!isLoaded || !isSignedIn) {
            toast.error("Please sign in to add items to your cart.", {
                icon: <TriangleAlert className="text-red-600" />,
                duration: 3000,
            });
            return;
        }
        if (selectedSize) {
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
            toast.success(`"${product.title}" (Size: ${selectedSize}) Added to Cart`, {
                description: "It's now available in your shopping cart.",
                icon: <ShoppingCart className="text-emerald-500" size={18} />,
                className: "bg-white border border-emerald-500 text-emerald-700",
                duration: 3000,
            });
        } else {
            toast.error(`"${product.title}"  Size not Selected`, {
                description: "Please select a size before adding the product to your cart.",
                duration: 3000,
                icon: <TriangleAlert className="text-yellow-600" />
            });
        }
    };

    return (
        <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-7 items-center gap-4">
        <div className="col-span-3 mb-6 lg:mb-0">
            <Image src={product.image} alt={product.title} width={400} height={400} />
        </div>
        <div className="col-span-4">
            <h1 className="lg:text-3xl text-2xl font-bold text-black">{product.title}</h1>
            <span className="w-1/4 h-[1.6px] bg-gray-400 rounded-lg block mt-4 opacity-20 mb-4"></span>
            <h1 className="lg:text-6xl text-3xl text-blue-950 font-bold">${product?.price.toFixed(2)}</h1>
            <p className="mt-4 text-base text-black opacity-70">{product?.description}</p>
            <p className="mt-4 text-sm text-black text-opacity-70 font-semibold">
                Category: {product?.category}
            </p>

            <div className="mt-4">
                <p className="text-sm text-black text-opacity-70 font-semibold">Select Size</p>
                <select
                    className="mt-2 p-2 border border-gray-300 rounded-md"
                    value={selectedSize ?? ''}
                    onChange={(e) => handleSize(Number(e.target.value))}
                >
                    <option value="" disabled>Select size</option>
                    {product.sizes?.map((size: number) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleAddtoCart}
                className={`mt-4 px-6 py-2 rounded-md ${
                    !isSignedIn ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
                }`}
                disabled={!isSignedIn}
            >
                Add to Cart
            </button>

          
            {/* <CartButton product={product} /> */}
        </div>

        <div className="w-4/5 mt-16 mx-auto">
            <h1 className="text-2xl text-black font-semibold">Related Products</h1>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {relatedProduct.map((relatedPro) => (
                    <ProductCard key={relatedPro._id} product={product} />
                ))}
            </div>
        </div>
    </div>
);
};

export default ProductDetailsClient;

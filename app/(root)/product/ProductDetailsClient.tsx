"use client";

import { Product } from "@/typing";
import { ShoppingCart, StarIcon, TriangleAlert } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/Home/ProductCard";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AccordianComponent from "@/components/ProductAccordion";
import CopyComponent from "@/components/Copy";
import {  getProductByCategory } from "@/Request/requests";

const ProductDetailsClient = ({ product }: { product: Product; relatedProduct: Product[] }) => {
    const { isLoaded, isSignedIn } = useUser();
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [mainImage, setMainImage] = useState(product.additionalImages[0]);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const handleSize = (size: number) => {
        setSelectedSize(size);
    };

    useEffect(() => {
        const fetchRelated = async () => {
            const res = await getProductByCategory(product.category);
            // Exclude the current product
            const filtered = res.filter((pro: Product) => pro._id !== product._id);
            setRelatedProducts(filtered);
        };

        if (product?.category) {
            fetchRelated();
        }
    }, [product]);
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
                    brand: product.brand,
                    size: product.sizes,
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
                icon: <TriangleAlert className="text-yellow-600" />,
            });
        }
    };

    return (
        <div>
            <Button variant="link" onClick={() => router.back()} className="gap-1 cursor-pointer ml-10">
                <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
                Go back
            </Button>
            <div className="flex justify-center items-center px-4">
                <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-6xl gap-12">
                    <div className="flex flex-col items-start gap-4 w-full md:w-1/2">
                        <div className="w-full border rounded-lg overflow-hidden">
                            <Image
                                src={mainImage}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="object-contain w-full"
                                quality={100}
                            />
                        </div>
                        <div className="flex gap-3">
                            {product.additionalImages.map((imgUrl, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer border rounded-md overflow-hidden ${
                                        imgUrl === mainImage ? "ring-2 ring-blue-600" : "opacity-60 hover:opacity-100"
                                    }`}
                                    onClick={() => setMainImage(imgUrl)}
                                >
                                    <Image
                                        src={imgUrl}
                                        alt={`${product.title} ${index + 1}`}
                                        width={80}
                                        height={80}
                                        quality={100}
                                        className="object-cover w-[80px] h-[80px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 space-y-4">
                        <p>{product.brand}</p>
                        <div className="flex justify-between">
                            <h1 className="lg:text-3xl text-2xl font-bold text-black">{product.title} </h1>
                            <CopyComponent text={product.title} />
                        </div>
                        <p>{product.color}</p>
                        <h1 className="lg:text-6xl text-3xl text-blue-950 font-bold">₹{product?.price.toFixed(2)}</h1>
                        <div>
                            <p className="text-sm text-black text-opacity-70 font-semibold">Select Size</p>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes?.map((size: number) => (
                                    <button
                                        key={size}
                                        onClick={() => handleSize(size)}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                            selectedSize === size
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-black border-gray-300 hover:border-black"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <AccordianComponent product={product} />
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleAddtoCart}
                            className={`mt-4 px-6 py-2 rounded-md ${
                                !isSignedIn ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"
                            }`}
                            disabled={!isSignedIn}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-4/5 mt-16 mx-auto">
                <h1 className="text-2xl text-black font-semibold">Related Products</h1>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {relatedProducts.map((relatedPro) => (
                        <ProductCard key={relatedPro._id} product={relatedPro} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsClient;

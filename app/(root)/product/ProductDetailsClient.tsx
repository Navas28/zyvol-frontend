"use client";

import { Product } from "@/typing";
import { ShoppingCart, TriangleAlert } from "lucide-react";
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
import { getProductByCategory } from "@/Request/requests";

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
                    size: selectedSize as number,
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
            <Button variant="link" onClick={() => router.back()} className="gap-1 cursor-pointer md:ml-10">
                <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
                Go back
            </Button>

            <div className="flex justify-center items-center px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-6xl gap-8 lg:gap-12">
                    <div className="flex flex-col items-start gap-4 w-full md:w-1/2">
                        <div className="w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                            <Image
                                src={mainImage}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="object-contain w-full"
                                quality={100}
                            />
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {product.additionalImages.map((imgUrl, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 ${
                                        imgUrl === mainImage
                                            ? "ring-2 ring-yellow ring-offset-2"
                                            : "opacity-70 hover:opacity-100 hover:shadow-md"
                                    }`}
                                    onClick={() => setMainImage(imgUrl)}
                                >
                                    <Image
                                        src={imgUrl}
                                        alt={`${product.title} ${index + 1}`}
                                        width={80}
                                        height={80}
                                        quality={80}
                                        className="object-cover w-[80px] h-[80px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 space-y-6 pt-4 md:pt-0">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                                    {product.brand}
                                </span>
                            </div>

                            <div className="flex justify-between items-start gap-4">
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {product.title}
                                </h1>
                                <CopyComponent text={product.title} />
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{product.color}</span>
                            </div>

                            <div className="flex items-baseline mt-2">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                                    ₹{product?.price.toFixed(2)}
                                </h2>
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                    ₹{(product?.price * 1.25).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Size</p>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes?.map((size: number) => (
                                    <button
                                        key={size}
                                        onClick={() => handleSize(size)}
                                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
                                            selectedSize === size
                                                ? "bg-green text-white shadow-md"
                                                : "bg-white text-gray-800  border-gray-300 hover:border-gray-800"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <AccordianComponent product={product} />
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleAddtoCart}
                                className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                                    !isSignedIn ? "bg-gray-300 text-gray-500" : "bg-green text-white"
                                }`}
                                disabled={!isSignedIn}
                            >
                                {!isSignedIn ? "Sign in to purchase" : "Add to Cart"}
                            </button>
                        </div>
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

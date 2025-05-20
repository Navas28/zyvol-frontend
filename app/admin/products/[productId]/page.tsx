"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, CheckCircle, ChevronLeftIcon, Trash2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Product = {
    _id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    brand: string;
    color: string;
    sizes: number[];
};

export default function EditProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [sizeInput, setSizeInput] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (productId) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                    setProduct(data);
                    setSizeInput(data.sizes.join(","));
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                    setLoading(false);
                });
        }
    }, [productId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px] text-gray-600 text-lg font-medium">
                Loading product details...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-[200px] text-red-600 text-lg font-semibold">
                Product not found.
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;

        if (field === "sizes") {
            setSizeInput(value);

            const sizeArray = value
                .split(",")
                .map((s) => parseInt(s.trim(), 10))
                .filter((n) => !isNaN(n));
            setProduct({ ...product!, sizes: sizeArray });
        } else if (field === "price") {
            setProduct({ ...product!, [field]: parseFloat(value) });
        } else {
            setProduct({ ...product!, [field]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success("Product updated successfully", {
                    icon: <CheckCircle size={18} className="text-green-600" />,
                });
            })
            .catch(() => {
                toast.error("Error updating product.", {
                    icon: <AlertTriangle size={18} className="text-yellow-600" />,
                });
            });
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete product");
            toast.success("Product deleted successfully!", {
                icon: <Trash2 size={18} className="text-red-600" />,
            });
            router.push("/admin/products");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting product.", {
                icon: <AlertTriangle size={18} className="text-yellow-600" />,
            });
        }
    };

    return (
        <div className="p-8  min-h-screen">
            <Button variant="link" onClick={() => router.push("/admin/products")} className="hidden md:flex gap-1 cursor-pointer ml-10">
                <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
                Go back
            </Button>
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
                        <p className="text-gray-600 mt-1">Update or delete product information</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="p-6 flex flex-col md:flex-row items-center">
                        <div className="w-40 h-40 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                            <Image
                                src={product.image}
                                alt="produc image"
                                height={100}
                                width={100}
                                className="w-full h-full object-cover rounded-md border border-gray-200"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{product.title}</h2>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-[#f2f2f2]">
                                    {product.category}
                                </span>
                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-[#f2f2f2]">
                                    ₹{product.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={product.title}
                                    onChange={(e) => handleInputChange(e, "title")}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => handleInputChange(e, "price")}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={product.image}
                                    onChange={(e) => handleInputChange(e, "image")}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={product.category}
                                    onChange={(e) => handleInputChange(e, "category")}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                <input
                                    type="text"
                                    value={product.brand}
                                    onChange={(e) => handleInputChange(e, "brand")}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                <input
                                    type="text"
                                    value={product.color}
                                    onChange={(e) => handleInputChange(e, "color")}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                                <input
                                    type="text"
                                    value={sizeInput}
                                    onChange={(e) => handleInputChange(e, "sizes")}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
                                    placeholder="e.g., 38,40,42,44"
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={product.description}
                                    onChange={(e) => handleInputChange(e, "description")}
                                    rows={5}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between">
                            <button
                                type="submit"
                                className="flex items-center gap-2 justify-center bg-green text-white px-6 py-3 rounded-md font-medium transition duration-200 mb-4 sm:mb-0 cursor-pointer"
                            >
                                <Check size={20} />
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowConfirm(true)}
                                className="flex items-center  bg-red-600 text-white gap-2 justify-center px-6 py-3 rounded-md font-medium transition duration-200 cursor-pointer"
                            >
                                <Trash2 size={20} />
                                Delete Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                            <TriangleAlert className="text-red-600" />
                        </div>
                        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Delete Product</h2>
                        <p className="text-gray-600 text-center mb-6">Are you sure you want to delete {product.title}?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md font-medium transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2 bg-red-600  text-white rounded-md font-medium transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

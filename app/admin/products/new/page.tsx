"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronLeftIcon, PackagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProductPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
        brand: "",
        color: "",
        sizes: "",
        additionalImages: ["", "", ""],
        productDetails: {
            manufacturer: "",
            countryOfOrigin: "",
            importedBy: "",
            weight: "",
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleProductDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            productDetails: {
                ...prev.productDetails,
                [name]: value,
            },
        }));
    };

    const handleAdditionalImage = (index: number, value: string) => {
        const updateImages = [...form.additionalImages];
        updateImages[index] = value;
        setForm({ ...form, additionalImages: updateImages });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payLoad = {
            ...form,
            price: parseFloat(form.price),
            sizes: form.sizes
                .split(",")
                .map((size) => parseInt(size.trim(), 10))
                .filter((number) => !isNaN(number)),
        };

        const res = await fetch("http://localhost:4000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payLoad),
        });

        if (res.ok) {
            alert("Product added successfully");
            router.push("/admin/products");
        } else {
            alert("Failed to add product");
        }
    };

    return (
        <div className="p-8 min-h-screen">
            <Button variant="link" onClick={() => router.push("/admin/products")} className="gap-1 cursor-pointer ml-10">
                <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
                Go back
            </Button>
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title*</label>
                                    <input
                                        name="title"
                                        placeholder="Product name"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        placeholder="0.00"
                                        value={form.price}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <input
                                        name="category"
                                        placeholder="Men / Women"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                    <input
                                        name="brand"
                                        placeholder="Brand name"
                                        value={form.brand}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                    <input
                                        name="color"
                                        placeholder="Red, Green"
                                        value={form.color}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2  outline-none transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                                    <input
                                        name="sizes"
                                        placeholder="5,6,7"
                                        value={form.sizes}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2  outline-none transition duration-200"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="product description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold  mb-4 border-b border-gray-200 pb-2">
                                Product Images
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL*</label>
                                    <input
                                        name="image"
                                        placeholder="https://example.com/image.jpg"
                                        value={form.image}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                        required
                                    />
                                </div>
                                {form.additionalImages.map((img, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Additional Image {index + 1}
                                        </label>
                                        <input
                                            placeholder="https://example.com/image.jpg"
                                            value={img}
                                            onChange={(e) => handleAdditionalImage(index, e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Product Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                                    <input
                                        name="manufacturer"
                                        placeholder="Manufacturer name"
                                        value={form.productDetails.manufacturer}
                                        onChange={handleProductDetailChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country of Origin
                                    </label>
                                    <input
                                        name="countryOfOrigin"
                                        placeholder="India, China"
                                        value={form.productDetails.countryOfOrigin}
                                        onChange={handleProductDetailChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Imported By</label>
                                    <input
                                        name="importedBy"
                                        placeholder="Company name"
                                        value={form.productDetails.importedBy}
                                        onChange={handleProductDetailChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                                    <input
                                        name="weight"
                                        placeholder="250g, 1kg"
                                        value={form.productDetails.weight}
                                        onChange={handleProductDetailChange}
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-200"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6 mt-8">
                            <button
                                type="button"
                                onClick={() => router.push("/admin/products")}
                                className="px-6 py-3 bg-gray-200  text-gray-800 rounded-md font-medium transition duration-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-green gap-3 text-white rounded-md font-medium transition duration-200 flex items-center cursor-pointer"
                            >
                               <PackagePlus />
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

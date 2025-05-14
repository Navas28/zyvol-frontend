"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
            fetch(`http://localhost:4000/api/products/${productId}`)
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
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
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

        fetch(`http://localhost:4000/api/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Product updated successfully");
            })
            .catch((error) => {
                alert("Error updating product.");
            });
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/products/${productId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete product");
            alert("Product deleted successfully");
            router.push("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Error deleting product.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit product {productId}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={product.title}
                        onChange={(e) => handleInputChange(e, "title")}
                        className="border p-2"
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleInputChange(e, "price")}
                        className="border p-2"
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        value={product.description}
                        onChange={(e) => handleInputChange(e, "description")}
                        className="border p-2"
                    />
                </div>

                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={product.image}
                        onChange={(e) => handleInputChange(e, "image")}
                        className="border p-2"
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={product.category}
                        onChange={(e) => handleInputChange(e, "category")}
                        className="border p-2"
                    />
                </div>

                <div>
                    <label>Brand:</label>
                    <input
                        type="text"
                        value={product.brand}
                        onChange={(e) => handleInputChange(e, "brand")}
                        className="border p-2"
                    />
                </div>

                <div>
                    <label>Color:</label>
                    <input
                        type="text"
                        value={product.color}
                        onChange={(e) => handleInputChange(e, "color")}
                        className="border p-2"
                    />
                </div>
                <div>
                    <label>Sizes:</label>
                    <input
                        type="text"
                        value={sizeInput}
                        onChange={(e) => handleInputChange(e, "sizes")}
                        className="border p-2"
                    />
                </div>

                <button type="submit" className="bg-black text-white px-4 py-2 mt-4">
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-600 text-white px-4 py-2 mt-2 ml-4"
                >
                    Delete Product
                </button>
            </form>

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
                        <p className="mb-4">This will permanently delete the product.</p>
                        <div className="flex justify-end">
                            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 mr-2 border">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


import { Order, Product } from "@/typing";
import {  PackagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProductsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
        cache: "no-store",
    });
    const products = await res.json();

    const orderRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
        cache: "no-store",
    })
    const orders = await orderRes.json()

    return (
         <div className="p-4 md:p-8 min-h-screen">
            <div className="max-w-9xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Orders</h1>
                        <p className="text-gray-600 mt-1">Total orders: {orders.length}</p>
                    </div>
                </div>
                
                <div className="rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="">
                                <tr>
                                    <th className="px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Name</th>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Email</th>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Country</th>
                                    <th className="px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Status</th>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Intent ID</th>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Date</th>
                                    <th className="px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order: Order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-md">{order.customerDetails?.name || "—"}</td>
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-md">{order.customerDetails?.email || "—"}</td>
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-md">{order.customerDetails?.country || "—"}</td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-md leading-5 font-semibold rounded-full ${
                                                order.status === "paid" ? "text-green-600" : 
                                                order.status === "pending" ? " text-yellow-600" : 
                                                "text-gray-800"
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-md font-mono">{order.paymentIntentId}</td>
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-md">{new Date(order.createdAt).toLocaleString()}</td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-md font-medium">&#8377;{order.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 mt-10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h1>
                        <p className="text-gray-600 mt-1">Total products: {products.length}</p>
                    </div>
                    <Link href={"/admin/products/new"} className="mt-4 md:mt-0">
                        <button className="bg-green text-white px-4 py-2 md:px-5 md:py-3 rounded-md font-medium transition duration-200 flex items-center cursor-pointer hover:opacity-90">
                            <PackagePlus className="mr-2 h-5 w-5" />
                            Add Product
                        </button>
                    </Link>
                </div>
                
                <div className="rounded-lg shadow overflow-hidden mb-10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="">
                                <tr>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Image</th>
                                    <th className="px-4 md:px-6 py-4 text-left text-md font-medium uppercase tracking-wider">Name</th>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Price</th>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Category</th>
                                    <th className="hidden lg:table-cell px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Brand</th>
                                    <th className="px-4 md:px-6 py-4 text-left text-md md:text-xl font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product: Product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Image src={product.image} alt="product image" height={120} width={120} className="object-cover rounded-md border border-gray-200" />
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                            <div className="text-md font-medium">{product.title}</div>
                                        </td>
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap">
                                            <div className="text-md">&#8377;{product.price}</div>
                                        </td>
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-md leading-5 font-semibold rounded-full">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-md">
                                            {product.brand}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-md font-medium">
                                            <Link href={`/admin/products/${product._id}`} className="mr-4 transition duration-150">
                                                Edit
                                            </Link>
                                            <Link href={`/admin/products/${product._id}?mode=delete`} className="text-red-600 transition duration-150">
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

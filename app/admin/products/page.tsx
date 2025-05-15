
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { ChevronLeftIcon, PackagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminProductsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
        cache: "no-store",
    });
    const products = await res.json();

    const user = await currentUser()

    if(!user || user.publicMetadata.role !== "admin"){
        redirect("/")
    }

    return (
         <div className="p-8 min-h-screen">
            <div className="max-w-9xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                        <p className="text-gray-600 mt-1">Total products: {products.length}</p>
                    </div>
                    <Link href={"/admin/products/new"} className="mt-4 md:mt-0">
                        <button className="bg-green text-white px-5 py-3 rounded-md font-medium transition duration-200 flex items-center cursor-pointer">
                            <PackagePlus  className="mr-3"/>
                            Add Product
                        </button>
                    </Link>
                </div>
                <div className="rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="">
                            <tr>
                                <th className="px-6 py-4 text-left text-xl font-medium  uppercase tracking-wider">Image</th>
                                <th className="px-6 py-4 text-left text-md font-medium uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xl font-medium  uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xl font-medium  uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xl font-medium  uppercase tracking-wider">Brand</th>
                                <th className="px-6 py-4 text-left text-xl font-medium  uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product: any) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Image src={product.image} alt="product image" height={120} width={120} className="object-cover rounded-md border border-gray-200" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-md font-medium">{product.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-md">&#8377;{product.price}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-md leading-5 font-semibold rounded-full">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md ">
                                        {product.brand}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                                        <Link href={`/admin/products/${product._id}`} className="mr-4 transition duration-150">
                                            Edit
                                        </Link>
                                        <Link href={`/admin/products/${product._id}?mode=delete`} className="text-red-600 hover:text-red-900 transition duration-150">
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
             
                    {products.length === 0 && (
                        <div className="text-center py-10">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

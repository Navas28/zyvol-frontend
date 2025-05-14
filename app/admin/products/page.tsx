import Link from "next/link";

export default async function AdminProductsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
        cache: "no-store",
    });
    const products = await res.json();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Products</h1>
            <Link href={"/admin/products/new"}>
                <button className="bg-black text-white px-4 py-2">Add products</button>
            </Link>

            <p className="mb-4">Total products: {products.length}</p>

            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Brand</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any) => (
                        <tr key={product._id}>
                            <td className="px-4 py-2">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                            </td>
                            <td className="px-4 py-2">{product.title}</td>
                            <td className="px-4 py-2">&#8377;{product.price}</td>
                            <td className="px-4 py-2">{product.category}</td>
                            <td className="px-4 py-2">{product.brand}</td>
                            <td className="px-4 py-2">
                                <Link href={`/admin/products/${product._id}`} className="mr-2 text-green">
                                    Edit
                                </Link>
                                <Link href={`/admin/products/${product._id}?mode=delete`} className="text-red">
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

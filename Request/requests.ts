export async function getAllProducts() {
    const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return productRes.json();
}

export async function getSingleProduct(id: string) {
    const singleProductRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    return singleProductRes.json();
}

export async function getProductByCategory(category: string) {
    const productByCategoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/category/${category}`);
    return productByCategoryRes.json();
}

export const getFilteredProducts = async (category?: string, brand?: string) => {
    const params = new URLSearchParams();

    if (category && category !== "All") params.append("category", category);
    if (brand && brand !== "All") params.append("brand", brand);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
};

export const submitContactForm = async (formData: {
    name: string;
    email: string;
    message: string;
}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(formData)
    })

    if(!res.ok) throw new Error("Failed to submit contact form")
        return await res.json()
}
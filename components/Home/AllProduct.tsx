'use client';

import React, { useEffect, useState } from "react";
import { getFilteredProducts } from "../../Request/requests";
import { Product } from "../../typing";
import ProductCard from "./ProductCard";
import { Loader } from "lucide-react";

const categories = ["Men", "Women"];
const brands = ["All", "Nike", "Adidas", "Puma", "Reebok"];

const AllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getFilteredProducts(selectedCategory, selectedBrand);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand]);

  return (
    <div className="pt-16 pb-12">
      <h1 className="text-center font-bold text-2xl">All Products</h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-3 mt-8 mb-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded ${selectedBrand === brand ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Product Display */}
      {loading ? (
        <div className="flex justify-center mt-16">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center">No products found.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllProduct;

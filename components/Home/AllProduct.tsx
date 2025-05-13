'use client';

import React, { useEffect, useState } from "react";
import { getFilteredProducts } from "../../Request/requests";
import { Product } from "../../typing";
import ProductCard from "./ProductCard";
import { Loader, SlidersHorizontal, ShoppingBag } from "lucide-react";

const categories = ["Men", "Women"];
const brands = ["All", "Nike", "Adidas", "New Balance", "Jordan"];

const AllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

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
    <div id="sneakers" className="bg-white min-h-screen">
      <div className="sticky top-0 z-10">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              {selectedCategory}'s Collection
            </h2>
            
            <button 
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className={`transform transition-all duration-300 overflow-hidden ${
          filterMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 text-sm font-medium border transition-all ${
                      selectedCategory === category
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-800 border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Brand</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-5 py-2.5 text-sm font-medium border transition-all ${
                      selectedBrand === brand
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-800 border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <div className="mb-8">
          <div className="flex items-center">
            <span className="inline-block h-1 w-12 bg-black mr-4"></span>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "Men" ? "Men's" : "Women's"} 
              {selectedBrand !== "All" ? ` ${selectedBrand}` : ""} Collection
            </h1>
          </div>
          
          <div className="mt-2 text-sm text-gray-500">
            {loading ? (
              "Finding the perfect style for you..."
            ) : (
              `${products.length} products found`
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col  items-center justify-center py-32">
            <div className="animate-spin">
              <Loader className="h-10 w-10 text-gray-400" />
            </div>
            <p className="mt-4 text-sm text-gray-500">Loading collection...</p>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="flex flex-col  items-center justify-center py-16 px-4 border border-dashed border-gray-300 rounded-lg">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No products available</h3>
                <p className="mt-2 text-center text-gray-500 max-w-sm">
                  We don't have any {selectedCategory.toLowerCase()} products from 
                  {selectedBrand !== "All" ? ` ${selectedBrand}` : " these brands"} at the moment.
                </p>
                <div className="mt-6">
                  <button 
                    onClick={() => {
                      setSelectedBrand("All");
                      setSelectedCategory(selectedCategory === "Men" ? "Women" : "Men");
                    }}
                    className="px-5 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Browse {selectedCategory === "Men" ? "Women's" : "Men's"} Collection
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
                  {products.map((product) => (
                    <div key={product._id} className="group">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
// 'use client'

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setProducts } from "@/store/productSlice";
// import { getAllProductsByBrand } from "@/Request/requests";


// const BrandFilter = () => {
//     const dispatch = useDispatch();
//     const [activeBrand, setActiveBrand] = useState("All");
    
//     const brands = ["All", "Nike", "Adidas", "Puma", "New Balance", "Converse", "Reebok"];


//     const handleBrandClick = async (brand: string) => {
//       setActiveBrand(brand);
//       try {
//           const data = await getAllProductsByBrand(brand === "All" ? undefined : brand);
//           console.log("Fetched products:", data);
          
//           // If "All" is selected, show all products
//           if (brand === "All" || (Array.isArray(data) && data.length > 0)) {
//               dispatch(setProducts(data)); // Show the fetched products
//           } else {
//               // If no products found for the selected brand, fetch all products
//               const allData = await getAllProductsByBrand(); // Fetch all products
//               dispatch(setProducts(allData)); // Show all products
//           }
//       } catch (error) {
//           console.error("Error fetching brand products:", error);
//           dispatch(setProducts([])); // Fallback to empty if error occurs
//       }
//   };
//   return (
//     <div className="pt-16 pb-12">
//       <h1 className="text-center font-bold text-2xl capitalize">Shop by Brand</h1>
//       <div className="mt-12 w-4/5 mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
//         {brands.map((brand) => (
//           <div
//             key={brand}
//             onClick={() => handleBrandClick(brand)}
//             className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-300 
//               ${activeBrand === brand ? "bg-black text-white" : "bg-gray-200"} hover:scale-105 shadow-md`}
//           >
//             <h1 className="text-sm sm:text-base font-semibold">{brand}</h1>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BrandFilter;

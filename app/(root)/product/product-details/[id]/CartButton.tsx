// "use client";

// import { addItem, CartItem } from "@/store/cartSlice";
// import { Product } from "@/typing";
// import { ShoppingCart } from "lucide-react";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";

// const CartButton = ({ product }: { product: Product }) => {
//     const dispatch = useDispatch();

//     const addCart = () => {
//         toast.success(`"${product.title}" Added to Cart`, {
//             description: "Its now availiable in your shopping cart.",
//             icon: <ShoppingCart className="text-emerald-500" size={18} />,
//             className: "bg-white border border-emerald-500 text-emerald-700",
//             duration: 3000,
//         });
//         dispatch(addItem(product));
//     };

//     return (
//         <button
//             onClick={() => {
//                 addCart();
//             }}
//             className="mt-6 bg-black text-white px-3 py-2 rounded-md"
//         >
//             Add to Cart
//         </button>
//     );
// };

// export default CartButton;

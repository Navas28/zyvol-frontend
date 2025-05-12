import { addItem, CartItem, removeItem } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";
import { Minus, Plus, ShoppingBag } from "lucide-react";

type Props = {
    items: CartItem[];
};

const CartSidebar = ({ items }: Props) => {
    const dispatch = useDispatch();

    const addCart = (item: CartItem) => dispatch(addItem(item));
    const removeCart = (id: string, size: number) => {
        dispatch(removeItem({ id, size }));
    };

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col h-full">
            {items.length === 0 ? (
                <div className="flex items-center flex-col justify-center flex-grow py-10">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
                        <ShoppingBag size={64} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            Your Cart ({items.length})
                        </h2>
                    </div>
                    
                    <div className="flex-grow overflow-auto py-2 px-4">
                        {items.map((item) => (
                            <div 
                                key={`${item.id}-${item.size}`} 
                                className="flex gap-3 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                            >
                                <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                
                                <div className="flex-grow">
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm line-clamp-2">
                                        {item.title}
                                    </h3>
                                    
                                    <div className="flex items-center mt-2 gap-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Size: 
                                        </span>
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                                            {item.size}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                                            <button 
                                                onClick={() => removeCart(item.id, item.size)} 
                                                className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="px-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {item.quantity}
                                            </span>
                                            <button 
                                                onClick={() => addCart(item)} 
                                                className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-700 mt-auto px-4 py-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">${totalAmount.toFixed(2)}</span>
                            </div>
                            
                            <Link href="/cart" className="block">
                                <SheetClose className="w-full bg-gray-900 hover:bg-black text-white font-medium rounded-md py-3 text-center transition-colors">
                                    View Cart & Checkout
                                </SheetClose>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
import { removeFavorite } from '@/store/favoritesSlice';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { SheetClose } from '../ui/sheet';
import Image from 'next/image';
import { Product } from '@/typing';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

type Props = {
    items: Product[];
}

const FavoriteSidebar = ({items} : Props) => {
  const dispatch = useDispatch()

  const removeFromFavorite = (id: string) => {
    dispatch(removeFavorite(id))
  }

  return (
    <div className="flex flex-col h-full">
      {items.length === 0 ? (
        <div className="flex items-center flex-col justify-center flex-grow py-10">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
            <Heart size={64} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No Favorites Yet</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
            Items you save to your favorites will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Your Favorites ({items.length})
            </h2>
          </div>
          
          <div className="flex-grow overflow-auto py-2 px-4">
            {items.map((item) => (
              <div 
                key={item._id}
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
                  <Link href={`/product/product-details/${item._id}`}>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  
                  <div className="flex flex-col  mt-1 gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.brand}
                    </span>
                    {item.color && (
                      <>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {item.color}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      &#8377;{item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => removeFromFavorite(item._id)}
                        className="flex items-center justify-center p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-auto px-4 py-4 space-y-4">
            <Link href="/cart" className="block w-full">
              <SheetClose className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-medium rounded-md py-3 text-center transition-colors">
                <ShoppingCart size={18} />
                Go to Cart
              </SheetClose>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default FavoriteSidebar;
import { FavoriteItem, removeFavorite } from '@/store/favoritesSlice';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { SheetClose } from '../ui/sheet';
import Image from 'next/image';
import { Product } from '@/typing';

type Props = {
    items: Product[];
}

const FavoriteSidebar = ({items} : Props) => {
  const dispatch = useDispatch()

  const removeFromFavorite = (id: string) => {
    dispatch(removeFavorite(id))
  }

  return (
    <div className="mt-6 h-full mb-6">
    {items.length === 0 && (
      <div className="flex items-center w-full h-[80vh] flex-col justify-center">
        <Image
          src="/image/logo.png"
          alt="empty favorite"
          width={200}
          height={200}
          className="object-cover mx-auto"
        />
        <h1 className="mt-8 text-2xl font-semibold">No Favorites Yet</h1>
      </div>
    )}

    {items.length > 0 && (
      <div>
        {items.map((item) => (
          <div
            key={item._id}
            className="pb-4 border-b-2 border-gray-300 border-opacity-60 p-4"
          >
            <div>
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="object-cover mb-4"
              />
            </div>
            <div>
              <h1 className="text-sm w-4/5 font-semibold truncate">
                {item.title}
              </h1>
              <h1 className="text-base text-blue-950 font-bold">
                ${item.price.toFixed(2)}
              </h1>
              <button
                onClick={() => removeFromFavorite(item._id)}
                className="mt-2 bg-black text-white px-3 py-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <Link href="/cart">
          <SheetClose className="w-full mb-6 mt-6 bg-black text-white text-center px-4 py-2">
             Checkout Cart
          </SheetClose>
        </Link>
      </div>
    )}
  </div>
  )
}

export default FavoriteSidebar
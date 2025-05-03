"use client"

import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Heart } from 'lucide-react'
import FavoriteSidebar from './FavoriteSidebar'

const FavoriteButton = () => {
    const favoriteItems = useSelector((state: RootState) => state.favorites.items);
    const totalFavorites = favoriteItems.length;

  return (
    <Sheet>
        <SheetTrigger>
            <div className='relative'>
                {totalFavorites > 0 && (
                    <span className='absolute -top-3 -right-2 w-6 h-6  text-center flex items-center justify-center text-white bg-red-500 rounded-full text-sm'>
                        {totalFavorites}
                    </span>
                )}
                <Heart size={26} className='cursor-pointer'/>
            </div>
        </SheetTrigger>
        <SheetContent className="overflow-auto h-full" side="left">
                <SheetTitle className="text-center font-bold text-lg mt-10">Your Favorites</SheetTitle>
                <FavoriteSidebar items={favoriteItems} />
            </SheetContent>
    </Sheet>
  )
}

export default FavoriteButton
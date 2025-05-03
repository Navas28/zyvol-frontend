'use client'

import { clearCart } from '@/store/cartSlice'
import { clearFavorites } from '@/store/favoritesSlice'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const AuthSync = () => {
    const {isLoaded, isSignedIn} = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isLoaded && !isSignedIn){
            dispatch(clearCart());
            dispatch(clearFavorites())
        }
    }, [isLoaded, isSignedIn, dispatch])

  return null;
}

export default AuthSync
'use client'

import { clearCart } from '@/store/cartSlice'
import { clearFavorites } from '@/store/favoritesSlice'
import { setProducts } from '@/store/productSlice'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
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

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
              const data = await res.json(); 
              dispatch(setProducts(data));
          } catch (error) {
              console.error("Failed to load products:", error);
          }
      };
      fetchProducts();
  }, [dispatch]);
    
  return null;
}

export default AuthSync
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import favoritesReducer from './favoritesSlice'
import productReducer from "./productSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites:  favoritesReducer,
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;

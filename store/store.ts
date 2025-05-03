import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import favoritesReducer from './favoritesSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites:  favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;

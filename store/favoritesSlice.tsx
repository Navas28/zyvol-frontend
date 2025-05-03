import { Product } from "@/typing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteItem {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

interface FavoritesState {
    items: Product[];
}

const initialState: FavoritesState = {
    items: [],
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                (item) => item._id === action.payload._id
             )
             if(!existingItem){
                state.items.push(action.payload)
             }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        clearFavorites: (state) => {
            state.items = [];
        },
    },
})

export const {addFavorite, removeFavorite, clearFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;


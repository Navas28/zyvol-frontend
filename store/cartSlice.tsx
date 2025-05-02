import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CartItem {
    id: string;
    title: string;
    price: number;
    category: string;
    image: string;
    quantity: number;
    size: number;
}
interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id && item.size === action.payload.size);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action: PayloadAction<{ id: string; size: number }>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload.id || item.size !== action.payload.size
                    );
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
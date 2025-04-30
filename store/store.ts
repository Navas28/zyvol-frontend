import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        // cart: cartReducer,
    },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

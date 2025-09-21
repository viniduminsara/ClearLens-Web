import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice.ts";
import cartSlice from "./features/cart/cartSlice.ts";
import filterSlice from "./features/filter/filterSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        filter: filterSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

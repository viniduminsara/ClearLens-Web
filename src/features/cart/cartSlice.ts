import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "../../interfaces/cart.ts";
import {addCartItem, deleteCartItem} from "./cartThunks.ts";
import {CartState} from "./cartTypes.ts";
import {fetchUserDetails} from "../auth/authThunks.ts";
import {UserObject} from "../../interfaces/user.ts";
import {login, logout} from "../auth/authSlice.ts";

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload;
        },
        updateQty: (state, action: PayloadAction<{ productId: string; qty: number }>) => {
            state.cartItems = state.cartItems.map((item) =>
                item.product._id === action.payload.productId
                    ? { ...item, qty: action.payload.qty }
                    : item
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.cartItems = action.payload.cart.map((p) => ({ product: p, qty: 1 }));
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cartItems = action.payload.cart.map((p) => ({ product: p, qty: 1 }));
            })
            .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserObject>) => {
                state.cartItems = action.payload.cart.map((p) => ({ product: p, qty: 1 }));
            })
            .addCase(login, (state, action) => {
                state.cartItems = action.payload.user.cart.map((p) => ({ product: p, qty: 1 }));
            })
            .addCase(logout, (state) => {
                state.cartItems = [];
            })
    },
});

export const { setCart, updateQty } = cartSlice.actions;
export default cartSlice.reducer;

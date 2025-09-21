import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./authTypes.ts";
import {UserObject} from "../../interfaces/user.ts";
import {addWishlistItem, deleteWishlistItem, fetchUserDetails} from "./authThunks.ts";
import {addCartItem, deleteCartItem} from "../cart/cartThunks.ts";


const initialState: AuthState = {
    user: null,
    token: "",
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: UserObject; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("accessToken", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = "";
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
        },
        updateUser: (state, action: PayloadAction<UserObject>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.token = localStorage.getItem("accessToken") || "";
            })
            .addCase(addWishlistItem.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(deleteWishlistItem.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

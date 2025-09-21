import {createAsyncThunk} from "@reduxjs/toolkit";
import {addWishlistItemService, deleteWishlistItemService, userDetailsService} from "../../services/apiServices.ts";
import {UserObject} from "../../interfaces/user.ts";


export const fetchUserDetails = createAsyncThunk<UserObject, void, { rejectValue: string }>(
    "auth/fetchUserDetails",
    async (_, { rejectWithValue }) => {
        const res = await userDetailsService();
        if (res.success) return res.body as UserObject;
        return rejectWithValue(res.message as string);
    }
);

export const addWishlistItem = createAsyncThunk<UserObject, string, { rejectValue: string }>(
    "auth/addWishlistItem",
    async (productId, { rejectWithValue }) => {
        const res = await addWishlistItemService(productId);
        if (res.success) return res.body as UserObject;
        return rejectWithValue(res.message as string);
    }
);

export const deleteWishlistItem = createAsyncThunk<UserObject, string, { rejectValue: string }>(
    "auth/deleteWishlistItem",
    async (productId, { rejectWithValue }) => {
        const res = await deleteWishlistItemService(productId);
        if (res.success) return res.body as UserObject;
        return rejectWithValue(res.message as string);
    }
);

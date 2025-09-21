import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserObject} from "../../interfaces/user.ts";
import {addCartItemService, deleteCartItemService} from "../../services/apiServices.ts";

export const addCartItem = createAsyncThunk<UserObject, string, { rejectValue: string }>(
    "cart/addCartItem",
    async (productId, { rejectWithValue }) => {
        const res = await addCartItemService(productId);
        if (res.success) return res.body as UserObject;
        return rejectWithValue(res.message as string);
    }
);

export const deleteCartItem = createAsyncThunk<UserObject, string, { rejectValue: string }>(
    "cart/deleteCartItem",
    async (productId, { rejectWithValue }) => {
        const res = await deleteCartItemService(productId);
        if (res.success) return res.body as UserObject;
        return rejectWithValue(res.message as string);
    }
);

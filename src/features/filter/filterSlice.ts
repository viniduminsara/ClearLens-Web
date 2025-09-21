import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterObject} from "../../interfaces/api.ts";

const initialState: FilterObject = {
    sort: "ASC",
    gender: "All",
    categories: [],
    minPrice: 0,
    maxPrice: 0,
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<FilterObject>>) => {
            return { ...state, ...action.payload };
        }
    }
})

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;

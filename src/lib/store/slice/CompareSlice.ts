"use client";
import { Product } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";
const getInitialCompare = () => {
    if (typeof window !== "undefined") {
        // Match the key you use in your hook (compareList not compare)
        const storedCompare = localStorage.getItem("compareList");
        return storedCompare ? JSON.parse(storedCompare) : [];
    }
    return [];
};

const initialState = {
    compareItems: getInitialCompare() as Product[],
};
const compareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        addToCompare: (state, action) => {
            state.compareItems.push(action.payload);
        },
        removeFromCompare: (state, action) => {
            state.compareItems = state.compareItems.filter(
                (item) => item.id !== action.payload
            );
        },
        setCompareItems: (state, action) => {
            state.compareItems = action.payload;
        },
    },
});
export default compareSlice.reducer;
export const { addToCompare, removeFromCompare, setCompareItems } =
    compareSlice.actions;

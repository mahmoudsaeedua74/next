import { Product } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
    if (typeof window !== "undefined") {
        const storedWishlist = localStorage.getItem("wishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
};

const initialState = {
    wishlistItems: getInitialWishlist() as Product[],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.wishlistItems.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((item) =>
                item.title === action.payload.title ? false : true
            );
        },
        setWishlistItems: (state, action) => {
            state.wishlistItems = action.payload;
        },
    },
});

export default wishlistSlice.reducer;
export const { addToWishlist, removeFromWishlist, setWishlistItems } =
    wishlistSlice.actions;

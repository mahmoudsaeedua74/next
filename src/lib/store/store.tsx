import { configureStore } from "@reduxjs/toolkit";
import compareSlice from "./slice/CompareSlice";
import gridSlice from "./slice/gridSlice";
import wishlistSlice from "./slice/WishlistSlice";
export const store = configureStore({
    reducer: { compareSlice, gridSlice, wishlistSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { useDispatch, useSelector } from "react-redux";
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

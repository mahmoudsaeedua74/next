import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface GridState {
    layout: "grid" | "list";
}
const initialState: GridState = {
    layout: "grid",
};
const gridSlice = createSlice({
    name: "grid",
    initialState,
    reducers: {
        setLayout(state, action: PayloadAction<"grid" | "list">) {
            state.layout = action.payload;
        },
        toggleLayout(state) {
            state.layout = state.layout === "grid" ? "list" : "grid";
        },
    },
});
export const { setLayout, toggleLayout } = gridSlice.actions;
export default gridSlice.reducer;

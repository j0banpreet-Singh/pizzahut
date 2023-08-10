import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    products: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity = state.quantity + 1;
      state.products.push(action.payload);
      state.total =
        state.total + action.payload.price * action.payload.quantity;
    },
    reset: (state, action) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, reset } = cartSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products.data = action.payload;
    },
    getAllProducts: (state, action) => {
      state.products.data = action.payload;
    },
    getSortProducts: (state, action) => {
      state.products.data = action.payload;
    },
    getSearchProducts: (state, action) => {
      state.products.data = action.payload;
    },
  },
});

export const {
  getProducts,
  getAllProducts,
  getSortProducts,
  getSearchProducts,
} = ProductSlice.actions;

export default ProductSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {
    data: null,
    allData: null,
    isLoading: false,
    errors: "",
  },
  actionRes: ""
};

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products.data = action.payload;
    },
    getAllProducts: (state, action) => {
      state.products.allData = action.payload;
    },
    getSortProducts: (state, action) => {
      state.products.data = action.payload;
    },
    getSearchProducts: (state, action) => {
      state.products.data = action.payload;
    },
    getActionRes: (state, action) => {
      state.actionRes = action.payload;
    },
  },
});

export const {
  getProducts,
  getAllProducts,
  getSortProducts,
  getSearchProducts,
  getActionRes
} = ProductSlice.actions;

export default ProductSlice.reducer;

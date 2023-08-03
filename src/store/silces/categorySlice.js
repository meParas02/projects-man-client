import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const categorieSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories.data = action.payload;
    },
    getAllCategories: (state, action) => {
      state.categories.data = action.payload;
    },
    getSortCategories: (state, action) => {
      state.categories.data = action.payload;
    },
    getSearchCategories: (state, action) => {
      state.categories.data = action.payload;
    },
  },
});

export const {
  getCategories,
  getAllCategories,
  getSortCategories,
  getSearchCategories,
} = categorieSlice.actions;

export default categorieSlice.reducer;

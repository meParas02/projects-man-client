import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {
    data: null,
    isLoading: false,
    errors: "",
  },
  actionRes: ""
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
    getActionRes: (state, action) => {
      state.actionRes = action.payload;
    },
  },
});

export const {
  getCategories,
  getAllCategories,
  getSortCategories,
  getSearchCategories,
  getActionRes
} = categorieSlice.actions;

export default categorieSlice.reducer;

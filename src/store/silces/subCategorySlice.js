import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategories: {
    data: null,
    isLoading: false,
    errors: "",
  },
  subCateByCate: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const subCategorieSlice = createSlice({
  name: "subCategories",
  initialState: initialState,
  reducers: {
    getSubCategories: (state, action) => {
      state.subCategories.data = action.payload;
    },
    getAllSubCategories: (state, action) => {
      state.subCategories.data = action.payload;
    },
    getSortSubCategories: (state, action) => {
      state.subCategories.data = action.payload;
    },
    getSubCateByCate: (state, action) => {
      state.subCateByCate.data = action.payload;
    },
    getSearchSubCategories: (state, action) => {
      state.subCategories.data = action.payload;
    },
  },
});

export const {
  getSubCategories,
  getAllSubCategories,
  getSortSubCategories,
  getSubCateByCate,
  getSearchSubCategories,
} = subCategorieSlice.actions;

export default subCategorieSlice.reducer;

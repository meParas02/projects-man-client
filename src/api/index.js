import axios from "axios";

const headers = {
  "Content-Type": "text/json",
};

export const loginApi = async (payload) => {
  return await axios.post(`http://localhost:3000/loginJwt`, payload, headers);
};

export const resistrationApi = async (payload) => {
  return await axios.post(`http://localhost:3000/resisterUser`, payload, headers);
};

export const getAllProductsApi = async () => {
  return await axios.get(`http://localhost:3000/getProducts`, headers);
};

export const getProductsApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/getProducts?page=${payload}&limit=5`, headers);
};

export const getAllCategoriesApi = async () => {
  return await axios.get(`http://localhost:3000/api/getCategories`, headers);
};

export const getCategoriesApi = async (action) => {
  return await axios.get(`http://localhost:3000/api/getCategories?page=${action.payload}&limit=5`, headers);
};

export const getAllSubCategoriesApi = async () => {
  return await axios.get(`http://localhost:3000/getSubCategories`, headers);
};

export const getSubCategoriesApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/getSubCategories?page=${payload}&limit=5`, headers);
};

export const getSubCateByCateApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/getSubCategories?categoryId=${payload}`, headers);
};

export const sortProductsApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/sortProduct?sort=${payload.sortColumn}&orderBy=asc&page=${payload.pageNum}&limit=5`, headers);
};

export const sortCategoriesApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/api/sortCategory?sort=${payload.sortColumn}&orderBy=asc&page=${payload.pageNum}&limit=5`, headers);
};

export const sortSubCategoriesApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/sortSubCategory?sort=${payload.sortColumn}&orderBy=asc&page=${payload.pageNum}&limit=5`, headers);
};

export const deleteProductsApi = async ({ payload }) => {
  return await axios.delete(`http://localhost:3000/deleteProduct/${payload}`, headers);
};

export const deleteCategoriesApi = async ({ payload }) => {
  return await axios.delete(`http://localhost:3000/api/deleteCategory/${payload}`, headers);
};

export const deleteSubCategoriesApi = async ({ payload }) => {
  return await axios.delete(`http://localhost:3000/deleteSubCategory/${payload}`, headers);
};

export const createProductApi = async (payload) => {
  return await axios.post(`http://localhost:3000/createProduct`, payload, headers);
};

export const createCategoryApi = async (payload) => {
  return await axios.post(`http://localhost:3000/api/createCategory`, payload, headers);
};

export const createSubCategoryApi = async (payload) => {
  return await axios.post(`http://localhost:3000/createSubCategory`, payload, headers);
};

export const updateProductApi = async ({ payload }) => {
  return await axios.put(`http://localhost:3000/updateProduct/${payload._id}`, payload, headers);
};

export const updateCategoryApi = async ({ payload }) => {
  return await axios.put(`http://localhost:3000/api/updateCategory/${payload._id}`, payload, headers);
};

export const updateSubCategoryApi = async ({ payload }) => {
  return await axios.put(`http://localhost:3000/updateSubCategory/${payload._id}`, payload, headers);
};

export const uploadProductImgApi = async ({ payload }) => {
  return await axios.post(`http://localhost:3000/uploads`, payload, { "Content-Type": "multipart/form-data" });
};

export const productSearchApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/searchProduct/${payload}`, headers);
};

export const categorySearchApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/api/searchCategory/${payload}`, headers);
};

export const subCategorySearchApi = async ({ payload }) => {
  return await axios.get(`http://localhost:3000/searchSubCategory/${payload}`, headers);
};
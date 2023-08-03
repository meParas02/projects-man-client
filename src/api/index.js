import axios from "axios";

const headers = {
  "Content-Type": "text/json",
};

export const loginApi = async (payload) => {
  return await axios.post(`${REACT_APP_API}/loginJwt`, payload, headers);
};

export const resistrationApi = async (payload) => {
  return await axios.post(`${REACT_APP_API}/resisterUser`, payload, headers);
};

export const getAllProductsApi = async () => {
  return await axios.get(`${REACT_APP_API}/getProducts`, headers);
};

export const getProductsApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/getProducts?page=${payload}&limit=5`, headers);
};

export const getAllCategoriesApi = async () => {
  return await axios.get(`${REACT_APP_API}/api/getCategories`, headers);
};

export const getCategoriesApi = async (action) => {
  return await axios.get(`${REACT_APP_API}/api/getCategories?page=${action.payload}&limit=5`, headers);
};

export const getAllSubCategoriesApi = async () => {
  return await axios.get(`${REACT_APP_API}/getSubCategories`, headers);
};

export const getSubCategoriesApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/getSubCategories?page=${payload}&limit=5`, headers);
};

export const getSubCateByCateApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/getSubCategories?categoryId=${payload}`, headers);
};

export const sortProductsApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/sortProduct?sort=${payload.sortColumn}&orderBy=asc&page=${payload.pageNum}&limit=5`, headers);
};

export const sortCategoriesApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/api/sortCategory?sort=${payload.sortColumn}&orderBy=asc&page=${payload.pageNum}&limit=5`, headers);
};

export const sortSubCategoriesApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/sortSubCategory?sort=${payload.sortColumn}&orderBy=asc&page=${payload.pageNum}&limit=5`, headers);
};

export const deleteProductsApi = async ({ payload }) => {
  return await axios.delete(`${REACT_APP_API}/deleteProduct/${payload}`, headers);
};

export const deleteCategoriesApi = async ({ payload }) => {
  return await axios.delete(`${REACT_APP_API}/api/deleteCategory/${payload}`, headers);
};

export const deleteSubCategoriesApi = async ({ payload }) => {
  return await axios.delete(`${REACT_APP_API}/deleteSubCategory/${payload}`, headers);
};

export const createProductApi = async (payload) => {
  return await axios.post(`${REACT_APP_API}/createProduct`, payload, headers);
};

export const createCategoryApi = async (payload) => {
  return await axios.post(`${REACT_APP_API}/api/createCategory`, payload, headers);
};

export const createSubCategoryApi = async (payload) => {
  return await axios.post(`${REACT_APP_API}/createSubCategory`, payload, headers);
};

export const updateProductApi = async ({ payload }) => {
  return await axios.put(`${REACT_APP_API}/updateProduct/${payload._id}`, payload, headers);
};

export const updateCategoryApi = async ({ payload }) => {
  return await axios.put(`${REACT_APP_API}/api/updateCategory/${payload._id}`, payload, headers);
};

export const updateSubCategoryApi = async ({ payload }) => {
  return await axios.put(`${REACT_APP_API}/updateSubCategory/${payload._id}`, payload, headers);
};

export const uploadProductImgApi = async ({ payload }) => {
  return await axios.post(`${REACT_APP_API}/uploads`, payload, { "Content-Type": "multipart/form-data" });
};

export const productSearchApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/searchProduct/${payload}`, headers);
};

export const categorySearchApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/api/searchCategory/${payload}`, headers);
};

export const subCategorySearchApi = async ({ payload }) => {
  return await axios.get(`${REACT_APP_API}/searchSubCategory/${payload}`, headers);
};
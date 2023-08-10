import { put, takeEvery } from "redux-saga/effects";
import {
  createProductApi,
  deleteProductsApi,
  getAllProductsApi,
  getProductsApi,
  productSearchApi,
  sortProductsApi,
  updateProductApi,
  uploadProductImgApi,
} from "../../api";
import {
  getActionRes,
  getAllProducts,
  getProducts,
  getSearchProducts,
  getSortProducts,
} from "../silces/productSlice";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS,
  PRODUCT_IMAGE,
  SEARCH_PRODUCT,
  SORT_PRODUCTS,
  UPDATE_PRODUCT,
} from "../types/type";
import { toast } from "react-toastify";

export function* handleProducts(action) {
  try {
    const { data } = yield getProductsApi(action);
    yield put(getProducts(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleAllProducts(action) {
  try {
    const { data } = yield getAllProductsApi(action);
    yield put(getAllProducts(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleCreateProducts(action) {
  try {
    const { data } = yield createProductApi(action.payload);
    yield put(getActionRes(data.message));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleUpdateProducts(action) {
  try {
    const { data } = yield updateProductApi(action);
    yield put(getActionRes(data.message));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleDeleteProducts(action) {
  try {
    const { data } = yield deleteProductsApi(action);
    yield put(getActionRes(data.message));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleSortProducts(action) {
  try {
    const { data } = yield sortProductsApi(action);
    yield put(getSortProducts(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleProductImage(action) {
  try {
    yield uploadProductImgApi(action);
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleSearchProduct(action) {
  try {
    const { data } = yield productSearchApi(action);
    yield put(getSearchProducts(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* watchProductSaga() {
  yield takeEvery(GET_PRODUCTS, handleProducts);
  yield takeEvery(GET_ALL_PRODUCTS, handleAllProducts);
  yield takeEvery(CREATE_PRODUCT, handleCreateProducts);
  yield takeEvery(UPDATE_PRODUCT, handleUpdateProducts);
  yield takeEvery(DELETE_PRODUCTS, handleDeleteProducts);
  yield takeEvery(SORT_PRODUCTS, handleSortProducts);
  yield takeEvery(PRODUCT_IMAGE, handleProductImage);
  yield takeEvery(SEARCH_PRODUCT, handleSearchProduct);
}

export default watchProductSaga;

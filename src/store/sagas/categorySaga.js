import { put, takeEvery } from "redux-saga/effects";
import {
  categorySearchApi,
  createCategoryApi,
  deleteCategoriesApi,
  getAllCategoriesApi,
  getCategoriesApi,
  sortCategoriesApi,
  updateCategoryApi,
} from "../../api";
import {
  getAllCategories,
  getCategories,
  getSearchCategories,
  getSortCategories,
} from "../silces/categorySlice";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORIES,
  GET_ALL_CATEGORIES,
  GET_CATEGORIES,
  SEARCH_CATEGORY,
  SORT_CATEGORIES,
  UPDATE_CATEGORY,
} from "../types/type";
import { toast } from "react-toastify";

export function* handleCategories(action) {
  try {
    const { data } = yield getCategoriesApi(action);
    yield put(getCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleAllCategories(action) {
  try {
    const { data } = yield getAllCategoriesApi(action);
    yield put(getAllCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleCreateCategories(action) {
  try {
    yield createCategoryApi(action.payload);
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleUpdateCategorys(action) {
  try {
    yield updateCategoryApi(action);
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleDeleteCategories(action) {
  try {
    yield deleteCategoriesApi(action);
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleSortCategories(action) {
  try {
    const { data } = yield sortCategoriesApi(action);
    yield put(getSortCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleSearchCategory(action) {
  try {
    const { data } = yield categorySearchApi(action);
    yield put(getSearchCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* watchCategorySaga() {
  yield takeEvery(GET_CATEGORIES, handleCategories);
  yield takeEvery(GET_ALL_CATEGORIES, handleAllCategories);
  yield takeEvery(CREATE_CATEGORY, handleCreateCategories);
  yield takeEvery(UPDATE_CATEGORY, handleUpdateCategorys);
  yield takeEvery(DELETE_CATEGORIES, handleDeleteCategories);
  yield takeEvery(SORT_CATEGORIES, handleSortCategories);
  yield takeEvery(SEARCH_CATEGORY, handleSearchCategory);
}

export default watchCategorySaga;

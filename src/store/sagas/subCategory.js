import { put, takeEvery } from "redux-saga/effects";
import {
  createSubCategoryApi,
  deleteSubCategoriesApi,
  getAllSubCategoriesApi,
  getSubCateByCateApi,
  getSubCategoriesApi,
  sortSubCategoriesApi,
  subCategorySearchApi,
  updateSubCategoryApi,
} from "../../api";
import {
  getAllSubCategories,
  getSearchSubCategories,
  getSortSubCategories,
  getSubCateByCate,
  getSubCategories,
} from "../silces/subCategorySlice";
import {
  CREATE_SUB_CATEGORY,
  DELETE_SUB_CATEGORIES,
  GET_ALL_SUB_CATEGORIES,
  GET_SUB_CATEGORIES,
  SEARCH_SUB_CATEGORY,
  SORT_SUB_CATEGORIES,
  SUB_CATE_BY_CATE,
  UPDATE_SUB_CATEGORY,
} from "../types/type";
import { toast } from "react-toastify";
import { getActionRes } from "../silces/productSlice";

export function* handleSubCategory(action) {
  try {
    const { data } = yield getSubCategoriesApi(action);
    yield put(getSubCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleAllSubCategories(action) {
  try {
    const { data } = yield getAllSubCategoriesApi(action);
    yield put(getAllSubCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleCreateSubCategories(action) {
  try {
    const { data } = yield createSubCategoryApi(action.payload);
    yield put(getActionRes(data.message));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleUpdateSubCategories(action) {
  try {
    const { data } = yield updateSubCategoryApi(action);
    yield put(getActionRes(data.message));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleDeleteSubCategories(action) {
  try {
    const { data } = yield deleteSubCategoriesApi(action);
    yield put(getActionRes(data.message));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleSortSubCategories(action) {
  try {
    const { data } = yield sortSubCategoriesApi(action);
    yield put(getSortSubCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleSubCateByCate(action) {
  try {
    const { data } = yield getSubCateByCateApi(action);
    yield put(getSubCateByCate(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

export function* handleSearchSubCategory(action) {
  try {
    const { data } = yield subCategorySearchApi(action);
    yield put(getSearchSubCategories(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* watchSubCategorySaga() {
  yield takeEvery(GET_SUB_CATEGORIES, handleSubCategory);
  yield takeEvery(GET_ALL_SUB_CATEGORIES, handleAllSubCategories);
  yield takeEvery(CREATE_SUB_CATEGORY, handleCreateSubCategories);
  yield takeEvery(UPDATE_SUB_CATEGORY, handleUpdateSubCategories);
  yield takeEvery(DELETE_SUB_CATEGORIES, handleDeleteSubCategories);
  yield takeEvery(SORT_SUB_CATEGORIES, handleSortSubCategories);
  yield takeEvery(SUB_CATE_BY_CATE, handleSubCateByCate);
  yield takeEvery(SEARCH_SUB_CATEGORY, handleSearchSubCategory);
}

export default watchSubCategorySaga;

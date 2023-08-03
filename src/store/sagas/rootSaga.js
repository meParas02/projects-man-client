import { all } from "redux-saga/effects";
import watchLoginSaga from "../sagas/loginSaga";
import watchResistrationSaga from "../sagas/resistrationSaga";
import watchCategorySaga from "./categorySaga";
import watchProductSaga from "./productSaga";
import watchSubCategorySaga from "./subCategory";

function* watchAll() {
  yield all([
    watchLoginSaga(),
    watchResistrationSaga(),
    watchProductSaga(),
    watchCategorySaga(),
    watchSubCategorySaga()
  ]);
}

export default watchAll;

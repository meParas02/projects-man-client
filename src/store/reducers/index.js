import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../sagas/rootSaga";
import UserReducer from "../silces/userSlice";
import ProductReducer from "../silces/productSlice";
import CategoryReducer from "../silces/categorySlice";
import SubCategoryReducer from "../silces/subCategorySlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: UserReducer,
    productReducer: ProductReducer,
    categoryReducer: CategoryReducer,
    subCategoryReducer: SubCategoryReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

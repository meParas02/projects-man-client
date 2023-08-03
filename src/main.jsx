import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/reducers/index";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import RegistrationForm from "./pages/resister";
import ProductList from "./pages/product";
import NotFound from "./pages/404";
import CategoryList from "./pages/category";
import SubCategoryList from "./pages/subCategory";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/resister",
    element: <RegistrationForm />,
  },
  {
    path: "/productList",
    element: <ProductList />,
  },
  {
    path: "/categoryList",
    element: <CategoryList />,
  },
  {
    path: "/subCategoryList",
    element: <SubCategoryList />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

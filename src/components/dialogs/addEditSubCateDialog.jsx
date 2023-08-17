import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ToastCon from "../toastContainer";
import {
  CREATE_SUB_CATEGORY,
  GET_ALL_CATEGORIES,
  GET_SUB_CATEGORIES,
  UPDATE_SUB_CATEGORY,
} from "../../store/types/type";
import DialogContainer from "./dialogContainer";

const AddEditSubCateDialog = ({ editDialog, setEditDialog, handleAddEditClose, record }) => {
  const dispatch = useDispatch();
  const [actionFlag, setActionFlag] = useState(false)
  const [categoryList, setcategoryList] = useState({});
  const { actionRes } = useSelector((state) => state.subCategoryReducer);
  const { categories: mastercategoryData } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch({ type: GET_ALL_CATEGORIES, payload: {} });
    setTimeout(() => {
      inputRef.current.focus();
    }, 300);
  }, []);

  useEffect(() => {
    setcategoryList(mastercategoryData);
  }, [mastercategoryData]);

  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required("Category is required"),
    subCategoryName: Yup.string().required("Subcategory is required"),
  });

  const { setFieldValue, handleChange, handleSubmit, touched, errors, values, resetForm } = useFormik({
    initialValues: {
      categoryId: "",
      subCategoryName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!record._id) {
        setActionFlag(true);
        setTimeout(() => {
        dispatch({
          type: CREATE_SUB_CATEGORY,
          payload: {
            categoryId: values.categoryId,
            subCategoryName: values.subCategoryName,
          },
        });
        setEditDialog(false);
        toast(actionRes);
        setActionFlag(false);
        dispatch({ type: GET_SUB_CATEGORIES, payload: {} });
      }, 2000)
      } else {
        setActionFlag(true);
        setTimeout(() => {
          let updateObj = {
            ...record,
            categoryId: values.categoryId,
            subCategoryName: values.subCategoryName,
          };
          dispatch({
            type: UPDATE_SUB_CATEGORY,
            payload: updateObj,
          });
          setEditDialog(false);
          toast(actionRes);
          setActionFlag(false);
          dispatch({ type: GET_SUB_CATEGORIES, payload: {} });
        }, 2000)
      }
    },
  });

  useEffect(() => {
    if(record) {
      setFieldValue('categoryId', record.categoryId)
      setFieldValue('subCategoryName', record.subCategoryName)
    }
  }, [])

  return (
    <div>
      <Dialog open={editDialog}>
        <DialogContent style={{ width: "500px" }}>
          <form onSubmit={handleSubmit}>
            <DialogContainer
              record={record._id}
              name={"Sub Category"}
              handleAddEditClose={handleAddEditClose}
              actionFlag={actionFlag}
            >
              <Grid container spacing={2} style={{ paddingTop: "10px" }}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.categoryId && Boolean(errors.categoryId)}>
                    <InputLabel id="categoryLabel">Category Name</InputLabel>
                    <Select
                      labelId="categoryLabel"
                      id="categoryId"
                      name="categoryId"
                      value={values.categoryId}
                      onChange={handleChange}
                      label="Category Name"
                      autoFocus
                    >
                      {categoryList.data?.allCategories.map((category, i) => (
                        <MenuItem key={i} value={category._id}>
                          {category.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.categoryId && (
                      <FormHelperText>
                        {errors.categoryId}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="subCategoryName"
                    name="subCategoryName"
                    label="Subcategory"
                    onChange={handleChange}
                    error={touched.subCategoryName && Boolean(errors.subCategoryName)}
                    helperText={touched.subCategoryName && errors.subCategoryName}
                    value={values.subCategoryName}
                  />
                </Grid>
              </Grid>
            </DialogContainer>
          </form>
        </DialogContent>
      </Dialog>
      <ToastCon />
    </div>
  );
};

export default AddEditSubCateDialog;

import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ToastCon from "../toastContainer";
import {
  CREATE_PRODUCT,
  PRODUCT_IMAGE,
  SUB_CATE_BY_CATE,
  UPDATE_PRODUCT,
} from "../../store/types/type";
import DialogContainer from "./dialogContainer";

const AddEditProDialog = ({ editDialog, setEditDialog, handleAddEditClose, categoryList, record }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [subCategory, setSubCategory] = useState({});
  const [actionFlag, setActionFlag] = useState(false);
  const [fileObj, setFileObj] = useState("");
  const { subCateByCate } = useSelector((state) => state.subCategoryReducer);

  const { setFieldValue, handleChange, handleSubmit, touched, errors, values, resetForm } = useFormik({
    initialValues: {
      productName: "",
      discription: "",
      price: "",
      category: "",
      subCategory: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('productImage', fileObj);

      if (!record._id) {
        setActionFlag(true);
        setTimeout(() => {
          dispatch({ type: PRODUCT_IMAGE, payload: formData });
          dispatch({
            type: CREATE_PRODUCT,
            payload: {
              productName: values.productName,
              discription: values.discription,
              price: values.price,
              productImage: fileObj,
              categoryId: values.category,
              subCategoryId: values.subCategory,
            },
          });
        setEditDialog(false);
        toast("Product is created successfully!");
        setActionFlag(false); 
      }, 2000)
      } else {
        setActionFlag(true);
        setTimeout(() => {
          let updateObj = {
            ...record,
            productName: values.productName,
            discription: values.discription,
            price: values.price,
            productImage: fileObj,
            categoryId: values.category,
            subCategoryId: values.subCategory,
          };
        dispatch({ type: PRODUCT_IMAGE, payload: formData });
        dispatch({ type: UPDATE_PRODUCT, payload: updateObj });
        setEditDialog(false);
        toast("Product is updated successfully!");
        setActionFlag(false);
    }, 2000)
      }
    },
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      productName: Yup.string().required("Product Name is required"),
      discription: Yup.string().required("discription is required"),
      price: Yup.number().required("Price is required").positive("Price must be a positive number"),
      category: Yup.string().required("Category is required"),
      subCategory: Yup.string().required("Subcategory is required"),
    }),
  });

  useEffect(() => {
    setSubCategory(subCateByCate);
  }, [subCateByCate]);

  const handleCateChange = (e) => {
    const id = e.target.value;
    dispatch({ type: SUB_CATE_BY_CATE, payload: id });
    handleChange(e);
  };

  useEffect(() => {
    if(Object.keys(record).length) {
      setFieldValue('productName', record.productName);
      setFieldValue('discription', record.discription);
      setFieldValue('price', record.price);
      setFieldValue('category', record.categoryId);
      setFieldValue('subCategory', record.subCategoryId);
    }
  }, [record]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    },300);
  }, []);

  const handleFileChange = (event) => {
    setFieldValue('productImage', event.currentTarget.files[0]);
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.currentTarget.files[0]);
        fileReader.onload = () => {
          resolve(fileReader.result);
          setFileObj(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
  };

  return (
    <>
      <Dialog open={editDialog}>
        <DialogContent style={{ width: "500px" }}>
          <form onSubmit={handleSubmit}>
            <DialogContainer
              record={record._id}
              name={"Product"}
              handleAddEditClose={() => {
                // resetForm();
                handleAddEditClose();
              }}
              actionFlag={actionFlag}
            >
              <Grid container spacing={2} style={{ paddingTop: "10px" }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="productName"
                    name="productName"
                    label="Product Name"
                    value={values.productName}
                    onChange={handleChange}
                    inputRef={inputRef}
                    error={touched.productName && Boolean(errors.productName)}
                    helperText={touched.productName && errors.productName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="discription"
                    name="discription"
                    label="Discription"
                    value={values.discription}
                    onChange={handleChange}
                    error={touched.discription && Boolean(errors.discription)}
                    helperText={touched.discription && errors.discription}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="productImage"
                    name="productImage"
                    type="file"
                    inputProps={{
                      accept: '.jpg,.png,.jpeg',
                      onChange: (event) => handleFileChange(event),
                    }}
                    value={values.productImage}
                    onChange={handleChange}
                    error={touched.productImage && Boolean(errors.productImage)}
                    helperText={touched.productImage && errors.productImage}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={touched.category && Boolean(errors.category)}
                  >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      name="category"
                      label="category"
                      value={values.category} 
                      onChange={(e) => handleCateChange(e)}
                    >
                      {categoryList.data?.allCategories.map((category, i) => (
                        <MenuItem key={i} value={category._id}>
                          {category.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.category && errors.category ? (
                      <FormHelperText>{errors.category}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={touched.subCategory && Boolean(errors.subCategory)}
                  >
                    <InputLabel id="subCategory-label">subCategory</InputLabel>
                    <Select
                      labelId="subCategory-label"
                      id="subCategory"
                      name="subCategory"
                      label="Sub Category"
                      value={values.subCategory}
                      onChange={handleChange}
                    >
                      {subCategory.data?.allSubCategories.map(
                        (subCategory, i) => {
                          return (
                            <MenuItem key={i} value={subCategory._id}>
                              {subCategory.subCategoryName}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                    {touched.subCategory && errors.subCategory ? (
                      <FormHelperText>
                        {errors.subCategory}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContainer>
          </form>
        </DialogContent>
      </Dialog>
      <ToastCon />
    </>
  );
};

export default AddEditProDialog;

import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ToastCon from "../toastContainer";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "../../store/types/type";
import DialogContainer from "./dialogContainer";

const AddEditCateDialog = ({ editDialog, setEditDialog, handleAddEditClose, record }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [actionFlag, setActionFlag] = useState(false);
  const { actionRes } = useSelector((state) => state.categoryReducer);

  const { setFieldValue, handleChange, handleSubmit, touched, errors, values, resetForm } = useFormik({
    initialValues: {
      categoryName: "",
    },
    onSubmit: (values) => {
      if (!record?._id) {
        setActionFlag(true);
        setTimeout(() => {
          dispatch({ type: CREATE_CATEGORY, payload: { categoryName: values.categoryName } });
          setEditDialog(false);
          toast(actionRes);
          setActionFlag(false);
        }, 2000)
      } else {
        setActionFlag(true);
        setTimeout(() => {
          let updateObj = { ...record, categoryName: values.categoryName };
          dispatch({ type: UPDATE_CATEGORY, payload: updateObj });
          setEditDialog(false);
          toast(actionRes);
          setActionFlag(false);
        }, 2000)
      }
    },
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      categoryName: Yup.string().required("Required"),
    }),
  });

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    },300);
    if(Object.keys(record).length) {
      setFieldValue('categoryName', record.categoryName)
    }
  }, []);

  return (
    <div>
      <Dialog open={editDialog}>
        <DialogContent style={{ width: "500px" }}>
          <form onSubmit={handleSubmit}>
            <DialogContainer
              record={record._id}
              name={"Category"}
              handleAddEditClose={handleAddEditClose}
              actionFlag={actionFlag}
            >
              <Grid container spacing={2} style={{ paddingTop: "10px" }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="Category"
                    onChange={handleChange}
                    value={values.categoryName}
                    inputRef={inputRef}
                    error={touched.categoryName && Boolean(errors.categoryName)}
                    helperText={touched.categoryName && errors.categoryName}
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

export default AddEditCateDialog;

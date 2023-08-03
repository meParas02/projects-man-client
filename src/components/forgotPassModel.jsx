import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { PUT_FORGOT_PASSWORD } from "../store/types/type";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ForgotPassModel = ({ forgotPassModel, handleCloseModel }) => {
  const onSubmit = async (values) => {
    // dispatch({
    //   type: PUT_FORGOT_PASSWORD,
    //   payload: { email: values.email },
    // });
  };

  return (
    <div>
      <Dialog
        open={forgotPassModel}
        TransitionComponent={Transition}
        onClose={handleCloseModel}
        aria-describedby="alert-dialog-slide-description"
        disableEscapeKeyDown={true}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Forgot Password (Remain xD...)</DialogTitle>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={onSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="standard"
                        value={values.email}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button type="submit">Okay</Button>
                <Button onClick={handleCloseModel}>Cancel</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default ForgotPassModel;

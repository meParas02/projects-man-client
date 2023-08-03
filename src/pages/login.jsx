import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { POST_LOGIN_JWT } from "../store/types/type";
import ForgotPassModel from "../components/forgotPassModel";
import "./css/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [forgotPassModel, setForgotPassModel] = useState(false);
  const handleOpenModel = () => setForgotPassModel(true);
  const handleCloseModel = () => setForgotPassModel(false);

  const onSubmit = async (values) => {
    dispatch({
      type: POST_LOGIN_JWT,
      payload: { email: values.email, password: values.password },
    });
    toast("You are logged in!");
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Sign In
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Button type="submit" variant="contained" color="primary">
                      Sign In
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="body1">
                      <Button onClick={handleOpenModel}>Forgot Password</Button>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      Create new one..? Go to{" "}
                      <Link to="/resister" className="login-link">
                        Resister
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
      <ForgotPassModel
        forgotPassModel={forgotPassModel}
        handleCloseModel={handleCloseModel}
      />
    </Container>
  );
};

export default Login;

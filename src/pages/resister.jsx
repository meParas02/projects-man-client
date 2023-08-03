import React from "react";
import { useFormik } from "formik";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
  FormLabel,
  Container,
} from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { POST_RESISTRATION } from "../store/types/type";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gmail: "",
      password: "",
      mobileNo: "",
      city: "",
      underAge: "",
      gender: "",
      language: [],
    },
    onSubmit: (values) => {
      dispatch({
        type: POST_RESISTRATION,
        payload: {
          uid: 87,
          name: values.name,
          age: values.age,
          gmail: values.gmail,
          password: values.password,
          mobileNo: values.mobileNo,
          city: values.city,
          underAge: values.underAge,
          gender: values.gender,
          language: values.language,
        },
      });
      toast("User is created!");
    },
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      age: Yup.number().required("Required").positive().integer(),
      gmail: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required").min(8, "Must be at least 8 characters"),
      mobileNo: Yup.string().required("Required").matches(/^[0-9]{10}$/, "Invalid mobile number"),
      city: Yup.string().required("Required"),
      underAge: Yup.boolean().required("Required"),
      gender: Yup.string().required("Required"),
      language: Yup.array().required("Required").min(1, "Select at least one language"),
    }),
  });

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const languages = ["English", "Hindi", "Gujarati", "Marathi"];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Registration Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="gmail"
              name="gmail"
              label="Gmail"
              value={formik.values.gmail}
              onChange={formik.handleChange}
              error={formik.touched.gmail && Boolean(formik.errors.gmail)}
              helperText={formik.touched.gmail && formik.errors.gmail}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="mobileNo"
              name="mobileNo"
              label="Mobile Number"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
              helperText={formik.touched.mobileNo && formik.errors.mobileNo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              error={formik.touched.city && Boolean(formik.errors.city)}
            >
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
              >
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.city && formik.errors.city ? (
                <FormHelperText>{formik.errors.city}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              component="fieldset"
              error={formik.touched.underAge && Boolean(formik.errors.underAge)}
            >
              <FormLabel component="legend">Under Age</FormLabel>
              <RadioGroup
                row
                aria-label="underAge"
                name="underAge"
                value={formik.values.underAge}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Over 18"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Under 18"
                />
              </RadioGroup>
              {formik.touched.underAge && formik.errors.underAge ? (
                <FormHelperText>{formik.errors.underAge}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              component="fieldset"
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {formik.touched.gender && formik.errors.gender ? (
                <FormHelperText>{formik.errors.gender}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              error={formik.touched.language && Boolean(formik.errors.language)}
            >
              <FormLabel component="legend">Languages</FormLabel>
              <FormGroup>
                {languages.map((lan, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={lan}
                    name="language"
                    value={lan}
                    onChange={formik.handleChange}
                    checked={formik.values.language.includes(lan)}
                  />
                ))}
              </FormGroup>
              {formik.touched.language && formik.errors.language ? (
                <FormHelperText>{formik.errors.language}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Back to...{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegistrationForm;

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../../store/Auth/Action";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password_hash: Yup.string().required("Password is required"),
  full_name: Yup.string().required("Fullname is required"),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [{ value: 1, label: "January" }];
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password_hash: "",
      birth_day: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.birth_day;
      const birth_day = `${year}-${month}-${day}`;
      values.birth_day = birth_day;
      console.log("Form values", values);
      dispatch(register(values));
      navigate("/");
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("birth_day", {
      ...formik.values.birth_day,
      [name]: event.target.value,
    });
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full name"
            name="full_name"
            variant="outlined"
            size="large"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password_hash"
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password_hash}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password_hash &&
              Boolean(formik.errors.password_hash)
            }
            helperText={
              formik.touched.password_hash && formik.errors.password_hash
            }
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Date</InputLabel>
          <Select
            fullWidth
            name="day"
            value={formik.values.birth_day.day}
            onChange={handleDateChange("day")}
            onBlur={formik.handleBlur}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={4}>
          <InputLabel>Month</InputLabel>
          <Select
            fullWidth
            name="month"
            value={formik.values.birth_day.month}
            onChange={handleDateChange("month")}
            onBlur={formik.handleBlur}
          >
            {months.map((month) => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={4}>
          <InputLabel>Year</InputLabel>
          <Select
            fullWidth
            name="year"
            value={formik.values.birth_day.year}
            onChange={handleDateChange("year")}
            onBlur={formik.handleBlur}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} className="mt-20 ">
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ borderRadius: "29px", py: "15px", bgcolor: "blue[500]" }}
            size="large"
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;

import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { loginUser } from '../../store/Auth/Action'
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password_hash: Yup.string().required("Password is required"),
});
const SigninForm = () => {
    const dispath = useDispatch()
    const formik = useFormik({
      initialValues: {
        email: "",
        password_hash: "",
      },
      validationSchema,
      onSubmit: (values) => {
        dispath(loginUser(values));
        console.log("Form values", values);
      },
    });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
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
            type="password"
            size="large"
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
        <Grid item xs={12} className="mt-20 ">
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ borderRadius: "29px", py: "15px", bgcolor: "blue[500]" }}
            size="large"
          >
            Signin
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SigninForm
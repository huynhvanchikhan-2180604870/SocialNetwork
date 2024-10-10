import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../store/Auth/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
export default function ProfileModal({open, handleClose}) {

  const [uploading, setUploading] = React.useState(false)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleSubmit = (values) => {
    console.log("data: ",values)
    const { day, month, year } = values.birth_day;
    const birth_day = `${year}-${month}-${day}`;
    values.birth_day = birth_day;
    dispatch(updateUserProfile(values));
  };

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("birth_day", {
      ...formik.values.birth_day,
      [name]: event.target.value,
    });
  };

  const formik = useFormik({
    initialValues: {
      full_name: "",
      website: "",
      location: "",
      bio: "",
      backgroud_image: "",
      image: "",
      birth_day: {
        day: "",
        month: "",
        year: "",
      },
    },
    onSubmit: handleSubmit,
  });

  const handleImageChange = (event) => {
    setUploading(true)
    const {name} = event.target
    const file = event.target.files[0]
    formik.setFieldValue(name, file);
    setUploading(false)
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-lable="delete">
                  <CloseIcon />
                </IconButton>
                <p className="text-sm">Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div className="overflow-y-scroll hideScrollBar overflow-x-hidden h-[80vh]">
              <React.Fragment>
                <div className="w-full">
                  <div className="relative">
                    <img
                      src="https://cdn.pixabay.com/photo/2023/03/04/20/07/coffee-7830087_640.jpg"
                      alt=""
                      className="w-full h-[12rem] object-cover object-center"
                    />

                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      name="backgroud_image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      alt="username"
                      src={auth.user?.image}
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid white",
                      }}
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 h-full opacity-0 cursor-pointer w-[10rem]"
                      onChange={handleImageChange}
                      name="image"
                    />
                  </div>
                </div>
              </React.Fragment>
              <div className="space-y-3">
                <TextField
                  fullWidth
                  id="full_name"
                  name="full_name"
                  label="Full Name"
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.full_name && Boolean(formik.errors.full_name)
                  }
                  helperText={
                    formik.touched.full_name && formik.errors.full_name
                  }
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />

                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                  helperText={formik.touched.website && formik.errors.website}
                />

                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />

                <div className="flex justify-between items-center">
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
                </div>

                <p className="py-3 text-lg">Edit Professional Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RepeatIcon from "@mui/icons-material/Repeat";
import BarChartIcon from "@mui/icons-material/BarChart";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: "20px"
};

export default function ReplyModal({ open, handleClose }) {
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectImage, setSelectImage] = React.useState("");
  const navigate = useNavigate();
const handleSubmit = (values) => {
  console.log("values: ", values);
};
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId:4
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imageUrl = event.target.files[0];
    formik.setFieldValue("image", imageUrl);
    setSelectImage(imageUrl);
    setUploadingImage(false);
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
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${6}`)}
              className="cursor-pointer"
              alt="username"
              src="http://res.cloudinary.com/dnbw04gbs/image/upload/v1690639851/instagram%20post/bywtgh9vj4e80aywstss.png"
            />

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <span className="font-semibold">Code With Zosh</span>
                  <span className="text-gray-600">@codewithzosh . 2m</span>
                  <img
                    className="ml-2 w-5 h-5"
                    src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="mt-2">
                <div
                  onClick={() => navigate(`/twit/${3}`)}
                  className="cursor-pointer"
                >
                  <p className="mb-2 p-0">
                    twitter clone - full stack project with spring boot and
                    react
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className={`py-10`}>
            <div className="flex space-x-5">
              <Avatar
                alt="username"
                src="http://res.cloudinary.com/dnbw04gbs/image/upload/v1690639851/instagram%20post/bywtgh9vj4e80aywstss.png"
              />
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="content"
                      placeholder="What is happening"
                      className={`border-none outline-none text-xl bg-transparent`}
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content && (
                      <span className="text-red-500">
                        {formik.errors.content}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                      <TagFacesIcon className="text-[#1d9bf0]" />
                    </div>
                    <div>
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Tweet
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}

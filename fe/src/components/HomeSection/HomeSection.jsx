import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addNewLike,
  addNewPost,
  createPost,
  getAllPosts,
  updatePostLikes,
} from "../../store/Post/Action";
import { uploadToCloudnary } from "../../utils/uploadToCloudnary";
import TweetCard from "./TweetCard";
import { connectWebSocket } from "../../config/WebSocketService";
import { WebSocketContext } from "../../config/WebSocketContext";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const dispatch = useDispatch();
  const { auth, post } = useSelector((state) => state);
  const wsConnection = useContext(WebSocketContext); // Access wsConnection

  // Handle submit
  const handleSubmit = (values, actions) => {
    dispatch(createPost(values))
      .then((newPost) => {
        actions.resetForm();
        setSelectImage("");
        setUploadingImage(false);

        // Send message over WebSocket
        if (wsConnection && wsConnection.connected) {
          wsConnection.send(
            "/app/newPost",
            {},
            JSON.stringify({
              action: "NEW_POST",
              data: newPost, // Use the returned newPost data
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Handle error (e.g., show a notification)
      });
  };


  // Fetch posts on mount
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imageUrl = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue("image", imageUrl);
    setSelectImage(imageUrl);
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      <section className=" bg-white sticky top-0 ">
        <h1 className="py-5 text-xl font-bold opacity-100">Home</h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar alt="username" src={auth?.user?.image} />
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
                  <span className="text-red-500">{formik.errors.content}</span>
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
              <div>{selectImage && <img src={selectImage} alt="" />}</div>
            </form>
          </div>
        </div>
      </section>

      <section>
        {/* {posts.map((post) => (
          <TweetCard key={post.id} item={post} />
        ))} */}
        {post?.posts?.map((post) => (
          <TweetCard key={post.id} item={post} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection;

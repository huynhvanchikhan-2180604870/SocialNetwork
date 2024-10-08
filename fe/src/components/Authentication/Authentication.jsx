import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import Logo from "../../assets/images/KOH.png";
import AuthModal from "./AuthModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginGoole } from "../../store/Auth/Action";

const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [path, setPath] = React.useState("");
  const dispatch= useDispatch()
  const handleOpenAuthModal = (pathHandle) => {
      setPath(pathHandle);
      console.log(path);

      setOpenAuthModal(true);
  };
  const handleCloseAuthModal = () => setOpenAuthModal(false);
const handleGoogleLoginSuccess = async (credentialResponse) => {
  try {
    // Lấy credential từ Google
    const token = credentialResponse.credential;
    console.log("Backend response:", token);
    dispatch(loginGoole(token))
  } catch (error) {
    console.error("Error during Google login:", error);
  }
};
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://cdn.pixabay.com/photo/2024/09/10/22/25/architectural-design-9038365_640.jpg"
            alt=""
          />
          <div className="absolute top-[26%] left-[19%]">
            <img src={Logo} alt="" style={{ width: "30px", height: "30px" }} />
          </div>
        </Grid>
        <Grid className="px-10" lg={5} xs={12}>
          <h1 className="font-bold text-7xl mt-10">Happening Now</h1>
          <h1 className="font-bold text-3xl py-16">Join Twitter Today</h1>
          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin
                width={330}
                onSuccess={handleGoogleLoginSuccess}
                onError={errorMessage}
              />
              <p className="text-center py-5">OR</p>
              <Button
                onClick={() => handleOpenAuthModal("register")}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "20px",
                  py: "7px",
                }}
              >
                Create Account
              </Button>

              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-xl mb-5">Already Have Account?</h1>
              <Button
                onClick={() => handleOpenAuthModal("login")}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "20px",
                  py: "7px",
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <section>
        <AuthModal
          open={openAuthModal}
          handleClose={handleCloseAuthModal}
          path={path}
        />
      </section>
    </div>
  );
};

export default Authentication;

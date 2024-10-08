import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useSelector } from "react-redux";

const Profile = () => {
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store);
    const [tabValue, setTabValue] = useState("1");
    const [openProfileModal, setopenProfileModal] = useState(false)
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const handleOpenProfileModel = () => setopenProfileModal(true);
  const handleClose = () => setopenProfileModal(false);

  const handleFollowUser = () => {};

  const handleTabChange = (event, newValue) =>{
    setTabValue(newValue)

    if(newValue === 4){
        console.log("likes tweet")
    }
    else if(newValue === 1){
        console.log("user tweet")
    }
  };
  return (
    <div>
      <section
        className={`z-50 bg-white flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth.user?.fullName}
        </h1>
      </section>

      <section>
        <img
          src={auth.user?.backgroudImage}
          alt=""
          className="w-[100%] h-[15rem] object-cover"
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="username"
            src={auth.user?.image}
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />

          {true ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg"> {auth.user?.fullName}</h1>
            {true && (
              <img
                className="ml-2 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt=""
              />
            )}
          </div>
          <h1 className="text-gray-500">
            @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
          </h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{auth.user?.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>

            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2"> {auth.user?.location}</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2"> {auth.user?.createdAt}</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>190</span>
              <span className="text-gray-500">Following</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold">
              <span>590</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {[1, 1, 1, 1].map((item) => (
                <TweetCard />
              ))}
            </TabPanel>
            <TabPanel value="2">Users Replies</TabPanel>
            <TabPanel value="3">Meida</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModal} />
      </section>
    </div>
  );
};

export default Profile;

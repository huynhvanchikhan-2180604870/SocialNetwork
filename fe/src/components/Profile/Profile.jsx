import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findPostsByLikeContainUser, findREPostsByUserContainUser, getUserPost } from "../../store/Post/Action";
import { findUserById, followUser } from "../../store/Auth/Action";

const Profile = () => {
    const [tabValue, setTabValue] = useState("1");
    const [openProfileModal, setopenProfileModal] = useState(false);
    const [handle, setHandle] = useState("")
    // const [posts, setPosts] = useState(null)
  const { auth } = useSelector((store) => store);
  const { post } = useSelector((store) => store);
  const dispatch = useDispatch();
  const {id} = useParams()

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const handleOpenProfileModel = () => setopenProfileModal(true);
  const handleClose = () => setopenProfileModal(false);

  const handleFollowUser = () => {
    dispatch(followUser(id))
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 4) {
      console.log("likes tweet");
    } else if (newValue === 1) {
      console.log("user tweet");
    }
  };

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUserPost(id));
    dispatch(findREPostsByUserContainUser(id));
    dispatch(findPostsByLikeContainUser(id));
  }, [id]);
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
          {auth.findUser?.fullName}
        </h1>
      </section>

      <section>
        <img
          src={auth.findUser?.backgroudImage}
          alt=""
          className="w-[100%] h-[15rem] object-cover"
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="username"
            src={auth.findUser?.image}
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />

          {auth.findUser?.req_user ? (
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
              {!auth.findUser?.followed ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg"> {auth.findUser?.fullName}</h1>
            {true && (
              <img
                className="ml-2 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt=""
              />
            )}
          </div>
          <h1 className="text-gray-500">
            @{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}
          </h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{auth.findUser?.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>

            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2"> {auth.findUser?.location}</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2"> {auth.findUser?.birthDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.following?.length}</span>
              <span className="text-gray-500">Following</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followers?.length}</span>

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
                <Tab label="Feel" value="1" />
                <Tab label="RePosts" value="2" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {post?.userPosts?.map((item) => (
                <TweetCard item={item} key={item.id} />
              ))}
            </TabPanel>
            <TabPanel value="2">
              {post?.reposts?.map((item2) => (
                <TweetCard item={item2} key={item2.id} />
              ))}
            </TabPanel>
            <TabPanel value="4">
              {post?.likedPosts?.map((item1) => (
                <TweetCard item={item1} key={item1.id} />
              ))}
            </TabPanel>
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

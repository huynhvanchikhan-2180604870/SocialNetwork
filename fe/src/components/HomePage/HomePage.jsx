import { Grid } from "@mui/material";
import React from "react";
import HomeSection from "../HomeSection/HomeSection";
import Navigation from "../Navigation/Navigation";
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import TwitDetails from "../TwitDetails/TwitDetails";

const HomePage = () => {
  return (
    <Grid container className="px-5 lg:px-36 justify-between md:block">
      <Grid
        item
        xs={12}
        lg={2.5}
        className=" lg:block w-full relative md:block"
      >
        <Navigation />
        {/* <p className="text-center">left part</p> */}
      </Grid>

      <Grid
        item
        xs={12}
        lg={6}
        className="px-5 lg:px-9 lg:block w-full relative md:hidden"
      >
        <Routes>
          <Route
            path="/"
            element={<HomeSection  />}
          ></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/twit/:id" element={<TwitDetails />}></Route>
        </Routes>
      </Grid>

      <Grid
        item
        xs={12}
        lg={3}
        className="hidden lg:block w-full relative md:hidden"
      >
        <RightPart />
      </Grid>
    </Grid>
  );
};

export default HomePage;

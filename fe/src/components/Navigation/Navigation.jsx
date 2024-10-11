import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/KOH.png";
import { logout } from "../../store/Auth/Action";
import { navigationMenu } from "./NavigationMenu";
const Navigation = () => {
      const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("logout");
    handleClose();
    dispatch(logout(jwt));
  };
  const navigate = useNavigate();
  return (
    <div className="md:flex-row container sticky top-0 h-screen">
      <div>
        <div className="py-5">
          <img src={Logo} alt="" style={{ width: "30px", height: "30px" }} />
        </div>

        <div className="space-y-6 h-[100%]">
          {navigationMenu.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.title === "Profile"
                  ? navigate(`/profile/${auth.user?.id}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="py-10">
          <Button
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#1e88e5",
            }}
            variant="contained"
          >
            Tweet
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-3">
          <Avatar alt="username" src={auth.user?.image} />
          <div className="">
            <p>{auth.user?.fullName}</p>
            <span className="opacity-70">
              @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
            </span>
          </div>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="mb-3"></div>
      </div>
    </div>
  );
};

export default Navigation;

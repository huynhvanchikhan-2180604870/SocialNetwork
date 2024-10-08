import BarChartIcon from "@mui/icons-material/BarChart";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRepost, likePost } from "../../store/Post/Action";
import ReplyModal from "./ReplyModal";

const TweetCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const dispatch = useDispatch();

  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleDeleteTweet = () => {
    console.log("delete tweet");
    handleClose();
  };

  const handleCreateRetweet = () => {
    dispatch(createRepost(item?.id));
  };

  const handleLikeTweet = () => {
    dispatch(likePost(item?.id));
  };
  return (
    <React.Fragment>
      {/* <div className="flex items-center font-semibold text-gray-700 py-2">
            <RepeatIcon />
            <p>You Retweet</p>
        </div> */}
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          className="cursor-pointer"
          alt="username"
          src={item?.user?.image}
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              {
                <span className="text-gray-600">
                  {/* @{item?.user?.fullName.split(" ").join("_").toLowerCase()}  */}
                  . 2m
                </span>
              }
              <img
                className="ml-2 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt=""
              />
            </div>
            <div>
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
                <MenuItem onClick={handleDeleteTweet}>Delet</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div
              onClick={() => navigate(`/twit/${item?.id}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">{item?.content}</p>
              {item?.image != null ? (
                <img
                  src={item?.image}
                  alt=""
                  className="w-[28rem] border border-gray-400 p-5 rounded-md"
                />
              ) : (
                ""
              )}
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>

              <div
                className={`${
                  item?.repost ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRetweet}
                  className="cursor-pointer"
                />
                <p>{item?.totalRepost}</p>
              </div>
              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteBorderIcon
                    onClick={handleLikeTweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteIcon
                    onClick={handleLikeTweet}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal
          item={item}
          handleClose={handleCloseReplyModal}
          open={openReplyModal}
        />
      </section>
    </React.Fragment>
  );
};

export default TweetCard;

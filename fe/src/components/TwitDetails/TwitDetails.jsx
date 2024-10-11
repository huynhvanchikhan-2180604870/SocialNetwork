import React, { useEffect } from 'react'
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from 'react-router-dom';
import TweetCard from '../HomeSection/TweetCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findPostsById } from '../../store/Post/Action';

const TwitDetails = () => {
      const navigate = useNavigate();
      const handleBack = () => navigate(-1);
      const dispatch = useDispatch()
      const {id} = useParams()
      const {post} = useSelector(store => store)
      useEffect(() => {
        if (id) {
          dispatch(findPostsById(id));
        }
      }, [post.like, post.repost]);
  return (
    <React.Fragment>
      <section
        className={`z-50 bg-white flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">POST</h1>
      </section>

      <section>
        <TweetCard item={post?.post} />
        <Divider sx={{ margin: "2rem 0rem" }} />
      </section>

      <section>
        {post?.post?.replyPost.map((item) => (
          <TweetCard key={item?.id} item={item} />
        ))}
      </section>
    </React.Fragment>
  );
}

export default TwitDetails
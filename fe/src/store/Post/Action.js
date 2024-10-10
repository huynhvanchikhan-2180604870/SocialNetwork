import axios from "axios"
import { api } from "../../config/api"
import { FIND_POST_BY_ID_FAILURE, FIND_POST_BY_ID_SUCCESS, GET_ALL_POSTS_FAILURE, GET_ALL_POSTS_REQUEST, GET_ALL_POSTS_SUCCESS, GET_USER_REPOST_FAILURE, GET_USER_REPOST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_SUCCESS, POST_DELETE_FAILURE, POST_DELETE_SUCCESS, REPLY_POST_SUCCESS, REPOST_FAILURE, REPOST_SUCCESS, USER_LIKE_POST_FAILURE, USER_LIKE_POST_SUCCESS } from "./ActionType"
import { type } from "@testing-library/user-event/dist/type"
import { FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS } from "../Auth/ActionType"

export const getAllPosts = () => async (dispatch) =>{
    try{
        const { data } = await api.get("/api/posts/");
        console.log("get all post: ", data)
        dispatch({type:GET_ALL_POSTS_SUCCESS, payload: data})
    }catch(error){
        dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error.message });
    }
}


export const getUserPost = (userId) => async (dispatch) => {
  try {
    console.log("user id get post", userId)
    const { data } = await api.get(`/api/posts/user/${userId}`);
    console.log("get user all post: ", data);
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error.message });
  }
};


export const findPostsByLikeContainUser = (userId) => async (dispatch) => {
  try {
    console.log("user id like post", userId);
    const { data } = await api.get(`/api/posts/user/${userId}/likes`);
    console.log("get user like post: ", data);
    dispatch({ type: USER_LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIKE_POST_FAILURE, payload: error.message });
  }
};

export const findREPostsByUserContainUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}/reposts`);
    console.log("get user repost post: ", data);
    dispatch({ type: GET_USER_REPOST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_REPOST_FAILURE, payload: error.message });
  }
};


export const findPostsById = (postID) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/${postID}`);
    console.log("find post by id post: ", data);
    dispatch({ type: FIND_POST_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_POST_BY_ID_FAILURE, payload: error.message });
  }
};


export const createPost = (postDate) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/create`,postDate);
    console.log("created post: ", data);
    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_CREATE_FAILURE, payload: error.message });
  }
};


export const createPostReply = (postDate) => async (dispatch) => {
  try {
    console.log("Req: ", postDate)
    const { data } = await api.post(`/api/posts/reply`, postDate);
    console.log("reply post: ", data);
    dispatch({ type: REPLY_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_CREATE_SUCCESS, payload: error.message });
  }
};


export const createRepost = (postID) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/posts/${postID}/repost`);
    console.log("Repost post: ", data);
    dispatch({ type: REPOST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REPOST_FAILURE, payload: error.message });
  }
};


export const likePost = (postID) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${postID}/likes`);
    console.log("Repost post: ", data);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIKE_POST_FAILURE, payload: error.message });
  }
};


export const deletePost = (postID) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/${postID}`);
    console.log("Repost post: ", data);
    dispatch({ type: POST_DELETE_SUCCESS, payload: postID });
  } catch (error) {
    dispatch({ type: POST_DELETE_FAILURE, payload: error.message });
  }
};


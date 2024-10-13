// import axios from "axios"
// import { api } from "../../config/api"
// import { ADD_NEW_LIKE, ADD_NEW_POST, ADD_NEW_REPLY, FIND_POST_BY_ID_FAILURE, FIND_POST_BY_ID_SUCCESS, GET_ALL_POSTS_FAILURE, GET_ALL_POSTS_REQUEST, GET_ALL_POSTS_SUCCESS, GET_USER_REPOST_FAILURE, GET_USER_REPOST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_SUCCESS, POST_DELETE_FAILURE, POST_DELETE_SUCCESS, REPLY_POST_SUCCESS, REPOST_FAILURE, REPOST_SUCCESS, UPDATE_LIKE, UPDATE_POST, USER_LIKE_POST_FAILURE, USER_LIKE_POST_SUCCESS } from "./ActionType"
// import { type } from "@testing-library/user-event/dist/type"
// import { FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS } from "../Auth/ActionType"

// export const getAllPosts = () => async (dispatch) =>{
//     try{
//         const { data } = await api.get("/api/posts/");
        
//         dispatch({type:GET_ALL_POSTS_SUCCESS, payload: data})
//     }catch(error){
//         dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error.message });
//     }
// }


// export const getUserPost = (userId) => async (dispatch) => {
//   try {
    
//     const { data } = await api.get(`/api/posts/user/${userId}`);
    
//     dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: GET_USERS_POST_FAILURE, payload: error.message });
//   }
// };


// export const findPostsByLikeContainUser = (userId) => async (dispatch) => {
//   try {
//     console.log("user id like post", userId);
//     const { data } = await api.get(`/api/posts/user/${userId}/likes`);
//     console.log("get user like post: ", data);
//     dispatch({ type: USER_LIKE_POST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: USER_LIKE_POST_FAILURE, payload: error.message });
//   }
// };

// export const findREPostsByUserContainUser = (userId) => async (dispatch) => {
//   try {
//     const { data } = await api.get(`/api/posts/user/${userId}/reposts`);
    
//     dispatch({ type: GET_USER_REPOST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: GET_USER_REPOST_FAILURE, payload: error.message });
//   }
// };


// export const findPostsById = (postID) => async (dispatch) => {
//   try {
//     const { data } = await api.get(`/api/posts/${postID}`);
//     dispatch({ type: FIND_POST_BY_ID_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: FIND_POST_BY_ID_FAILURE, payload: error.message });
//   }
// };


// export const createPost = (postDate) => async (dispatch) => {
//   try {
//     const { data } = await api.post(`/api/posts/create`,postDate);
    
//     dispatch({ type: POST_CREATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: POST_CREATE_FAILURE, payload: error.message });
//   }
// };


// export const createPostReply = (postDate) => async (dispatch) => {
//   try {
    
//     const { data } = await api.post(`/api/posts/reply`, postDate);
    
//     dispatch({ type: REPLY_POST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: POST_CREATE_SUCCESS, payload: error.message });
//   }
// };


// export const createRepost = (postID) => async (dispatch) => {
//   try {
//     const { data } = await api.put(`/api/posts/${postID}/repost`);
    
//     dispatch({ type: REPOST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: REPOST_FAILURE, payload: error.message });
//   }
// };


// export const likePost = (postID) => async (dispatch) => {
//   try {
//     const { data } = await api.post(`/api/${postID}/likes`);
    
//     dispatch({ type: LIKE_POST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: LIKE_POST_FAILURE, payload: error.message });
//   }
// };


// export const deletePost = (postID) => async (dispatch) => {
//   try {
//     const { data } = await api.post(`/api/posts/${postID}`);
    
//     dispatch({ type: POST_DELETE_SUCCESS, payload: postID });
//   } catch (error) {
//     dispatch({ type: POST_DELETE_FAILURE, payload: error.message });
//   }
// };


// // In Post/Action.js
// export const addNewPost = (post) => ({
//   type: ADD_NEW_POST,
//   payload: post,
// });

// export const addNewReply = (reply) => ({
//   type: ADD_NEW_REPLY,
//   payload: reply,
// });

// export const addNewLike = (like) => ({
//   type: ADD_NEW_LIKE,
//   payload: like,
// });



/////////////////
import { api } from "../../config/api";
import {
  ADD_NEW_LIKE,
  ADD_NEW_POST,
  ADD_NEW_REPLY,
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_SUCCESS,
  REPLY_POST_SUCCESS,
  REPOST_FAILURE,
  REPOST_SUCCESS,
  USER_LIKE_POST_FAILURE,
  USER_LIKE_POST_SUCCESS,
  GET_USER_REPOST_SUCCESS,
  GET_USER_REPOST_FAILURE,
  UPDATE_POST_LIKES,
} from "./ActionType";

// Helper function to handle API request
const handleApiRequest = async (
  dispatch,
  requestAction,
  successAction,
  failureAction,
  apiCall
) => {
  try {
    const { data } = await apiCall();
    dispatch({ type: successAction, payload: data });
  } catch (error) {
    dispatch({ type: failureAction, payload: error.message });
  }
};

// Get all posts
export const getAllPosts = () => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_FAILURE,
    () => api.get("/api/posts/")
  );
};

// Get posts by user
export const getUserPost = (userId) => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    GET_USERS_POST_SUCCESS,
    GET_USERS_POST_FAILURE,
    () => api.get(`/api/posts/user/${userId}`)
  );
};

// Get liked posts by user
export const findPostsByLikeContainUser = (userId) => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    USER_LIKE_POST_SUCCESS,
    USER_LIKE_POST_FAILURE,
    () => api.get(`/api/posts/user/${userId}/likes`)
  );
};

// Get reposts by user
export const findREPostsByUserContainUser = (userId) => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    GET_USER_REPOST_SUCCESS,
    GET_USER_REPOST_FAILURE,
    () => api.get(`/api/posts/user/${userId}/reposts`)
  );
};

// Find post by ID
export const findPostsById = (postID) => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    FIND_POST_BY_ID_SUCCESS,
    FIND_POST_BY_ID_FAILURE,
    () => api.get(`/api/posts/${postID}`)
  );
};

// Create a new post
export const createPost = (postData) => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAILURE,
    () => api.post(`/api/posts/create`, postData)
  );
};

// Create a reply to a post
export const createPostReply = (postData) => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    REPLY_POST_SUCCESS,
    POST_CREATE_FAILURE,
    () => api.post(`/api/posts/reply`, postData)
  );
};

// Repost a post
export const createRepost = (postID) => async (dispatch) => {
  await handleApiRequest(dispatch, null, REPOST_SUCCESS, REPOST_FAILURE, () =>
    api.put(`/api/posts/${postID}/repost`)
  );
};

// // Like a post
// export const likePost = (postID) => async (dispatch) => {
//   await handleApiRequest(
//     dispatch,
//     null,
//     LIKE_POST_SUCCESS,
//     LIKE_POST_FAILURE,
//     () => api.post(`/api/${postID}/likes`)
//   );
// };

export const likePost = (postID) => async (dispatch) => {
  try {
    const response = await api.post(`/api/${postID}/likes`);
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: {
        postId: response.data.post.id,
        isLiked: response.data.post.liked,
        totalLikes: response.data.post.totalLikes,
      },
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAILURE,
      payload: error.message,
    });
  }
};

// Delete a post
export const deletePost = (postID) => async (dispatch) => {
  await handleApiRequest(
    dispatch,
    null,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAILURE,
    () => api.delete(`/api/posts/${postID}`)
  );
};

// WebSocket actions
export const addNewPost = (post) => ({ type: ADD_NEW_POST, payload: post });
export const addNewReply = (reply) => ({ type: ADD_NEW_REPLY, payload: reply });
export const addNewLike = (likeDto) => ({
  type: ADD_NEW_LIKE,
  payload: {
    postId: likeDto.post.id,
    totalLikes: likeDto.post.totalLikes,
  },
});
export const updatePostLikes = (postId, totalLikes) => {
  return {
    type: UPDATE_POST_LIKES,
    payload: {
      postId,
      totalLikes,
    },
  };
};

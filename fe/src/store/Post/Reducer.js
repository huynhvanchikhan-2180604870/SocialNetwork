// import {
//   ADD_NEW_LIKE,
//   ADD_NEW_POST,
//   ADD_NEW_REPLY,
//   FIND_POST_BY_ID_FAILURE,
//   FIND_POST_BY_ID_REQUEST,
//   FIND_POST_BY_ID_SUCCESS,
//   GET_ALL_POSTS_SUCCESS,
//   GET_USER_REPOST_FAILURE,
//   GET_USER_REPOST_REQUEST,
//   GET_USER_REPOST_RESQUEST,
//   GET_USER_REPOST_SUCCESS,
//   GET_USERS_POST_SUCCESS,
//   LIKE_POST_FAILURE,
//   LIKE_POST_REQUEST,
//   LIKE_POST_SUCCESS,
//   POST_CREATE_FAILURE,
//   POST_CREATE_REQUEST,
//   POST_CREATE_SUCCESS,
//   POST_DELETE_FAILURE,
//   POST_DELETE_REQUEST,
//   POST_DELETE_SUCCESS,
//   REPLY_POST_SUCCESS,
//   REPOST_FAILURE,
//   REPOST_REQUEST,
//   REPOST_RESQUEST,
//   REPOST_SUCCESS,
//   UPDATE_LIKE,
//   UPDATE_POST,
//   USER_LIKE_POST_FAILURE,
//   USER_LIKE_POST_REQUEST,
//   USER_LIKE_POST_SUCCESS,
// } from "./ActionType";

// const initialState = {
//   loading: false,
//   error: null,
//   posts: [],
//   post: null,
//   userPosts: [],
//   reposts: [],
//   likedPosts: [],
//   like: false,
//   postsLoaded: false,
// };

// export const postReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case POST_CREATE_REQUEST:
//     case POST_DELETE_REQUEST:
//     case USER_LIKE_POST_REQUEST:
//     case LIKE_POST_REQUEST:
//     case REPOST_RESQUEST: // Đã sửa
//     case GET_USER_REPOST_RESQUEST: // Đã sửa
//     case FIND_POST_BY_ID_REQUEST:
//       return { ...state, loading: true, error: null };

//     case POST_CREATE_FAILURE:
//     case GET_USER_REPOST_FAILURE:
//     case POST_DELETE_FAILURE:
//     case USER_LIKE_POST_FAILURE:
//     case LIKE_POST_FAILURE:
//     case REPOST_FAILURE:
//     case FIND_POST_BY_ID_FAILURE:
//       return { ...state, loading: false, error: action.payload };

//     case POST_CREATE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         posts: [action.payload, ...state.posts],
//       };

//     case GET_USER_REPOST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         reposts: action.payload,
//         error: null,
//       };

//     case GET_USERS_POST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         userPosts: action.payload,
//       };

//     case GET_ALL_POSTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         posts: action.payload,
//         postsLoaded: true,
//       };

//     case REPLY_POST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         posts: state.posts.map((post) =>
//           post.id === action.payload.postId
//             ? { ...post, replies: [...post.replies, action.payload] }
//             : post
//         ),
//       };

//     case LIKE_POST_SUCCESS:
//       return {
//         ...state,
//         posts: state.posts.map((post) =>
//           post.id === action.payload.postId
//             ? {
//                 ...post,
//                 likes: action.payload.likes,
//                 totalLikes: action.payload.totalLikes,
//               }
//             : post
//         ),
//       };

//     case USER_LIKE_POST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         likedPosts: action.payload,
//       };

//     case POST_DELETE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         posts: state.posts.filter((post) => post.id !== action.payload),
//       };

//     case REPOST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         reposts: [action.payload, ...state.reposts],
//       };

//     case FIND_POST_BY_ID_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         post: action.payload,
//       };
//     case ADD_NEW_POST:
//       return {
//         ...state,
//         posts: [action.payload, ...state.posts],
//       };
//     case ADD_NEW_REPLY:
//       return {
//         ...state,
//         posts: state.posts.map((post) =>
//           post.id === action.payload.postId
//             ? { ...post, replies: [...post.replies, action.payload] }
//             : post
//         ),
//       };
//     case ADD_NEW_LIKE:
//       return {
//         ...state,
//         posts: state.posts.map((post) =>
//           post.id === action.payload.postId
//             ? { ...post, likes: [...post.likes, action.payload] }
//             : post
//         ),
//       };

//     default:
//       return state;
//   }
// };



import {
  ADD_NEW_LIKE,
  ADD_NEW_POST,
  ADD_NEW_REPLY,
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_REQUEST,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POSTS_SUCCESS,
  GET_USER_REPOST_FAILURE,
  GET_USER_REPOST_REQUEST,
  GET_USER_REPOST_SUCCESS,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  REPLY_POST_SUCCESS,
  REPOST_FAILURE,
  REPOST_REQUEST,
  REPOST_SUCCESS,
  UPDATE_POST_LIKES,
  USER_LIKE_POST_FAILURE,
  USER_LIKE_POST_REQUEST,
  USER_LIKE_POST_SUCCESS,
} from "./ActionType";
const initialState = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  userPosts: [],
  reposts: null,
  likedPosts: [],
  postsLoaded: false,
};

// Helper function to update a post in the state
const updatePostInState = (posts, updatedPostId, updateFn) =>
  posts.map((post) => (post.id === updatedPostId ? updateFn(post) : post));

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
    case POST_DELETE_REQUEST:
    case USER_LIKE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case REPOST_REQUEST:
    case GET_USER_REPOST_REQUEST:
    case FIND_POST_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case POST_CREATE_FAILURE:
    case GET_USER_REPOST_FAILURE:
    case POST_DELETE_FAILURE:
    case USER_LIKE_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case REPOST_FAILURE:
    case FIND_POST_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // POST_CREATE_SUCCESS không thêm bài viết mới vào danh sách
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case UPDATE_POST_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                totalLikes: action.payload.totalLikes,
                liked: true,
              }
            : post
        ),
      };

    case GET_USER_REPOST_SUCCESS:
      return { ...state, loading: false, reposts: action.payload, error: null };

    case GET_USERS_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userPosts: action.payload,
      };

    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
        postsLoaded: true,
      };

    case REPLY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: updatePostInState(
          state.posts,
          action.payload.postId,
          (post) => ({
            ...post,
            replies: [...post.replies, action.payload],
          })
        ),
      };

    // case LIKE_POST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     like: action.payload, // Cập nhật trạng thái like của bài viết
    //   };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              liked: action.payload.isLiked, // Cập nhật isLiked cho người dùng hiện tại
              totalLikes: action.payload.totalLikes, // Cập nhật totalLikes
            };
          } else {
            return post;
          }
        }),
      };

    // case LIKE_POST_SUCCESS:
    //   return {
    //     ...state,
    //     posts: state.posts.map((post) =>
    //       post.id === action.payload.postId
    //         ? {
    //             ...post,
    //             likes: action.payload.likes,
    //             totalLikes: action.payload.totalLikes,
    //           }
    //         : post
    //     ),
    //   };

    case USER_LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedPosts: action.payload,
      };

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case REPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        reposts: [action.payload, ...state.reposts],
      };

    case FIND_POST_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, post: action.payload };

    // ADD_NEW_POST được xử lý từ WebSocket
    case ADD_NEW_POST:
      return { ...state, posts: [action.payload, ...state.posts] };

    case ADD_NEW_REPLY:
      return {
        ...state,
        posts: updatePostInState(
          state.posts,
          action.payload.postId,
          (post) => ({
            ...post,
            replies: [...post.replies, action.payload],
          })
        ),
      };

    case ADD_NEW_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              // Bảo toàn giá trị isLiked hiện tại của người dùng
              isLiked: post.liked,
              totalLikes: action.payload.totalLikes, // Cập nhật totalLikes từ server
            };
          } else {
            return post;
          }
        }),
      };

    default:
      return state;
  }
};



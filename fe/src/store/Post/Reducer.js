import {
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_REQUEST,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POSTS_SUCCESS,
  GET_USER_REPOST_FAILURE,
  GET_USER_REPOST_RESQUEST,
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
  REPOST_RESQUEST,
  REPOST_SUCCESS,
  USER_LIKE_POST_FAILURE,
  USER_LIKE_POST_REQUEST,
  USER_LIKE_POST_SUCCESS,
} from "./ActionType";

// const initialState = {
//   loading: false,
//   data: null,
//   error: null,
//   posts: [],
//   post: null,
//   like:false
// };

// export const postReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case POST_CREATE_REQUEST:
//     case POST_DELETE_REQUEST:
//     case USER_LIKE_POST_REQUEST:
//     case LIKE_POST_REQUEST:
//     case REPOST_RESQUEST:
//     case GET_USER_REPOST_RESQUEST:
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
//         loading: false, // Yêu cầu thành công, ngừng trạng thái loading
//         reposts: action.payload, // Cập nhật danh sách reposts từ payload
//         error: null, // Không có lỗi
//       };
//     case GET_USERS_POST_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           error: null,
//           userPost: action.payload,
//         };
//     case GET_ALL_POSTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         posts: action.payload,
//       };
//     case USER_LIKE_POST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         likedPosts: action.payload,
//       };

//     case LIKE_POST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         like: action.payload,
//       };
//     case POST_DELETE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         posts: state.posts.filter((post) => post.id != action.payload),
//       };

//     case REPOST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         repost: action.payload,
//       };

//     case FIND_POST_BY_ID_SUCCESS:
//     case REPLY_POST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         post: action.payload,
//       };
//     default:
//       return state;
//   }
// };
const initialState = {
  loading: false,
  data: null,
  error: null,
  posts: [], // Danh sách tất cả các bài viết
  post: null, // Bài viết hiện tại được chọn
  userPosts: [], // Bài viết của người dùng hiện tại
  reposts: [], // Danh sách repost
  likedPosts: [], // Danh sách bài viết đã được like
  like: false, // Trạng thái thích bài viết
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
    case POST_DELETE_REQUEST:
    case USER_LIKE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case REPOST_RESQUEST:
    case GET_USER_REPOST_RESQUEST:
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

    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: [action.payload, ...state.posts], // Thêm bài viết mới vào đầu danh sách
      };

    case GET_USER_REPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        reposts: action.payload, // Cập nhật danh sách repost
        error: null,
      };

    case GET_USERS_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userPosts: action.payload, // Cập nhật danh sách bài viết của người dùng
      };

    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload, // Cập nhật danh sách tất cả các bài viết
      };

    case USER_LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedPosts: action.payload, // Cập nhật danh sách bài viết đã like
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        like: action.payload, // Cập nhật trạng thái like của bài viết
      };

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.filter((post) => post.id !== action.payload), // Xóa bài viết
      };

    case REPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        reposts: [action.payload, ...state.reposts], // Thêm repost mới
      };

    case FIND_POST_BY_ID_SUCCESS:
    case REPLY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        post: action.payload, // Cập nhật bài viết hiện tại
      };

    default:
      return state;
  }
};

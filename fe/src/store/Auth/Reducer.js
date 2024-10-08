import { GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_GOOGLE_FAILURE, LOGIN_GOOGLE_REQUEST, LOGIN_GOOGLE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./ActionType"

const initialState = {
    user:null,
    loading:false,
    error: null,
    jwt: null,

}

export const autReducer = (state = initialState, action) =>{
    switch (action.type) {
      case LOGIN_USER_REQUEST:
      case REGISTER_USER_REQUEST:
      case GET_USER_PROFILE_REQUEST:
      case LOGIN_GOOGLE_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_USER_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case LOGIN_GOOGLE_SUCCESS:
        return { ...state, loading: false, error: null, jwt: action.payload };

      case GET_USER_PROFILE_SUCCESS:
        return { ...state, loading: false, error: null, user: action.payload };
      case LOGOUT:
        return initialState;

      case LOGIN_USER_FAILURE:
      case REGISTER_USER_FAILURE:
      case GET_USER_PROFILE_FAILURE:
      case LOGIN_GOOGLE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
}
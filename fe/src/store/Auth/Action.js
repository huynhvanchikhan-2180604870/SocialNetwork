import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import {
  FIND_USER_BY_ID_FAILURE,
  FIND_USER_BY_ID_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_GOOGLE_FAILURE,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, loginData);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

export const register = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/register`,
      registerData
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const logout = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {}, // Body trống vì không cần gửi dữ liệu
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (data) {
      localStorage.removeItem("jwt");
      dispatch({ type: LOGOUT, payload: data });
    }
  } catch (error) {
    dispatch({ type: LOGOUT, payload: null });
  }
};

export const loginGoole = (token) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/google`, token);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: LOGIN_GOOGLE_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: LOGIN_GOOGLE_FAILURE, payload: error.message });
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);

    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

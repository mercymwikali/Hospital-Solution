import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstants";



const API = "https://hospital-solution-server.vercel.app/"
console.log("Base URL: ", API)

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${API}auth/login`,
        { email, password },
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data)); // This persists the token
      console.log(data);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
  
      dispatch({ type: USER_LOGIN_FAIL, payload: errorMessage });
    }
  };
  
  export const logout = (userId) => (dispatch, getState) => {
    try {
      const {userLogin: {userInfo}} = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        withCredentials: true,
      };
      axios.post(`${API}auth/logout`, {userId}, config);
      localStorage.removeItem("userInfo");
      dispatch({ type: USER_LOGOUT });
      console.log("logged out");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
  
      console.log(error);
    }
  };
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      console.log('Dispatch USER_REGISTER_REQUEST');
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
  
      const { data } = await axios.post(`${API}auth/register`, userData, config);
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      console.log('Dispatch USER_REGISTER_SUCCESS', data);
      message.success(data.message, 5);
  
      localStorage.setItem('userInfo', JSON.stringify(data)); // This persists the token
  
      return data.userId; // Return the user ID
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
  
      dispatch({ type: USER_REGISTER_FAIL, payload: errorMessage });
      console.log('Dispatch USER_REGISTER_FAIL', errorMessage);
  
      message.error(error.response.data.message, 5);
    }
  };

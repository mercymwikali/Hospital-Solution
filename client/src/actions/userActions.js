import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, OTP_VERIFY_REQUEST, OTP_VERIFY_SUCCESS, OTP_VERIFY_FAIL, FORGOT_PWD_REQUEST, FORGOT_PWD_SUCCESS, FORGOT_PWD_FAIL, RESET_PWD_REQUEST, RESET_PWD_SUCCESS, RESET_PWD_FAIL } from "../constants/userConstants";



const API = "http://217.21.122.62:8085/"
console.log("Base URL: ", API)

export const login = (staffNo, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${API}Authentication/Login`,
      { staffNo, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (errors) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errors.response?.data?.message || errors.message,
    });
  }
};

// Verify OTP action
export const verifyOtp = (staffNo, otpCode, sessionToken) => async (dispatch) => {
  try {
    dispatch({ type: OTP_VERIFY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "staffNo": staffNo, // Add staffNo as a custom header
        "sessionToken": sessionToken, // Add sessionToken as a Bearer token
      },
    };

    const { data } = await axios.post(
      `${API}Authentication/OTPLogin`,
      { otpCode },
      config
    );

    dispatch({ type: OTP_VERIFY_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: OTP_VERIFY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  try {
    // Clear user data from localStorage
    localStorage.removeItem("userInfo");

    // Dispatch logout action to update state
    dispatch({ type: USER_LOGOUT });

    console.log("logged out");
  } catch (error) {
    console.log("Error during logout:", error);
  }
};


//forgot password
export const forgotPassword = (staffNo) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PWD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${API}Authentication/ForgotPassword`,
      { staffNo },
      config
    );

    dispatch({ type: FORGOT_PWD_SUCCESS, payload: data });
  } catch (errors) {
    dispatch({
      type: FORGOT_PWD_FAIL,
      payload: errors.response?.data?.message || errors.message,
    });
  }
}

//reset password
export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PWD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${API}Authentication/ResetPassword`,
      { staffNo, password },
      config
    );

    dispatch({ type: RESET_PWD_SUCCESS, payload: data });
  } catch (errors) {
    dispatch({
      type:RESET_PWD_FAIL,
      payload: errors.response?.data?.message || errors.message,
    });
  }
}

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

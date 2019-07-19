import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, CLEAR_CURRENT_USER, GET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loginUser = (formValues, history) => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/users/login",
    data: formValues,
    mode: "no-cors"
  })
    .then(response => {
      //Get token from response
      const token = response.data.token;

      //Write token to local storage
      localStorage.setItem("token", token);

      //Setup axios default
      setAuthToken(token);

      //Decode token
      const decoded = jwt_decode(token);

      //Set current user
      dispatch({ type: SET_CURRENT_USER, payload: decoded });

      //Redirect
      history.push("/");
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  setAuthToken(false);
  return {
    type: CLEAR_CURRENT_USER
  };
};

export const registerUser = (formValues, history) => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/users/register",
    data: formValues,
    mode: "no-cors"
  })
    .then(response => history.push("/login"))
    .catch(error => {
      console.log(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    });
};

import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//loadUser

export const loadUser = () => async dispatch => {
  // console.log("load user -- auth token", localStorage.token);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log("Error", error);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//register user

export const register = ({ name, email, password }) => async dispatch => {
  //   console.log(name, email, password);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    console.log("response", res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.log("error", error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(element => {
        console.log(element);
        dispatch(setAlert(element.msg, "danger", 5000));
      });
    }
    dispatch({
      type: REGISTER_FAILED
    });
  }
};

//login user

export const login = (email, password) => async dispatch => {
  //   console.log(name, email, password);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    console.log("response", res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    console.log("error", error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(element => {
        console.log(element);
        dispatch(setAlert(element.msg, "danger", 5000));
      });
    }
    dispatch({
      type: LOGIN_FAILED
    });
  }
};

//logout

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

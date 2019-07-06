import axios from "axios";
import {
  POST_ERROR,
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST
} from "./types";
import { setAlert } from "./alert";

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPost = id => async dispatch => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.reponse.statusText, status: err.response.status }
    });
  }
};

export const deletePost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    dispatch(setAlert("Post Removed!", "success", 3000));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.reponse.statusText, status: err.response.status }
    });
  }
};

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/posts/`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert("Post Added!", "success", 3000));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.reponse.statusText, status: err.response.status }
    });
  }
};

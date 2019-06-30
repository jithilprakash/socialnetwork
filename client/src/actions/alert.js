import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType,timeout) => dispatch => {
  try {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { id, msg, alertType }
    });

    setInterval(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, timeout);
  } catch (error) {
    console.log(error.message);
  }
};

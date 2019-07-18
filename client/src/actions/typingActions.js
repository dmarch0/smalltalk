import { SET_TYPING, CLEAR_TYPING } from "./types";

export const setTyping = username => (dispatch, getState) => {
  //const socket = getState().messages.socket;
  if (getState().typing[username]) {
    clearTimeout(getState().typing[username]);
  }
  const timeoutID = setTimeout(() => {
    dispatch(clearTyping(username));
  }, 3000);
  dispatch({ type: SET_TYPING, payload: { username, timeoutID } });
};

export const clearTyping = username => (dispatch, getState) => {
  dispatch({ type: CLEAR_TYPING, payload: username });
};

import io from "socket.io-client";
import { ADD_MESSAGE, SET_SOCKET } from "./types";

export const sendMessage = text => (dispatch, getState) => {
  const username = getState().auth.user.username;
  const message = { text, username, date: Date.now() };
  const socket = getState().messages.socket;
  socket.emit("message", message);
};

export const addMessage = message => {
  console.log(message);
  return { type: ADD_MESSAGE, payload: message };
};

export const setSocket = socket => {
  return { type: SET_SOCKET, payload: socket };
};

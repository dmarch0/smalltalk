import { ADD_USER, REMOVE_USER, SET_INIT_USERS } from "./types";

export const addUser = username => {
  return { type: ADD_USER, payload: username };
};

export const removeUser = username => {
  return { type: REMOVE_USER, payload: username };
};

export const setInitUsers = users => {
  return { type: SET_INIT_USERS, payload: users };
};

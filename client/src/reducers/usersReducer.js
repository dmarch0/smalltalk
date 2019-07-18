import { ADD_USER, REMOVE_USER, SET_INIT_USERS } from "../actions/types";

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    case REMOVE_USER:
      return state.filter(username => username !== action.payload);
    case SET_INIT_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;

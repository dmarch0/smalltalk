import { GET_ERRORS, SET_TYPING, CLEAR_TYPING } from "../actions/types";

const initialState = {};

const typingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPING:
      return { ...state, [action.payload.username]: action.payload.timeoutID };
    case CLEAR_TYPING:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default typingReducer;

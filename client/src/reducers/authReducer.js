import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../actions/types";

const initialState = { isAuthenticated: false, user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { isAuthenticated: true, user: action.payload };
    case CLEAR_CURRENT_USER:
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;

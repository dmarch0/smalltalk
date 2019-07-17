import { ADD_MESSAGE, SET_SOCKET } from "../actions/types";

const initialState = { socket: null, messages: [] };

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const newMessages = [...state.messages];
      newMessages.push(action.payload);
      return { ...state, messages: newMessages };
    case SET_SOCKET:
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};

export default messagesReducer;

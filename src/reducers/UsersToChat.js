import {
  SET_USERS_TO_CHAT_LIST,
  CLEAR_USERS_TO_CHAT_LIST,
} from "../actions/types";

const usersToChat = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS_TO_CHAT_LIST: {
      return {
        usersToChat: payload,
      };
    }
    case CLEAR_USERS_TO_CHAT_LIST: {
      return {
        teachers: [],
      };
    }
    default:
      return state;
  }
};
export default usersToChat;

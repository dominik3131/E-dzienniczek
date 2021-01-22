import { SET_TEACHERS_LIST, CLEAR_TEACHERS_LIST } from "../actions/types";

const messagesReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TEACHERS_LIST: {
      return {
        teachers: payload,
      };
    }
    case CLEAR_TEACHERS_LIST: {
      return {
        teachers: [],
      };
    }
    default:
      return state;
  }
};
export default messagesReducer;

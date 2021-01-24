import { SET_USERS_TO_CHAT_LIST, CLEAR_USERS_TO_CHAT_LIST } from "./types";

export const setUsersToChatList = (payload) => ({
  type: SET_USERS_TO_CHAT_LIST,
  payload: payload,
});
export const clearUsersToChatList = () => ({
  type: CLEAR_USERS_TO_CHAT_LIST,
});

import { combineReducers } from "redux";
import auth from "./auth";
import logInMessage from "./logInMessage";
import ReceivedMessages from "./ReceivedMessages";
import SentMessages from "./SentMessages";
import UsersToChat from "./UsersToChat";
import user from "./user";

const appReducer = combineReducers({
  auth,
  logInMessage,
  ReceivedMessages,
  SentMessages,
  UsersToChat,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") state = undefined;
  return appReducer(state, action);
};

export default rootReducer;

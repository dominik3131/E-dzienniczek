import { combineReducers } from "redux";
import auth from "./auth";
import logInMessage from "./logInMessage";
import ReceivedMessages from "./ReceivedMessages";
import SentMessages from "./SentMessages";
import user from "./user";

export default combineReducers({
  auth,
  logInMessage,
  ReceivedMessages,
  SentMessages,
  user
});

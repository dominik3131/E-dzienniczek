import { combineReducers } from "redux";
import auth from "./auth";
import logInMessage from "./logInMessage";
import ReceivedMessages from "./ReceivedMessages";
import SentMessages from "./SentMessages";
import TeachersList from "./TeachersList";
import user from "./user";

const appReducer = combineReducers({
  auth,
  logInMessage,
  ReceivedMessages,
  SentMessages,
  TeachersList,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") state = undefined;
  return appReducer(state, action);
};

export default rootReducer;

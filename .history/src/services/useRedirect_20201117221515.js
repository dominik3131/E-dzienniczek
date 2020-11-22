import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export const useRedirect = (page) => {
  if (!useSelector((store) => store.auth.isLoggedIn)) {
    return page ? <Redirect to={`/${page}`} /> : <Redirect to="/" />;
  }
};

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export const useRedirect = (page) => {
  debugger;
  if (useSelector((store) => store.auth.isLoggedIn) === false) {
    return <Redirect to="/" />;
  } else return page ? <Redirect to={`/${page}`} /> : <Redirect to="/" />;
};

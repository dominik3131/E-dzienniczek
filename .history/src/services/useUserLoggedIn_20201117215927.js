import { useSelector } from "react-redux";

export const useUserLoggedIn = () =>
  useSelector((store) => store.auth.isLoggedIn);

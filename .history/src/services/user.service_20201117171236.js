import axios from "axios";
import authHeader from "./auth-header";
import serverUrl from "../helpers/routes";

class UserService {
  getPublicContent() {
    return axios.get(serverUrl + "all");
  }

  getStudentsBoard() {
    return axios.get(serverUrl + "user", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(serverUrl + "mod", { headers: authHeader() });
  }

  getTeacherBoard() {
    return axios.get(serverUrl + "admin", { headers: authHeader() });
  }
  getParentBoard() {
    return axios.get(serverUrl + "parent", { headers: authHeader() });
  }
}

export default new UserService();

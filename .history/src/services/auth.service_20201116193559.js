import axios from "axios";
import { loginApiUrl } from "../helpers/routes";

class AuthService {
  login(username, password) {
    debugger;
    return axios
      .post(`${loginApiUrl()}/api/login`, { username, password })
      .then((response) => {
        if (response.data.key) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch((err) => console.log(err));
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();

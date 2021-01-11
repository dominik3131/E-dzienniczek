import axios from "axios";
import { loginApiUrl, logoutApiUrl } from "../helpers/routes";

class AuthService {
  async login(username, password) {
    return await axios
      .post(`${loginApiUrl()}`, { username, password })
      .then((response) => {
        if (response.data.key) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  async logout() {
    return await axios
      .post(`${logoutApiUrl()}`)
      .then((response) => {
        localStorage.removeItem("user");
        return response.data;
      })
  }
}

export default new AuthService();

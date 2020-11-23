import axios from "axios";
import { loginApiUrl } from "../helpers/routes";

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

  logout= () => {
    new Promise(async (resolve, reject) => {
    await localStorage.removeItem("user");
    return Promise.response();
  });
}

export default new AuthService();

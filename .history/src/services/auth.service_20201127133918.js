import axios from "axios";
import { loginApiUrl } from "../helpers/routes";

class AuthService {
  async login(username, password) {
    return await axios

      .post(`localhost:8000/api/students/1`, { username, password })
      .then((response) => {
        if (response.data.key) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();

import axios from "axios";
import authHeader from "../../services/auth-header";

export default axios.create({
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
  withCredentials: true,
});

export const get = async (url) => {
  try {
    const response = await axios
      .get(url, { headers: authHeader() })
      .then((res) => res.data);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};

export const apiCall = async (url, method, body, resolve, reject) => {
  const config = {
    method: method,
    url: url,
    headers: authHeader(),
    data: body,
  };
  try {
    const response = await axios(config).then((res) => res.data);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};

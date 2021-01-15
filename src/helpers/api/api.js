import axios from "axios";
import authHeader from "../../services/auth-header";
import { localServerUrl } from "../routes";

export default axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: "X-CSRFTOKEN",
  withCredentials: true,
})

export const get = async (url) => {
  try {
    const response = await axios.get(url, { headers: authHeader() }).then(res => res.data);
    return response;
  } catch(error) {
    alert("Spróbuj ponownie" + error);
  }
}

export const apiCall = async (url, method, body, resolve, reject) => {
  const config = {
    method: method,
    url: url,
    headers: authHeader(),
    body: JSON.stringify(body)
  };
  try {
    const response = await axios(config);
    return response;
  } catch(error) {
    alert("Spróbuj ponownie" + error);
  }
}
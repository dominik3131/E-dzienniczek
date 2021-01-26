import * as API from "../api/api";

const parentURL = "/api/parents";

export const getParentById = async (id) => {
  try {
    const response = await API.get(`${parentURL}/${id}`);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};

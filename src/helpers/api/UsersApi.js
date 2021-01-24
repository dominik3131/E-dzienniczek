import * as API from "./api";

const usersURL = "/api/users";

export const getUsersForSendMessages = async () => {
  try {
    const response = await API.get(`${usersURL}`);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};

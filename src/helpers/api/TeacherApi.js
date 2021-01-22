import * as API from "../api/api";

const teachersURL = "/api/teachers";

export const getAllTeachers = async () => {
  try {
    const response = await API.get(`${teachersURL}`);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};
export const getTeacherById = async (id) => {
  try {
    const response = await API.get(`${teachersURL}/${id}`);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};

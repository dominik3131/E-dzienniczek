import * as API from "../api/api";

const subjectsURL = "/api/subjects";
const classesURL = "/api/classes";

export const getAllSubjects = async () => {
  try {
    const response = await API.get(subjectsURL);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};

export const getSubjectsOfClass = async (id) => {
  try {
    const response = await API.get(`${classesURL}/${id}/subjects`);
    return response;
  } catch (error) {
    alert("Spróbuj ponownie" + error);
  }
};

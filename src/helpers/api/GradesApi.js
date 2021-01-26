import * as API from "../api/api";

const gradesURL = "/api/grades";

export const sendGradeForStudent = (data) =>
  API.apiCall(`${gradesURL}`, "POST", data);

export const updateGradeForStudent = (id, data) =>
  API.apiCall(`${gradesURL}/${id}`, "PUT", data);

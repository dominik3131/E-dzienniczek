import * as API from "../api/api";

const gradesURL = "/api/grades";

export const sendGradeForStudent = (data) =>
  API.apiCall(`${gradesURL}`, "POST", data);

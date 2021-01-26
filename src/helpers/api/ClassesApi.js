import * as API from "../api/api";

const classesURL = "/api/classes";

export const getStudentsOfClass = (id) =>
  API.get(`${classesURL}/${id}/students`);

import * as API from "../api/api";

const studentURL = "/api/students";

export const getStudentById = (id) => API.get(`${studentURL}/${id}`);

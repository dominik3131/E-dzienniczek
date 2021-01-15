import authHeader from "../../services/auth-header";
import * as API from '../api/api';

const studentURL = "/api/students";

export const getStudentById = async (id) => {
    return API.get(`${studentURL}/${id}`);
}
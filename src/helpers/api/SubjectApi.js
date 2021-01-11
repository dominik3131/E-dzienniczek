import * as API from '../api/api';

const subjectsURL = "/api/subjects";

export const getAllSubjects = async () => {
    try{
        const response = await API.get(subjectsURL);
        return response;
    } catch(error) {
        alert("Spróbuj ponownie" + error);
    }
}
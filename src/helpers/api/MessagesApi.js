import * as API from '../api/api';

const messagesURL = "/api/messages";

export const getAllReceivedMessages = async () => {
    try{
        const response = await API.get(`${messagesURL}/received`);
        return response;
    } catch(error) {
        alert("Spróbuj ponownie" + error);
    }
}
export const getAllSentMessages = async () => {
    try{
        const response = await API.get(`${messagesURL}/sent`);
        return response;
    } catch(error) {
        alert("Spróbuj ponownie" + error);
    }
}
export const changeToReadMessage = async (id) => {
    console.log(id);
    try{
        const response = await API.apiCall(`${messagesURL}/${id}/markAsRead`,'PUT');
        return response;
    } catch(error) {
        alert("Spróbuj ponownie" + error);
    }
}
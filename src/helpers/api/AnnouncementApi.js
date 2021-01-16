import * as API from '../api/api';

const announcementsURL = "/api/announcements";

export const getAllAnnouncements = async () => {
    try{
        const response = await API.get(announcementsURL);
        return response;
    } catch(error) {
        alert("Spróbuj ponownie" + error);
    }
}

export const getLatestAnnouncements = async () => {
    try{
        const response = await API.get(`${announcementsURL}/latest`);
        return response;
    } catch(error) {
        alert("Spróbuj ponownie" + error);
    }
}

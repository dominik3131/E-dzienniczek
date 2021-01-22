import { SAVE_USER_DATA } from "../actions/types";

export const saveUserData = (payload) => ({
    type: SAVE_USER_DATA,
    user: payload
})
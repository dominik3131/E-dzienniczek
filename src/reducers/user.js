import { SAVE_USER_DATA } from "../actions/types";
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    const { type, user } = action;

    switch(type) {
        case SAVE_USER_DATA: return {
            ...state, 
            user: user 
        }
        default:  return state;
    }
}
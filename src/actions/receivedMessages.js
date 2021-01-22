import { SET_RECEIVED_MESSAGES_FOR_ACCOUNT, SET_RECEIVED_MESSAGES_AS_READ, CLEAR_RECEIVED_MESSAGES_FOR_ACCOUNT } from "./types";

export const setReceivedMessagesForAccount = (payload) => ({
    type: SET_RECEIVED_MESSAGES_FOR_ACCOUNT,
    payload: payload
})
export const setReceivedMessageAsRead = (id) => ({
    type: SET_RECEIVED_MESSAGES_AS_READ,
    payload: id
})
export const clearReceivedMessageForAccount = () => ({
    type: CLEAR_RECEIVED_MESSAGES_FOR_ACCOUNT,
})
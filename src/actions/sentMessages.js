import { SET_SENT_MESSAGES_FOR_ACCOUNT, SET_SENT_MESSAGE_AS_READ, CLEAR_SENT_MESSAGES_FOR_ACCOUNT } from "./types";

export const setSentMessagesForAccount = (payload) => ({
    type: SET_SENT_MESSAGES_FOR_ACCOUNT,
    payload: payload
})
export const setSentMessageAsRead = (id) => ({
    type: SET_SENT_MESSAGE_AS_READ,
    payload: id
})
export const clearSentMessageForAccount = () => ({
    type: CLEAR_SENT_MESSAGES_FOR_ACCOUNT,
})
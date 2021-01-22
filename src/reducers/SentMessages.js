import { SET_SENT_MESSAGES_FOR_ACCOUNT, SET_SENT_MESSAGE_AS_READ, CLEAR_SENT_MESSAGES_FOR_ACCOUNT} from "../actions/types";
import update from 'react-addons-update';


const messagesReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_SENT_MESSAGES_FOR_ACCOUNT: {
            return { messages: payload }
        }
        case SET_SENT_MESSAGE_AS_READ: {    
            return update(state, {
               messages: {
                   [payload]: {
                       read: {$set: true}
                   }
               } 
            })
        }
        case CLEAR_SENT_MESSAGES_FOR_ACCOUNT: {
            return { messages: [] }
        }
        default: return state;
    }

}
export default messagesReducer;
import { SET_RECEIVED_MESSAGES_FOR_ACCOUNT, SET_RECEIVED_MESSAGES_AS_READ, CLEAR_RECEIVED_MESSAGES_FOR_ACCOUNT} from "../actions/types";
import update from 'react-addons-update';


const messagesReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_RECEIVED_MESSAGES_FOR_ACCOUNT: {
            return { messages: payload }
        }
        case SET_RECEIVED_MESSAGES_AS_READ: {    
            return update(state, {
               messages: {
                   [payload]: {
                       read: {$set: true}
                   }
               } 
            })
        }
        case CLEAR_RECEIVED_MESSAGES_FOR_ACCOUNT: {
            return { messages: [] }
        }
        default: return state;
    }

}
export default messagesReducer;
import React, {useState } from 'react';
import { getUserType } from "../../helpers/localStorageUserApi";
import Student from "./Accounts/Student";

const Content = () => {
    const [type, setType] = useState(getUserType());
    const showContentForUser = () => {
        switch(type) {
            case "STUDENT": return <Student />;
            default: {}
        }
    }
    return showContentForUser();
}
 
export default Content;
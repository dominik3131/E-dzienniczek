import React, {useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getUserType } from "../../helpers/localStorageUserApi";
import Student from "./Accounts/Student";

const Content = () => {
    const { path, url } = useRouteMatch();
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
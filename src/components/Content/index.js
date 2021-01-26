import React, { useState } from "react";
import { getUserType } from "../../helpers/localStorageUserApi";
import Student from "./Accounts/Student";
import Teacher from "./Accounts/Teacher";
import Admin from "./Accounts/Admin";
import Parent from "./Accounts/Parent";

const Content = () => {
  const [type, setType] = useState(getUserType());
  const showContentForUser = () => {
    switch (type) {
      case "ADMINISTRATOR":
        return <Admin />;
      case "STUDENT":
        return <Student />;
      case "TEACHER":
        return <Teacher />;
      case "PARENT":
        return <Parent />;
      default: {
      }
    }
  };
  return showContentForUser();
};

export default Content;

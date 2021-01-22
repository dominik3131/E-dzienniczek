import React, { useState } from "react";
import { getUserType } from "../../helpers/localStorageUserApi";
import Student from "./Accounts/Student";
import Teacher from "./Accounts/Teacher";

const Content = () => {
  const [type, setType] = useState(getUserType());
  const showContentForUser = () => {
    switch (type) {
      case "STUDENT":
        return <Student />;
      case "TEACHER":
        return <Teacher />;
      default: {
      }
    }
  };
  return showContentForUser();
};

export default Content;

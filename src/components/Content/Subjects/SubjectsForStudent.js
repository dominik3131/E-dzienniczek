import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSubjectsOfClass } from "../../../helpers/api/SubjectApi";
import Subjects from "./Subjects";

const SubjectsFroStudent = () => {
  const userClass = useSelector(
    (state) => state.user.user && state.user.user.details.schoolClass
  );
  const grades = useSelector(
    (state) => state.user.user && state.user.user.details.grades
  );
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSubjectsOfClass(userClass.id);
      setSubjects(response);
    };
    if (userClass) fetchData();
  }, [userClass]);
  return <Subjects subjects={subjects} grades={grades} />;
};

export default SubjectsFroStudent;

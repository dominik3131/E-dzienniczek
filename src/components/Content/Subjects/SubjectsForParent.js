import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSubjectsOfClass } from "../../../helpers/api/SubjectApi";
import { getStudentById } from "../../../helpers/api/StudentApi";
import Subjects from "./Subjects";

const SubjectsForParent = () => {
  const userClass = useSelector(
    (state) => state.user.user && state.user.user.details.children[0]
  );
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const childrenResponse = await getStudentById(userClass.id);
      setGrades(childrenResponse.details.grades);
      const response = await getSubjectsOfClass(
        childrenResponse.details.schoolClass.id
      );
      setSubjects(response);
      console.log(response);
    };
    if (userClass) fetchData();
  }, [userClass]);
  return <Subjects subjects={subjects} grades={grades} />;
};

export default SubjectsForParent;

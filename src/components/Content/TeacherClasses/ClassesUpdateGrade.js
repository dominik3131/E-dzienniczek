import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { getStudentsOfClass } from "../../../helpers/api/ClassesApi";
import { updateGradeForStudent } from "../../../helpers/api/GradesApi";
import { getStudentById } from "../../../helpers/api/StudentApi";
import Button from "@material-ui/core/Button";
import Alert from "../../Alerts/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
}));

const grades = [
  {
    value: 1,
    label: "1(ndst)",
  },
  {
    value: 2,
    label: "2(dop)",
  },
  {
    value: 3,
    label: "3(dst)",
  },
  {
    value: 4,
    label: "4(db)",
  },
  {
    value: 5,
    label: "5(bdb)",
  },
  {
    value: 6,
    label: "6(cel)",
  },
];

const ClassesUpdateGrade = ({ classId, subjectId }) => {
  const classes = useStyles();
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [showDescriptionFlag, setShowDescriptionFlag] = useState(true);
  const [hideFirstRetakeValue, setHideFirstRetakeValue] = useState(true);
  const [studentsList, setStudentsList] = useState([]);
  const [descriptionList, setDescriptionList] = useState([]);
  const [gradeDataToUpdate, setGradeDataToUpdate] = useState({
    idGrade: null,
    value: null,
    firstRetakeValue: null,
    secondRetakeValue: null,
    student: null,
    description: "",
    subject: parseInt(subjectId),
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await getStudentsOfClass(classId);
      setStudentsList(response);
    };
    fetchData();
  }, []);

  const handleChangeValue = (e) => {
    setGradeDataToUpdate({
      ...gradeDataToUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeStudent = (e) => {
    setGradeDataToUpdate({
      ...gradeDataToUpdate,
      [e.target.name]: e.target.value,
    });
    const fetchData = async () => {
      const response = await getStudentById(e.target.value);
      const descriptionArray = response.details.grades.filter(
        ({ subject }) => subject === gradeDataToUpdate.subject
      );
      setDescriptionList(descriptionArray);
      if (descriptionArray.length !== 0) setShowDescriptionFlag(false);
      else setShowDescriptionFlag(true);
    };
    fetchData();
  };
  const handleChangeDescription = (e) => {
    setHideFirstRetakeValue(false);
    const grade = descriptionList.find(({ id }) => id === e.target.value);
    const {
      id,
      value,
      firstRetakeValue,
      secondRetakeValue,
      description,
    } = grade;
    setGradeDataToUpdate({
      ...gradeDataToUpdate,
      [e.target.name]: description,
      idGrade: id,
      value: value,
      firstRetakeValue: firstRetakeValue,
      secondRetakeValue: secondRetakeValue,
    });
    if (!firstRetakeValue) setHideFirstRetakeValue(true);
  };
  const submitSendData = (e) => {
    e.preventDefault();
    const {
      idGrade,
      value,
      student,
      subject,
      description,
      firstRetakeValue,
      secondRetakeValue,
    } = gradeDataToUpdate;
    if (!value || !student || description === "") {
      setOpenAlertError(true);
    } else {
      updateGradeForStudent(idGrade, {
        description,
        value,
        student,
        subject,
        firstRetakeValue,
        secondRetakeValue,
      }).then(() => {
        setOpenAlertSuccess(true);
        setGradeDataToUpdate({
          idGrade: null,
          value: null,
          firstRetakeValue: null,
          secondRetakeValue: null,
          student: null,
          description: "",
          subject: parseInt(subjectId),
        });
      });
    }
  };
  return (
    <>
      <form
        className={classes.root}
        onSubmit={submitSendData}
        autoComplete="off"
      >
        <TextField
          required
          id="standard-disabled"
          name="student"
          select
          label="Uczeń"
          onChange={(e) => handleChangeStudent(e)}
          value={gradeDataToUpdate.student}
        >
          {studentsList &&
            studentsList.map(({ id, first_name, last_name }) => (
              <MenuItem key={id} value={id}>
                {`${first_name} ${last_name}`}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          required
          disabled={showDescriptionFlag}
          id="standard-disabled"
          name="description"
          select
          label="Temat oceny"
          onChange={(e) => handleChangeDescription(e)}
          value={gradeDataToUpdate.description}
        >
          {descriptionList.length !== 0 &&
            descriptionList.map(({ id, description }) => (
              <MenuItem key={id} value={id}>
                {`${description}`}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          required
          disabled
          id="standard-disabled"
          name="value"
          label="Termin I"
          value={gradeDataToUpdate.value}
        />
        <TextField
          required
          disabled={!hideFirstRetakeValue}
          id="standard-disabled"
          name="firstRetakeValue"
          select
          label="Termin II"
          onChange={(e) => handleChangeValue(e)}
          value={gradeDataToUpdate.firstRetakeValue}
        >
          {grades.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {`${label}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          disabled={hideFirstRetakeValue}
          id="standard-disabled"
          name="secondRetakeValue"
          select
          label="Termin III"
          onChange={(e) => handleChangeValue(e)}
          value={gradeDataToUpdate.secondRetakeValue}
        >
          {grades.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {`${label}`}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" type="submit">
          Zatwierdź ocenę
        </Button>
      </form>
      <Alert
        open={openAlertSuccess}
        close={() => setOpenAlertSuccess(false)}
        content="Ocena została wprowadzona pomyślnie!"
        type="success"
      />
      <Alert
        open={openAlertError}
        close={() => setOpenAlertSuccess(false)}
        content="Wystąpił błąd podczas próby wprowadzenia oceny dla ucznia! Sprawdź wprowadzone pola i spróbuj ponownie!"
        type="error"
      />
    </>
  );
};

export default ClassesUpdateGrade;

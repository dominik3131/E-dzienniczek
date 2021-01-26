import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { getStudentsOfClass } from "../../../helpers/api/ClassesApi";
import { sendGradeForStudent } from "../../../helpers/api/GradesApi";
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

const ClassesInsertGrade = ({ classId, subjectId }) => {
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [gradeDataToSend, setGradeDataToSend] = useState({
    value: null,
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
  const classes = useStyles();
  const handleChangeValue = (e) => {
    setGradeDataToSend({
      ...gradeDataToSend,
      [e.target.name]: e.target.value,
    });
  };
  const submitSendData = (e) => {
    e.preventDefault();
    const { value, student, description } = gradeDataToSend;
    if (!value || !student || description === "") {
      setOpenAlertError(true);
    } else {
      console.log(gradeDataToSend);
      sendGradeForStudent(gradeDataToSend).then(() => {
        setOpenAlertSuccess(true);
        setGradeDataToSend({
          value: null,
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
          id="standard-required"
          name="description"
          label="Wprowadź nazwę oceny"
          onChange={(e) => handleChangeValue(e)}
          value={gradeDataToSend.description}
        />
        <TextField
          required
          id="standard-disabled"
          name="student"
          select
          label="Uczeń"
          onChange={(e) => handleChangeValue(e)}
          value={gradeDataToSend.student}
        >
          {studentsList &&
            studentsList.map(({ id, first_name, last_name, email }) => (
              <MenuItem key={id} value={id}>
                {`${first_name} ${last_name}`}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          required
          id="standard-disabled"
          name="value"
          select
          label="Ocena"
          onChange={(e) => handleChangeValue(e)}
          value={gradeDataToSend.value}
        >
          {grades.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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

export default ClassesInsertGrade;

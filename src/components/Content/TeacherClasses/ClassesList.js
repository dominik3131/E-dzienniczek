import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getStudentsOfClass } from "../../../helpers/api/ClassesApi";
import { getStudentById } from "../../../helpers/api/StudentApi";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
  table: {
    minWidth: 650,
  },
}));

const ClassesList = ({ classId, subjectId }) => {
  const classes = useStyles();
  const [studentsList, setStudentsList] = useState([]);
  const [chooseStudent, setChooseStudent] = useState("");
  const [singleStudentData, setSingleStudentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getStudentsOfClass(classId);
      setStudentsList(response);
    };
    fetchData();
  }, []);
  const handleChangeValue = (e) => {
    setChooseStudent(e.target.value);
    const fetchData = async () => {
      const response = await getStudentById(e.target.value);
      const subjectGrades = response.details.grades.filter(
        ({ subject }) => subject === parseInt(subjectId)
      );
      console.log(subjectGrades);
      setSingleStudentData(subjectGrades);
    };
    fetchData();
  };
  return (
    <div className={classes.root}>
      <TextField
        required
        id="standard-disabled"
        name="student"
        select
        label="Uczeń"
        onChange={(e) => handleChangeValue(e)}
        value={chooseStudent}
      >
        {studentsList &&
          studentsList.map(({ id, first_name, last_name, email }) => (
            <MenuItem key={id} value={id}>
              {`${first_name} ${last_name}`}
            </MenuItem>
          ))}
      </TextField>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tytuł oceny</TableCell>
              <TableCell align="right">Termin I</TableCell>
              <TableCell align="right">Termin II</TableCell>
              <TableCell align="right">Termin III</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {singleStudentData.length !== 0 ? (
              singleStudentData.map(
                ({
                  id,
                  description,
                  firstRetakeValue,
                  secondRetakeValue,
                  value,
                }) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {description}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                    <TableCell align="right">
                      {firstRetakeValue ? firstRetakeValue : "<brak>"}
                    </TableCell>
                    <TableCell align="right">
                      {secondRetakeValue ? secondRetakeValue : "<brak>"}
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <div>Brak ocen dla użytkownika!</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClassesList;

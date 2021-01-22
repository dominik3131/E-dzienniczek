import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../../../styles/subjects';
import { getSubjectsOfClass } from '../../../helpers/api/SubjectApi';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Subjects = () => {
  const classes = useStyles();
  const userClass = useSelector(state => state.user.user &&  state.user.user.details.schoolClass.id);
  const grades = useSelector(state => state.user.user &&  state.user.user.details.grades);
  const [subjects, setSubjects] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        const response = await getSubjectsOfClass(userClass);
        setSubjects(response);
     }
     if(userClass) fetchData();
  }, [userClass])

  return (
    <div className={classes.root}>
      {subjects.map(({title, id}) => {
        const filteredGrades = grades.filter(({subject}) => id === subject);
      return (
      <Accordion key={id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={title}
          id="panel1a-header"
        >
          <Typography className={classes.heading} variant="subtitle1"><strong>{title}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tytuł oceny</TableCell>
                  <TableCell align="right">Termin nr 1</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {filteredGrades.length !== 0 ? filteredGrades.map(({id: key, description, value, subject}) => {
                if(id === subject) {
                  return(
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {description}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                  </TableRow>
                  )
                }
              }): <TableCell align="right">Brak ocen dla tego przedmiotu!</TableCell>}
              </TableBody>
            </Table>    
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      )})}
    </div>
  );
}

export default Subjects;
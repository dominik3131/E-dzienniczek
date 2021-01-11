import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../../../styles/subjects';
import { getAllSubjects } from '../../../helpers/api/SubjectApi';

const Subjects = () => {
  const classes = useStyles();
  const userClass = useSelector(state => state.user.user.details.schoolClass.id);
  const [subjects, setSubjects] = useState({});

  const filterSubjectsByUserClass = (table, num) => 
    {
      console.log(table);
      // table.map(el => console.log(el.schoolClass));
      // const result = table.filter(el => el.schoolClass == num);
    }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllSubjects();
      setSubjects(response);
     }
     fetchData();
  }, [])
  
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}

export default Subjects;
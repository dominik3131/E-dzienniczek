import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles } from "../../../styles/subjects";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Subjects = ({ subjects, grades }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {subjects.length !== 0 ? (
        subjects.map(({ title, id }) => {
          const filteredGrades = grades.filter(({ subject }) => id === subject);
          return (
            <Accordion key={id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={title}
                id="panel1a-header"
              >
                <Typography className={classes.heading} variant="subtitle1">
                  <strong>{title}</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tytuł oceny</TableCell>
                        <TableCell align="right">Termin nr 1</TableCell>
                        <TableCell align="right">Termin nr 2</TableCell>
                        <TableCell align="right">Termin nr 3</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredGrades.length !== 0 ? (
                        filteredGrades.map(
                          ({
                            id: key,
                            description,
                            value,
                            firstRetakeValue,
                            secondRetakeValue,
                            subject,
                          }) => {
                            if (id === subject) {
                              return (
                                <TableRow key={key}>
                                  <TableCell component="th" scope="row">
                                    {description}
                                  </TableCell>
                                  <TableCell align="right">
                                    {value ? (
                                      value === 1 ? (
                                        <span style={{ color: "red" }}>
                                          {value}
                                        </span>
                                      ) : (
                                        <span>{value}</span>
                                      )
                                    ) : (
                                      `<brak>`
                                    )}
                                  </TableCell>
                                  <TableCell align="right">
                                    {firstRetakeValue ? (
                                      firstRetakeValue === 1 ? (
                                        <span style={{ color: "red" }}>
                                          {firstRetakeValue}
                                        </span>
                                      ) : (
                                        <span>{firstRetakeValue}</span>
                                      )
                                    ) : (
                                      `<brak>`
                                    )}
                                  </TableCell>
                                  <TableCell align="right">
                                    {secondRetakeValue ? (
                                      secondRetakeValue === 1 ? (
                                        <span style={{ color: "red" }}>
                                          {secondRetakeValue}
                                        </span>
                                      ) : (
                                        <span>{secondRetakeValue}</span>
                                      )
                                    ) : (
                                      `<brak>`
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          }
                        )
                      ) : (
                        <TableCell align="right">
                          Brak ocen dla tego przedmiotu!
                        </TableCell>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <div>
          Nie znaleziono przedmiotów! Skontaktuj się z administratorem strony w
          celu weryfikacji przynależności do klasy!
        </div>
      )}
    </div>
  );
};

export default Subjects;

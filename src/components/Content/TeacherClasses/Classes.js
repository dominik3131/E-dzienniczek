import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Classes = () => {
  const { path } = useRouteMatch();
  const classes = useStyles();
  const teacherSubjects = useSelector(
    (state) => state.user.user && state.user.user.details.subjects
  );
  return (
    <Grid item xs={12}>
      {teacherSubjects &&
        teacherSubjects.map(({ id, title, schoolClass }) => (
          <List key={id} className={classes.root} aria-label="contacts">
            <ListItem
              button
              component={Link}
              to={`${path}/${schoolClass}/${id}`}
            >
              <ListItemText primary={title} />
            </ListItem>
            <Divider />
          </List>
        ))}
    </Grid>
  );
};

export default Classes;

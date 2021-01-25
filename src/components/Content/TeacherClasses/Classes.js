import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Classes = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem button>
          <ListItemText primary="Chelsea Otakan" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Eric Hoffman" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default Classes;

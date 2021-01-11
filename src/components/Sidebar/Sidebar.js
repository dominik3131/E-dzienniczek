import React from 'react';
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "../../styles/userPanel";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import { Link, useRouteMatch } from 'react-router-dom';

const Sidebar = (props) => {
    const { url } = useRouteMatch();
    const classes = useStyles();
    const theme = useTheme();
    const { open, drawerState, positions} = props;
    return ( 
        <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={drawerState}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {positions.map((text, index) => (
              <ListItem button key={text.title}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <Link to={`${url}${text.url}`}>
                  <ListItemText primary={text.title} />
                </Link>                  
              </ListItem>
          ))}
        </List>
      </Drawer>
     );
}
 
export default Sidebar;
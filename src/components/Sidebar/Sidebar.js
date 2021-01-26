import React, { useState } from 'react';
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
import GroupIcon from '@material-ui/icons/Group';
import SendIcon from '@material-ui/icons/Send';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import { Link, useRouteMatch } from 'react-router-dom';
import { Send } from '@material-ui/icons';
import ForumIcon from '@material-ui/icons/Forum';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CreateIcon from '@material-ui/icons/Create';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ClassIcon from '@material-ui/icons/Class';
import SubjectIcon from '@material-ui/icons/Subject';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
const Sidebar = (props) => {
  const { url } = useRouteMatch();
  const classes = useStyles();
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const { open, drawerState, positions } = props;

  const handleShow = () => setShow(!show);

  const icon = (iconType) => {
    let iconComp = null;
    if (iconType === 'users') {
      iconComp = <GroupIcon></GroupIcon>
    } else if (iconType === 'sentMsg') {
      iconComp = <Send></Send>
    } else if (iconType === 'messages') {
      iconComp = <ForumIcon></ForumIcon>
    } else if (iconType === 'receivedMsg') {
      iconComp = <ChatBubbleIcon></ChatBubbleIcon>
    } else if (iconType === 'newMsg') {
      iconComp = <CreateIcon></CreateIcon>
    } else if (iconType === 'announcements') {
      iconComp = <NotificationImportantIcon></NotificationImportantIcon>
    } else if (iconType === 'announcementCreate') {
      iconComp = <AddAlertIcon></AddAlertIcon>
    } else if (iconType === 'classes') {
      iconComp = <ClassIcon></ClassIcon>
    } else if (iconType === 'subjects') {
      iconComp = <SubjectIcon></SubjectIcon>
    } else if (iconType === 'usersCreate') {
      iconComp = <GroupAddIcon></GroupAddIcon>
    } 

    return iconComp;
  }
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
          <React.Fragment key={text.title}>
            <ListItem button component={Link} to={!text.submenu && `${url}${text.url}`} onClick={text.submenu && handleShow}>
              <ListItemIcon>
                {icon(text.icon)}
              </ListItemIcon>
              <ListItemText primary={text.title} />
              {text.submenu && (show ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {text.submenu &&
              <Collapse in={show} timeout="auto" unmountOnExit>
                {text.submenu.map((suboption, index) =>
                  <List button component={Link} to={`${url}${suboption.url}`} key={index} disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                      {icon(suboption.icon)}
                      </ListItemIcon>
                      <ListItemText primary={suboption.title} />
                    </ListItem>
                  </List>
                )}
              </Collapse>
            }
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
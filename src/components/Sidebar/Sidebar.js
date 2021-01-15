import React,  {useState} from 'react';
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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import { Link, useRouteMatch } from 'react-router-dom';

const Sidebar = (props) => {
    const { url } = useRouteMatch();
    const classes = useStyles();
    const theme = useTheme();
    const [show, setShow] = useState(false);
    const { open, drawerState, positions} = props;

    const handleShow = () => setShow(!show);
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
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.title} />
                  {text.submenu && (show ? <ExpandLess /> : <ExpandMore />)}    
              </ListItem>
              {text.submenu && 
                <Collapse in={show} timeout="auto" unmountOnExit>
                  {text.submenu.map((suboption, index) =>
                    <List component="div" key={index} disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={text.submenu[index]} />
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
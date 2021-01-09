import React from 'react';
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import readingBook from "../../assets/reading-book.png";
import { useStyles } from "../../styles/userPanel";
import Typography from "@material-ui/core/Typography";

const Navbar = (props) => {
    const classes = useStyles();
    const { open, drawerState, logout } = props;
    return ( 
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerState}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.h4}>
            <img src={readingBook} alt="logo" width="50" />
            E-dzienniczek
          </Typography>
          <div className={classes.grow} />
          <Button color="inherit" onClick={logout}>
            Wyloguj się
          </Button>
        </Toolbar>
      </AppBar>
     );
}
 
export default Navbar;
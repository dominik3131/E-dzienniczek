import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../actions/auth";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Content from "../../../components/Content";
import { useStyles } from "../../../styles/userPanel";
import useBuildUserPanel from "../../../hooks/useBuildUserPanel";

export default function MiniDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { userMenuPositions } = useBuildUserPanel({});

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const logOut = () => {
    dispatch(logout());
    history.push("/users");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar open={open} drawerState={handleDrawerOpen} logout={logOut} />
      <Sidebar
        open={open}
        drawerState={handleDrawerOpen}
        positions={userMenuPositions}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <Content />
        </Typography>
      </main>
    </div>
  );
}

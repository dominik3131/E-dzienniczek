import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../actions/auth";
import { saveUserData } from "../../../actions/user";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Content from "../../../components/Content";
import { useStyles } from "../../../styles/userPanel";
import {getUserType} from "../../../helpers/localStorageUserApi";
import { getStudentById } from '../../../helpers/api/StudentApi';
import { getUserId } from "../../../helpers/localStorageUserApi";


export default function MiniDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();  
  const [open, setOpen] = useState(false);
  const [userMenuPositions, setUserMenuPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     const response = await getStudentById(getUserId())
     dispatch(saveUserData(response));
    }
    fetchData();
  }, [])

  useEffect(() => {
    const type = getUserType();
    switch(type) {
      case "ADMINISTRATOR": {break;}
      case "STUDENT": {
        const sidebarMenu = [
          {title: "Przedmioty i oceny", url: "/subjects"},
          {title: "Ankiety", url: "/polls"},
          {title: "Ogłoszenia", url: "/announcements"},
          {
            title: "Wiadomości", 
            url: "/messages",
            submenu: ["Nowa wiadomość", "Wysłane", "Odebrane"]
          }
        ];
        setUserMenuPositions(sidebarMenu);
        break;
      }
      default: {};
    }
  }, [])

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
      <Navbar open={open} drawerState={handleDrawerOpen} logout={logOut}/>
      <Sidebar open={open} drawerState={handleDrawerOpen} positions={userMenuPositions}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <Content />
        </Typography>
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </main>
    </div>
  );
}

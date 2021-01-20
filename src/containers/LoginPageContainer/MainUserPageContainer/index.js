import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../actions/auth";
import { saveUserData } from "../../../actions/user";
import { setReceivedMessagesForAccount } from "../../../actions/receivedMessages";
import { setSentMessagesForAccount } from "../../../actions/sentMessages"
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Content from "../../../components/Content";
import { useStyles } from "../../../styles/userPanel";
import {getUserType} from "../../../helpers/localStorageUserApi";
import { getStudentById } from '../../../helpers/api/StudentApi';
import { getUserId } from "../../../helpers/localStorageUserApi";
import { getAllReceivedMessages, getAllSentMessages } from "../../../helpers/api/MessagesApi";


export default function MiniDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();  
  const [open, setOpen] = useState(false);
  const [userMenuPositions, setUserMenuPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     const userDataResponse = await getStudentById(getUserId());
     const ReceivedMessagesResponse = await getAllReceivedMessages();
     const sentMessagesForAccount = await getAllSentMessages();
     dispatch(saveUserData(userDataResponse));
     dispatch(setReceivedMessagesForAccount(ReceivedMessagesResponse));
     dispatch(setSentMessagesForAccount(sentMessagesForAccount));
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
            submenu: [
              {title: "Nowa wiadomość", url: "/messages/new"}, 
              {title:"Wysłane", url:"/messages/sent"}, 
              {title: "Odebrane", url:"/messages/received"}
            ]
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
      </main>
    </div>
  );
}

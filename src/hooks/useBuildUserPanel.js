import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserType } from "../helpers/localStorageUserApi";
import { getTeacherById } from "../helpers/api/TeacherApi";
import { getParentById } from "../helpers/api/ParentApi";
import { getUsersForSendMessages } from "../helpers/api/UsersApi";
import { setUsersToChatList } from "../actions/usersToChat";
import { saveUserData } from "../actions/user";
import { setReceivedMessagesForAccount } from "../actions/receivedMessages";
import { setSentMessagesForAccount } from "../actions/sentMessages";
import { getStudentById } from "../helpers/api/StudentApi";
import {
  getAllReceivedMessages,
  getAllSentMessages,
} from "../helpers/api/MessagesApi";
import { getUserId } from "../helpers/localStorageUserApi";

const fetchData = async (getUserById, dispatch) => {
  const userDataResponse = await getUserById(getUserId());
  const ReceivedMessagesResponse = await getAllReceivedMessages();
  const sentMessagesForAccount = await getAllSentMessages();
  const personsForMessage = await getUsersForSendMessages();

  dispatch(saveUserData(userDataResponse));
  dispatch(setReceivedMessagesForAccount(ReceivedMessagesResponse));
  dispatch(setSentMessagesForAccount(sentMessagesForAccount));
  dispatch(setUsersToChatList(personsForMessage));
};

const useBuildUserPanel = () => {
  const [userMenuPositions, setUserMenuPositions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let sidebarMenu = [];
    const type = getUserType();
    switch (type) {
      case "ADMINISTRATOR": {
        sidebarMenu = [
          { title: "Dodaj użytkownika", url: "/users/create", icon: 'usersCreate' },
          {
            title: "Wiadomości",
            url: "/messages",
            icon: "messages",
            submenu: [
              { title: "Nowa wiadomość", url: "/messages/new", icon: 'newMsg' },
              { title: "Wysłane", url: "/messages/sent", icon: 'sentMsg' },
              { title: "Odebrane", url: "/messages/received", icon: 'receivedMsg' },
            ],
          },
        ];
        break;
      }
      case "TEACHER": {
        sidebarMenu = [
          { title: "Twoje klasy", url: "/class", icon: 'classes' },
          { title: "Ogłoszenia", url: "/announcements", icon: 'announcements' },
          { title: "Nadaj ogłoszenie", url: "/announcements/create", icon: 'announcementCreate' },
          { title: "Dodaj użytkownika", url: "/users/create", icon: 'usersCreate' },
          {
            title: "Wiadomości",
            url: "/messages",
            icon: "messages",
            submenu: [
              { title: "Nowa wiadomość", url: "/messages/new", icon: 'newMsg' },
              { title: "Wysłane", url: "/messages/sent", icon: 'sentMsg' },
              { title: "Odebrane", url: "/messages/received", icon: 'receivedMsg' },
            ],
          },
        ];
        fetchData(getTeacherById, dispatch);
        break;
      }
      case "STUDENT": {
        sidebarMenu = [
          { title: "Przedmioty i oceny", url: "/subjects", icon: 'subjects' },
          { title: "Ogłoszenia", url: "/announcements", icon: 'announcements' },
          {
            title: "Wiadomości",
            url: "/messages",
            icon: "messages",
            submenu: [
              { title: "Nowa wiadomość", url: "/messages/new", icon: 'newMsg' },
              { title: "Wysłane", url: "/messages/sent", icon: 'sentMsg' },
              { title: "Odebrane", url: "/messages/received", icon: 'receivedMsg' },
            ],
          },
        ];
        fetchData(getStudentById, dispatch);
        break;
      }
      case "PARENT": {
        sidebarMenu = [
          { title: "Przedmioty i oceny", url: "/subjects", icon: 'subjects' },
          { title: "Ogłoszenia", url: "/announcements", icon: 'announcements' },
          {
            title: "Wiadomości",
            url: "/messages",
            submenu: [
              { title: "Nowa wiadomość", url: "/messages/new", icon: 'newMsg' },
              { title: "Wysłane", url: "/messages/sent", icon: 'sentMsg' },
              { title: "Odebrane", url: "/messages/received", icon: 'receivedMsg' },
            ],
          },
        ];
        fetchData(getParentById, dispatch);
        break;
      }

      default: {
      }
    }
    setUserMenuPositions(sidebarMenu);
  }, []);
  return { userMenuPositions };
};

export default useBuildUserPanel;

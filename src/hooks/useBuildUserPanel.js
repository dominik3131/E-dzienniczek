import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserType } from "../helpers/localStorageUserApi";
import { getAllTeachers, getTeacherById } from "../helpers/api/TeacherApi";
import { setTeachersList } from "../actions/teachers";
import { saveUserData } from "../actions/user";
import { setReceivedMessagesForAccount } from "../actions/receivedMessages";
import { setSentMessagesForAccount } from "../actions/sentMessages";
import { getStudentById } from "../helpers/api/StudentApi";
import {
  getAllReceivedMessages,
  getAllSentMessages,
} from "../helpers/api/MessagesApi";
import { getUserId } from "../helpers/localStorageUserApi";

const fetchData = async (getUserById, getPresonsForSendMessages, dispatch) => {
  const userDataResponse = await getUserById(getUserId());
  const ReceivedMessagesResponse = await getAllReceivedMessages();
  const sentMessagesForAccount = await getAllSentMessages();
  const personsForMessage = await getPresonsForSendMessages();

  dispatch(saveUserData(userDataResponse));
  dispatch(setReceivedMessagesForAccount(ReceivedMessagesResponse));
  dispatch(setSentMessagesForAccount(sentMessagesForAccount));
  dispatch(setTeachersList(personsForMessage));
};

const useBuildUserPanel = () => {
  const [userMenuPositions, setUserMenuPositions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let sidebarMenu = [];
    const type = getUserType();
    switch (type) {
      case "ADMINISTRATOR": {
        break;
      }
      case "TEACHER": {
        sidebarMenu = [
          { title: "Twoje klasy", url: "/class" },
          { title: "Ankiety", url: "/polls" },
          { title: "Nadaj ogłoszenie", url: "/announcements/create" },
          {
            title: "Wiadomości",
            url: "/messages",
            submenu: [
              { title: "Nowa wiadomość", url: "/messages/new" },
              { title: "Wysłane", url: "/messages/sent" },
              { title: "Odebrane", url: "/messages/received" },
            ],
          },
        ];
        fetchData(getTeacherById, getAllTeachers, dispatch);
        break;
      }
      case "STUDENT": {
        sidebarMenu = [
          { title: "Przedmioty i oceny", url: "/subjects" },
          { title: "Ankiety", url: "/polls" },
          { title: "Ogłoszenia", url: "/announcements" },
          {
            title: "Wiadomości",
            url: "/messages",
            submenu: [
              { title: "Nowa wiadomość", url: "/messages/new" },
              { title: "Wysłane", url: "/messages/sent" },
              { title: "Odebrane", url: "/messages/received" },
            ],
          },
        ];
        fetchData(getStudentById, getAllTeachers, dispatch);
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

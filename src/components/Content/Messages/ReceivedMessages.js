import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReceivedMessageAsRead } from "../../../actions/receivedMessages";
import { changeToReadMessage } from "../../../helpers/api/MessagesApi";
import ShowAllMessages from "./ShowAllMessages";

export default function ReceivedMessages({ match }) {
  const messages = useSelector((state) => state.ReceivedMessages.messages);
  const dispatch = useDispatch();

  const handleUnreadMessageClick = (e, id) => {
    const messageToChangeRead = messages.findIndex((el) => el.id === id);
    if (!messages[messageToChangeRead].read) {
      changeToReadMessage(id);
      dispatch(setReceivedMessageAsRead(messageToChangeRead));
    }
  };

  return (
    <ShowAllMessages
      messages={messages}
      handleUnreadMessageClick={handleUnreadMessageClick}
      match={match}
      isReceived={true}
    />
  );
}

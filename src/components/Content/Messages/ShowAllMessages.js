import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  listItemUnread: {
    fontWeight: "bold",
  },
  listItemRead: {
    fontWeight: "normal",
  },
}));

export default function ShowAllMessages({
  match,
  messages,
  handleUnreadMessageClick,
  isReceived,
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  return (
    <List dense className={classes.root}>
      {messages.length !== 0 ? (
        messages.map(({ id, title, date, read, sender, receiver }) => {
          const labelId = `checkbox-list-secondary-label-${id}`;
          let thisDate = new Date(date);
          const timeNow = new Date();
          thisDate =
            timeNow.getDate() === thisDate.getDate() &&
            timeNow.getMonth() === thisDate.getMonth() &&
            timeNow.getFullYear() === thisDate.getFullYear()
              ? `${
                  thisDate.getHours() > 9
                    ? thisDate.getHours()
                    : `0${thisDate.getHours()}`
                }:${
                  thisDate.getMinutes() > 9
                    ? thisDate.getMinutes()
                    : `0${thisDate.getMinutes()}`
                }`
              : `${thisDate.getDate()}.${
                  thisDate.getMonth() > 9
                    ? thisDate.getMonth() + 1
                    : `0${thisDate.getMonth() + 1}`
                }`;
          const classForMessage = read
            ? { fontWeight: "normal" }
            : { fontWeight: "bold" };
          const receiverOrSender =
            match.path === "users/messages/received"
              ? `${receiver.first_name} ${receiver.last_name}, ${receiver.email}`
              : `${sender.first_name} ${sender.last_name}, ${sender.email}`;

          return (
            <ListItem
              key={id}
              button
              divider
              component={Link}
              to={`${match.path}/${id}`}
              onClick={(e) => handleUnreadMessageClick(e, id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(id)}
                  checked={checked.indexOf(id) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${id + 1}`} />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                style={{ width: "30%" }}
                primary={
                  <Typography
                    type="body2"
                    noWrap
                    style={isReceived && classForMessage}
                  >
                    {receiverOrSender}
                  </Typography>
                }
              />
              <ListItemText
                id={labelId}
                style={{ width: "30%" }}
                primary={
                  <Typography
                    type="body2"
                    noWrap
                    style={isReceived && classForMessage}
                  >
                    {title}
                  </Typography>
                }
              />
              <ListItemText
                id={labelId}
                style={{ width: "10%" }}
                primary={
                  <Typography
                    type="body2"
                    noWrap
                    style={isReceived && classForMessage}
                  >
                    {thisDate}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="trash button" component="span">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      ) : (
        <div>Brak nowych wiadomości</div>
      )}
    </List>
  );
}

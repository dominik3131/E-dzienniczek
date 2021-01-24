import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ConfirmMessageAlert from "../../Alerts/ConfirmMessageAlert";
import SuccessAlert from "../../Alerts/SuccessAlert";
import { sendMessage } from "../../../helpers/api/MessagesApi";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  formControl: { margin: theme.spacing(1), width: "50%", minWidth: 400 },
  label: {
    fontWeight: "bold",
    minWidth: 100,
    textAlign: "center",
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginRight: 100,
  },
  messageField: {
    width: "60%",
    marginTop: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
  messageFieldPosition: {
    justifyContent: "space-between",
  },
}));

const NewMessage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const usersToChat = useSelector((state) => state.UsersToChat.usersToChat);
  const [message, setMessage] = useState({
    chooseUser: null,
    topic: "",
    content: "",
  });

  const handleChange = (e) =>
    setMessage({ ...message, [e.target.name]: e.target.value });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async (title, content, receiver) => {
    const sendMessageResult = await sendMessage(title, content, receiver);
    return sendMessageResult;
  };
  const handleSendMessage = () => {
    const { chooseUser, topic, content } = message;
    if (chooseUser === "" || topic === "" || content === "") {
      handleClose();
      return alert("Uzupełnij wszystkie pola!");
    } else {
      const result = fetchData(topic, content, chooseUser).then((res) => {
        setMessage({
          chooseUser: null,
          topic: "",
          content: "",
        });
        handleClose();
        setOpenAlertSuccess(true);
      });
    }
  };
  return (
    <Typography component="div" className={classes.root}>
      <Box className={classes.row}>
        <Box className={classes.label}>Do:</Box>
        <FormControl variant="outlined" className={clsx(classes.formControl)}>
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="chooseUser"
            value={message.chooseUser}
            label="Age"
            onChange={(e) => handleChange(e)}
          >
            {usersToChat &&
              usersToChat.map(({ email, first_name, last_name, type }) => (
                <MenuItem value={email}>
                  {first_name} {last_name} [{email}] {type}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Temat:</Box>
        <TextField
          id="outlined-multiline-static"
          name="topic"
          label="Temat"
          variant="outlined"
          value={message.topic}
          className={clsx(classes.formControl)}
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <Box className={classes.row}>
        <Box className={clsx(classes.label)}>Treść:</Box>
        <TextareaAutosize
          id="outlined-multiline-static"
          name="content"
          placeholder="Wiadomość..."
          rowsMin={15}
          value={message.content}
          className={clsx(classes.formControl, classes.messageField)}
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <Box className={clsx(classes.row)}>
        <Box className={clsx(classes.label)}></Box>
        <Box className={classes.button}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Wyślij
          </Button>
        </Box>
      </Box>
      <ConfirmMessageAlert
        open={open}
        close={handleClose}
        send={handleSendMessage}
      />
      <SuccessAlert
        open={openAlertSuccess}
        close={() => setOpenAlertSuccess(false)}
        content="Wiadomość została wysłana pomyślnie!"
      />
    </Typography>
  );
};

export default NewMessage;

import React from "react";
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
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Temat:</Box>
        <TextField
          id="outlined-multiline-static"
          label="Temat"
          variant="outlined"
          className={clsx(classes.formControl)}
        />
      </Box>
      <Box className={classes.row}>
        <Box className={clsx(classes.label)}>Treść:</Box>
        <TextareaAutosize
          id="outlined-multiline-static"
          placeholder="Wiadomość..."
          rowsMin={15}
          className={clsx(classes.formControl, classes.messageField)}
        />
      </Box>
      <Box className={clsx(classes.row)}>
        <Box className={clsx(classes.label)}></Box>
        <Box className={classes.button}>
          <Button variant="contained" color="primary">
            Wyślij
          </Button>
        </Box>
      </Box>
    </Typography>
  );
};

export default NewMessage;

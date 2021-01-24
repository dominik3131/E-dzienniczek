import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmMessageAlert({ open, close, send }) {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Czy na pewno chcesz wysłać wiadomość?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={close} color="primary">
          Nie
        </Button>
        <Button onClick={send} color="primary" autoFocus>
          Tak
        </Button>
      </DialogActions>
    </Dialog>
  );
}

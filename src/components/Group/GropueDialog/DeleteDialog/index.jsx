import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DeleteDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  handleDeleteGroup,
}) => {
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Вы действительно хотите удалить группу?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Все пользователи будут автоматически удалены из группы.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            //onClick={handleClose}
            color="primary"
          >
            Отменить
          </Button>
          <Button onClick={() => handleDeleteGroup()} color="primary">
            Продолжить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../../styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export const DialogGroup = ({
  groupState,
  setGroupState,
  addUserGroup,
  deleteUserGroup,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={groupState.openDialog}
      onClose={() => {
        setGroupState({
          ...groupState,
          openDialog: false,
        });
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle style={{ width: "400px" }} id="alert-dialog-title">
        {"Пользователи группы"}
      </DialogTitle>
      <DialogContent>
        {groupState.isLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <DialogContentText id="alert-dialog-description">
            {groupState.usersGroup &&
              groupState.usersGroup.map((user) => {
                return (
                  <div
                    key={user.id}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1">{user.name}</Typography>
                    <IconButton aria-label="delete">
                      <DeleteIcon
                        fontSize="small"
                        onClick={() => deleteUserGroup(user.id)}
                      />
                    </IconButton>
                  </div>
                );
              })}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogContent>
        <div style={{ width: "400px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupState.allUsers}
            style={{ width: "100%" }}
            onChange={(event) => addUserGroup(event.target.value)}
          >
            {groupState.allUsers &&
              groupState.allUsers.map((user) => {
                return (
                  <MenuItem value={user.id}>
                    {`${user.firstname} ${user.lastname}`}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setGroupState({
              ...groupState,
              openDialog: false,
            });
          }}
          color="primary"
        >
          закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

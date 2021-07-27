import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export const GroupeDialog = ({ group, setGroup, addGroup }) => {
  return (
    <div>
      <Dialog
        open={group.openDialog}
        onClose={() => {
          setGroup({
            ...group,
            openDialog: false,
          });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Создание шаблона пользователей"}
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              style={{ marginBottom: "20px" }}
              label="Название группы"
              value={group.groupName}
              onChange={(event) => {
                setGroup({
                  ...group,
                  groupName: event.target.value,
                });
              }}
            />
            <InputLabel id="demo-simple-select-label">Пользователь</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={group.allUsers}
              style={{ marginBottom: "20px" }}
              onChange={(event) => {
                setGroup({
                  ...group,
                  userIds: [...group.userIds, event.target.value],
                });
              }}
            >
              {group.allUsers &&
                group.allUsers.map((user) => {
                  return (
                    <MenuItem
                      value={{
                        userId: user.id,
                        userName: `${user.firstname} ${user.lastname}`,
                      }}
                    >
                      {`${user.firstname} ${user.lastname}`}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
          <DialogContentText id="alert-dialog-description">
            {group.userIds &&
              group.userIds.map((user) => {
                return (
                  <div
                    key={user.id}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1">{user.userName}</Typography>
                    <IconButton aria-label="delete">
                      <DeleteIcon
                        fontSize="small"
                        onClick={() => {
                          setGroup({
                            ...group,
                            userIds: group.userIds.filter(
                              (item) => item.userId !== user.userId
                            ),
                          });
                        }}
                      />
                    </IconButton>
                  </div>
                );
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={addGroup} color="primary" autoFocus>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

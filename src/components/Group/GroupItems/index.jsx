import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useStyles } from "../styles";
import { DialogGroup } from "./Dialog";
import { initialStateGroupItems } from "./initialStateGroupItems";
import Divider from "@material-ui/core/Divider";
import { getUsers } from "../../../services/users/users";
import {
  deleteUserGroup,
  getDataUsersGroup,
  postUserGroup,
} from "../../../services/group/usersGroup";
import { contextData } from "../../../pages/home-page/context";
import { checkError } from "../../Error/checkError";

export const GroupeItems = ({ item, idGroup, deleteDialog, blackTheme }) => {
  const [groupState, setGroupState] = useState(initialStateGroupItems);
  const classes = useStyles();

  const { errorState, setErrorState } = useContext(contextData);

  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    getDataUsersGroup(idGroup, key).then((result) => {
      if (result.request.readyState === 4) {
        setGroupState({
          ...groupState,
          usersGroup: result.data.group.users,
        });
      }
    });
  }, []);

  const handleOpenDialog = () => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    setGroupState({
      ...groupState,
      isLoading: true,
      openDialog: true,
    });
    getUsers(key).then((result) => {
      if (result.request.readyState === 4) {
        setGroupState({
          ...groupState,
          allUsers: result.data.users,
          isLoading: false,
          openDialog: true,
        });
      }
    });
  };

  const addUserGroup = (userId) => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    setGroupState({
      ...groupState,
      isLoading: true,
    });
    postUserGroup(userId, idGroup, key)
      .then((result) => {
        if (result.request.readyState === 4) {
          getDataUsersGroup(idGroup, key).then((result) => {
            if (result.request.readyState === 4) {
              setGroupState({
                ...groupState,
                usersGroup: result.data.group.users,
                isLoading: false,
              });
            }
          });
        }
      })
      .catch((e) => {
        checkError(e, errorState, setErrorState);
        setGroupState({
          ...groupState,
          isLoading: false,
        });
      });
  };

  const handleDeleteUserGroup = (userId) => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    setGroupState({
      ...groupState,
      isLoading: true,
    });
    deleteUserGroup(userId, idGroup, key)
      .then((result) => {
        if (result.request.readyState === 4) {
          getDataUsersGroup(idGroup, key).then((result) => {
            if (result.request.readyState === 4) {
              setGroupState({
                ...groupState,
                usersGroup: result.data.group.users,
                isLoading: false,
              });
            }
          });
        }
      })
      .catch((e) => {
        checkError(e, errorState, setErrorState);
        setGroupState({
          ...groupState,
          isLoading: false,
        });
      });
  };

  return (
    <div className={classes.groupeItemsWrapper}>
      <Paper
        elevation={3}
        className={
          blackTheme ? classes.blackPaperGroupItem : classes.paperGroupItem
        }
      >
        <div className={classes.headerPaper}>
          <Typography variant="h5" gutterBottom>
            {item.name}.
          </Typography>
        </div>
        <div>
          <Divider />
          <div style={{ display: "flex", marginTop: "15px" }}>
            <Button
              className={blackTheme ? classes.blackButton : null}
              style={{ marginRight: "10px" }}
              onClick={() => handleOpenDialog(idGroup)}
              size="small"
              variant="contained"
              color="primary"
            >
              Пользователи
            </Button>
            <Button
              onClick={() => deleteDialog(idGroup)}
              size="small"
              variant="contained"
              color="secondary"
            >
              Удалить
            </Button>
          </div>
        </div>
      </Paper>
      <DialogGroup
        open={groupState.openDialog}
        setGroupState={setGroupState}
        groupState={groupState}
        addUserGroup={addUserGroup}
        deleteUserGroup={handleDeleteUserGroup}
      />
    </div>
  );
};

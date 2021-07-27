import React, { useContext, useEffect, useState } from "react";
import { ButtonAdd } from "../ButtonAdd";
import { GroupeItems } from "./GroupItems";
import { useStyles } from "./styles";
import { initialStateGroup } from "./initialStateGroup";
import { GroupeDialog } from "./GropueDialog";
import { DeleteDialog } from "./GropueDialog/DeleteDialog";
import {
  deleteDataGroup,
  getDataGroup,
  postDataGroup,
} from "../../services/group/group";
import { getUsers } from "../../services/users/users";
import { contextData } from "../../pages/home-page/context";
import { checkError } from "../Error/checkError";

export const GroupList = () => {
  const classes = useStyles();
  const [group, setGroup] = useState(initialStateGroup);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idDeleteGroup, setIdDeleteGroup] = useState(null);

  const {
    dataGroup,
    stateHomePage,
    setStateHomePage,
    errorState,
    setErrorState,
    blackTheme,
  } = useContext(contextData);

  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    getUsers(key)
      .then((result) => {
        setGroup({
          ...group,
          allUsers: result.data.users,
        });
      })
      .catch((e) => {
        checkError(e, errorState, setErrorState);
      });
  }, []);

  const addTemplate = () => {
    setGroup({
      ...group,
      openDialog: true,
    });
  };
  const addGroup = () => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    postDataGroup(group, key)
      .then((result) => {
        if (result.request.readyState === 4) {
          getDataGroup(key).then((result) => {
            setStateHomePage({
              ...stateHomePage,
              dataGroup: result.data.groups,
            });
          });
        }
      })
      .catch((e) => {
        checkError(e, errorState, setErrorState);
      });
  };
  const deleteDialog = (id) => {
    setOpenDeleteDialog(true);
    setIdDeleteGroup(id);
  };

  const handleDeleteGroup = () => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    deleteDataGroup(idDeleteGroup, key)
      .then((result) => {
        if (result.request.readyState === 4) {
          getDataGroup(key).then((result) => {
            setStateHomePage({
              ...stateHomePage,
              dataGroup: result.data.groups,
            });
            setOpenDeleteDialog(false);
          });
        }
      })
      .catch((e) => {
        checkError(e, errorState, setErrorState);
      });
  };

  return (
    <>
      <div className={classes.groupeWrapper}>
        {dataGroup &&
          dataGroup.map((item) => {
            return (
              <GroupeItems
                key={item.id}
                item={item}
                idGroup={item.id}
                deleteDialog={deleteDialog}
                blackTheme={blackTheme}
              />
            );
          })}
      </div>
      <ButtonAdd title="Создать шаблон" click={addTemplate} />
      <GroupeDialog group={group} setGroup={setGroup} addGroup={addGroup} />
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleDeleteGroup={handleDeleteGroup}
      />
    </>
  );
};

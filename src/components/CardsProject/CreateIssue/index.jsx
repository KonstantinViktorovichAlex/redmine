import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getInitialCreateIssueState } from "./initialState";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MarkDownTextEditor from "../../MarkdownTextEditor";
import { getUsers } from "../../../services/users/users";
import { getIssuesData, postUserIssue } from "../../../services/issues/issues";
import { getDataUsersGroup } from "../../../services/group/usersGroup";
import { contextData } from "../../../pages/home-page/context";

export const CreateIssue = ({ idProject, setOpenProject, blackTheme }) => {
  const classes = useStyles();
  const [createIssue, setCreateIssue] = useState(getInitialCreateIssueState);

  const { dataGroup, stateHomePage, setStateHomePage } = useContext(
    contextData
  );

  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    setStateHomePage({
      ...stateHomePage,
      isLoading: true,
    });

    getUsers(key).then((result) => {
      if (result.request.readyState === 4) {
        setCreateIssue({
          ...createIssue,
          users: result.data.users,
        });
        setStateHomePage({
          ...stateHomePage,
          isLoading: false,
        });
      }
    });
  }, []);

  const handleChangeThemeIssue = (value) => {
    setCreateIssue({
      ...createIssue,
      themeIssue: value,
    });
  };
  const handleChangeDescriptionIssue = (value) => {
    setCreateIssue({
      ...createIssue,
      descriptionIssue: value,
    });
  };
  const handleChangePriorityIssue = (event) => {
    setCreateIssue({
      ...createIssue,
      priorityIssue: event.target.value,
    });
  };
  const handleChangeEstimateIssue = (value) => {
    setCreateIssue({
      ...createIssue,
      estimateIssue: value,
    });
  };
  const handleChangeUserIssue = (event) => {
    setCreateIssue({
      ...createIssue,
      userIssue: event.target.value,
    });
  };
  const handleChangeDateEndIssue = (event) => {
    setCreateIssue({
      ...createIssue,
      dateEndIssue: event.target.value,
    });
  };
  const handleChangeGroupIssue = (event) => {
    let id = event.target.value;
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    getDataUsersGroup(id, key).then((result) => {
      setCreateIssue({
        ...createIssue,
        groupUsers: result.data.group.users.map((user) => user.id),
      });
    });
  };

  const handleCloseProject = () => {
    setOpenProject(false);
  };

  const handleCreateIssue = () => {
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    const issueFields = {
      issue: {
        project_id: idProject,
        subject: createIssue.themeIssue,
        priority_id: createIssue.priorityIssue,
        description: createIssue.descriptionIssue,
        estimated_hours: createIssue.estimateIssue,
        assigned_to_id: createIssue.userIssue,
        due_date: createIssue.dateEndIssue,
        watcher_user_ids: createIssue.groupUsers,
      },
    };
    postUserIssue(issueFields, key).then((result) => {
      if (result.request.readyState === 4) {
        getIssuesData(key).then((result) => {
          setStateHomePage({
            ...stateHomePage,
            dataIssues: result.data.issues,
          });
        });
      }
    });
  };

  return (
    <div className={classes.CreateIssueWrapper}>
      <Card className={blackTheme ? classes.cardBlack : classes.card}>
        <CardContent className={classes.cardContent}>
          <TextField
            inputProps={
              blackTheme
                ? { style: { color: "white" } }
                : { style: { color: "black" } }
            }
            id="1"
            label="Тема"
            value={createIssue.themeIssue}
            onChange={(event) => handleChangeThemeIssue(event.target.value)}
          />

          <div className={classes.markDownTextEditorWrapper}>
            <InputLabel
              className={classes.markDownTextEditorLabel}
              htmlFor="formatted-text-mask-input"
            >
              Описание
            </InputLabel>
            <MarkDownTextEditor
              value={createIssue.descriptionIssue}
              onChange={handleChangeDescriptionIssue}
              blackTheme={blackTheme}
            />
          </div>
          <FormControl>
            <InputLabel id="priority">Приоритет</InputLabel>
            <Select
              labelId="priority"
              id="priority"
              value={createIssue.priorityIssue}
              onChange={handleChangePriorityIssue}
            >
              {stateHomePage.dataIssuesPriority &&
                stateHomePage.dataIssuesPriority.map((priority) => {
                  return (
                    <MenuItem
                      value={priority.id}
                    >{`${priority.name}`}</MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="user">На кого назначить?</InputLabel>
            <Select
              labelId="user"
              id="user-select"
              value={createIssue.userIssue}
              onChange={handleChangeUserIssue}
            >
              {createIssue.users &&
                createIssue.users.map((user) => {
                  return (
                    <MenuItem
                      value={user.id}
                    >{`${user.firstname} ${user.lastname}`}</MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="view">Наблюдатели</InputLabel>
            <Select
              labelId="view"
              id="view-users"
              value={dataGroup.name}
              onChange={handleChangeGroupIssue}
            >
              {dataGroup &&
                dataGroup.map((group) => {
                  return (
                    <MenuItem value={group.id}>{`${group.name}`}</MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              className={classes.dateField}
              helperText="Дата окончания"
              type="date"
              defaultValue={createIssue.dateEndIssue}
              onChange={handleChangeDateEndIssue}
            />
            <TextField
              className={classes.timeField}
              id="3"
              type="time"
              helperText="Естимейт"
              value={createIssue.estimateIssue}
              onChange={(event) =>
                handleChangeEstimateIssue(event.target.value)
              }
            />
          </div>
        </CardContent>
        <div>
          <Button
            className={classes.createIssueButton}
            variant="contained"
            color="primary"
            onClick={handleCreateIssue}
          >
            создать
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseProject}
          >
            закрыть
          </Button>
        </div>
      </Card>
    </div>
  );
};

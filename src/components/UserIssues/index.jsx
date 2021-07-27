import React, { useContext, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Row } from "./Rows";
import { useStyles } from "./styles";
import { contextData } from "../../pages/home-page/context";
import DialogUserIssue from "./DialogUserIssue";
import {
  getFullInfoIssue,
  putIssueFullInfo,
} from "../../services/issues/issues";
import { initialStateUserIssue } from "./initialStateUserIssue";

export default function UserIssues() {
  const classes = useStyles();
  const { issuesData, blackTheme } = useContext(contextData);
  const [userIssueState, setUserIssueState] = useState(initialStateUserIssue);

  console.log("issuesData", issuesData);

  const handleChangeMarkdown = (value) => {
    setUserIssueState({
      ...userIssueState,
      markDownValue: value,
    });
  };
  const handleChangeFinishedTask = (event) => {
    setUserIssueState({
      ...userIssueState,
      finishedTaskValue: event.target.value,
    });
  };

  const handleEditIssueComment = (comment, id) => {
    setUserIssueState({
      ...userIssueState,
      markDownValue: comment,
      notesId: id,
    });
  };

  const handleOpenDialog = (issueId) => {
    getFullInfoIssue(issueId).then((result) => {
      if (result.request.readyState === 4) {
        console.log("result.data.issue", result.data.issue);
        setUserIssueState({
          ...userIssueState,
          openDialog: true,
          fullInfoData: result.data.issue,
          isLoading: false,
        });
      }
    });
  };

  const handleUpdateTask = (idIssue) => {
    setUserIssueState({
      ...userIssueState,
      isLoading: true,
    });
    const key = JSON.parse(localStorage.getItem("user")).api_key;
    const data = {
      issue: {
        notes: userIssueState.markDownValue,
      },
    };
    putIssueFullInfo(key, idIssue, data).then((result) => {
      if (result.request.readyState === 4) {
        getFullInfoIssue(idIssue).then((result) => {
          if (result.request.readyState === 4) {
            setUserIssueState({
              ...userIssueState,
              fullInfoData: result.data.issue,
              isLoading: false,
              markDownValue: "",
              notesId: null,
            });
          }
        });
      }
    });
  };

  return (
    <>
      {userIssueState.openDialog ? (
        <DialogUserIssue
          userIssueState={userIssueState}
          setUserIssueState={setUserIssueState}
          handleChangeMarkdown={handleChangeMarkdown}
          handleChangeFinishedTask={handleChangeFinishedTask}
          handleUpdateTask={handleUpdateTask}
          handleEditIssueComment={handleEditIssueComment}
        />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead
            className={
              blackTheme ? classes.blackTableHeader : classes.tableHeader
            }
          >
            <TableRow>
              <TableCell></TableCell>
              <TableCell className={classes.tableRow}>Тема</TableCell>
              <TableCell className={classes.tableRow} align="right">
                Автор
              </TableCell>
              <TableCell className={classes.tableRow} align="right">
                Назначена
              </TableCell>
              <TableCell className={classes.tableRow} align="right">
                Дата создания
              </TableCell>
              <TableCell className={classes.tableRow} align="right">
                Естимейт
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={blackTheme ? classes.blackTableBody : null}>
            {issuesData.map((issue) => {
              return (
                <Row
                  key={issue.id}
                  issue={issue}
                  openDialog={handleOpenDialog}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

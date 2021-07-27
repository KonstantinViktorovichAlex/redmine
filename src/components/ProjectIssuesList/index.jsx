import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Row } from "./Rows";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./styles";
import { useDataProjectIssues } from "./getData";

export default function ProjectIssuesList({
  idProject,
  setOpenIssuesProject,
  blackTheme,
}) {
  const classes = useStyles();
  const getDataProjectIssues = useDataProjectIssues(idProject);
  return (
    <TableContainer component={Paper}>
      {getDataProjectIssues.isLoading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Table aria-label="collapsible table">
          <TableHead
            c
            className={
              blackTheme ? classes.blackTableHeader : classes.tableHeader
            }
          >
            <TableRow>
              <TableCell>
                <IconButton aria-label="delete" size="small">
                  <ArrowBackIcon
                    fontSize="inherit"
                    onClick={() => setOpenIssuesProject(false)}
                  />
                </IconButton>
              </TableCell>
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
            {getDataProjectIssues.dataIssues.map((issue) => {
              return <Row key={issue.id} issue={issue} />;
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

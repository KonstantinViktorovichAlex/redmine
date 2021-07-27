import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export function Row({ issue, openDialog }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={"full info"} placement={"top"}>
              <div
                style={{ color: "red", marginRight: "10px", cursor: "pointer" }}
                onClick={() => {
                  openDialog(issue.id);
                }}
              >
                <InfoOutlinedIcon />
              </div>
            </Tooltip>
            <div>{issue.subject}</div>
          </div>
        </TableCell>
        <TableCell align="right">{issue.author.name}</TableCell>
        <TableCell align="right">
          {issue.assigned_to ? issue.assigned_to.name : null}
        </TableCell>
        <TableCell align="right">
          {new Date(issue.created_on).toLocaleString()}
        </TableCell>
        <TableCell align="right">
          {issue.estimated_hours ? issue.estimated_hours : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Описание
              </Typography>
              <Typography variant="body1" gutterBottom>
                {issue.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

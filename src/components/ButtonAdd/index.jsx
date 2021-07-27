import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() => ({
  buttonAdd: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
}));

export const ButtonAdd = ({ title, click }) => {
  const classes = useStyles();
  return (
    <div onClick={() => click()}>
      <Tooltip title={title} aria-label="add" placement="top-start">
        <Fab color="secondary" className={classes.buttonAdd}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

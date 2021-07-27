import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  loaderWrapper: {
    background: "rgba(255, 255, 255, 0.5)",
    zIndex: 1000,
    width: "100%",
    height: "100vh",
    position: "absolute",
    backdropFilter: `blur(5px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const Loader = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.loaderWrapper}>
      <CircularProgress size={80} color="secondary" />
    </Grid>
  );
};

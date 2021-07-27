import React, { useEffect, useState } from "react";
import { LoginPage } from "../pages/login-page";
import Grid from "@material-ui/core/Grid";
import { Loader } from "../components/Loader";
import { useStyles } from "./styles";
import { HomePage } from "../pages/home-page";

export const RedmineWeb = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [authorization, setAuthorization] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem("user")) {
      setAuthorization(true);
    }
    setIsLoading(false);
  }, [authorization]);

  if (authorization === false) {
    return (
      <>
        {isLoading ? <Loader /> : null}
        <Grid
          className={classes.root}
          container
          justify="center"
          alignItems="center"
        >
          <LoginPage
            setIsLoading={setIsLoading}
            setAuthorization={setAuthorization}
          />
        </Grid>
      </>
    );
  }

  return (
    <Grid>
      <Grid className={classes.root}>
        <HomePage setAuthorization={setAuthorization} />
      </Grid>
    </Grid>
  );
};

import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./styles";
import {
  getInitialLoginState,
  getInitialCheckboxState,
  isError,
} from "./initialState";
import { isLogin } from "../../services/login/login";
import { Error } from "../../components/Error";
import { checkError } from "../../components/Error/checkError";

export const LoginPage = ({ setIsLoading, setAuthorization }) => {
  const classes = useStyles();
  const [login, setLogin] = useState(getInitialLoginState);
  const [rememberMe, setRememberMe] = useState(getInitialCheckboxState);
  const [errorState, setErrorState] = useState(isError);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("login", JSON.stringify(login));
      localStorage.setItem("checkbox", JSON.stringify(rememberMe));
    } else {
      localStorage.removeItem("login", login);
      localStorage.removeItem("checkbox", rememberMe);
    }
  }, [rememberMe]);

  const handleChangeLogin = (event) => {
    if (event.target.id === "Username") {
      setLogin({
        ...login,
        Username: event.target.value,
      });
    }
    if (event.target.id === "Password") {
      setLogin({
        ...login,
        Password: event.target.value,
      });
    }
  };

  const handleChangeRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const getLogin = () => {
    setIsLoading(true);
    isLogin(login)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.data.user));
        setIsLoading(false);
        setAuthorization(true);
      })
      .catch((e) => {
        checkError(e, errorState, setErrorState);
        setIsLoading(false);
      });
  };

  return (
    <>
      {errorState.error ? <Error errorStatus={errorState.errorStatus} /> : null}
      <Paper className={classes.papperStyle} element="div" elevation={3}>
        <Grid className={classes.textContainer}>
          <Typography
            className={classes.headerText}
            variant="h3"
            component="h4"
            gutterBottom
          >
            Redmine
          </Typography>
          <Grid>
            <TextField
              value={login.Username}
              onChange={(e) => handleChangeLogin(e)}
              className={classes.textField}
              id="Username"
              label="Пользователь"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid>
            <TextField
              value={login.Password}
              onChange={(e) => handleChangeLogin(e)}
              className={classes.textField}
              id="Password"
              label="Пароль"
              variant="outlined"
              type="password"
            />
          </Grid>
          <FormControlLabel
            className={classes.formControlStyle}
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleChangeRememberMe}
                name="rememberMe"
                color="primary"
              />
            }
            label="Запомнить меня"
          />
        </Grid>
        <Grid>
          <Button
            onClick={getLogin}
            startIcon={<EmojiPeopleIcon />}
            variant="contained"
            color="primary"
          >
            Войти
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

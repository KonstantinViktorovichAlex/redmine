import React from "react";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Chip from "@material-ui/core/Chip";
import { useStyles } from "./styles";

const ERROR_STATUS = {
  403: "Сервер отказал в доступе (code 403)",
  422: "Что-то пошло не так, возможно вам стоит быть внимательнее",
  401: "Неверный логин или пароль (code 401)",
  500: "Сервер не доступен (code 500)",
};

export const Error = ({ errorStatus }) => {
  const classes = useStyles();

  return (
    <div className={classes.errorWrapper}>
      <Chip
        icon={<MoodBadIcon />}
        label={ERROR_STATUS[errorStatus]}
        color="secondary"
      />
    </div>
  );
};

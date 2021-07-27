import axios from "axios";
import { DATA_USERS_CREATE_ISSUE } from "../../constants/url";

export const getUsers = async (key) => {
  const resultUsersData = await axios(`${DATA_USERS_CREATE_ISSUE}`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      key: key,
    },
  }).then((result) => {
    return result;
  });
  return resultUsersData;
};

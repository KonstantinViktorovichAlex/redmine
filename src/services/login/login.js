import axios from "axios";
import { AUTHORIZATION } from "../../constants/url";

export const isLogin = async (login) => {
  const response = await axios
    .get(`${AUTHORIZATION}`, {
      headers: {
        Authorization: "Basic " + btoa(`${login.Username}:${login.Password}`),
        "Content-Type": "application/json",
      },
    })
    .then((res) => res);
  return response;
};

import axios from "axios";
import { ADD_USER_GROUP, DATA_USERS_GROUP } from "../../constants/url";

export const getDataUsersGroup = async (idGroup, key) => {
  const resultUsersData = await axios
    .get(`${DATA_USERS_GROUP}${idGroup}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        include: "users",
        key: key,
      },
    })
    .then((result) => {
      return result;
    });
  return resultUsersData;
};

export const postUserGroup = async (userId, idGroup, key) => {
  const sendData = {
    key: key,
    user_id: userId,
  };
  const resultUserData = await axios
    .post(`${ADD_USER_GROUP}${idGroup}/users.json`, sendData, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((result) => {
      return result;
    });
  return resultUserData;
};

export const deleteUserGroup = async (userId, idGroup, key) => {
  const resultUserData = await axios
    .delete(`${ADD_USER_GROUP}${idGroup}/users/${userId}.json`, {
      headers: {
        Accept: "application/json",
      },
      params: {
        key: key,
      },
    })
    .then((result) => {
      return result;
    });
  return resultUserData;
};

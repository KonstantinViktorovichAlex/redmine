import axios from "axios";
import { ADD_GROUP, DATA_GROPE, DELETE_GROUP } from "../../constants/url";

export const getDataGroup = async (key) => {
  const dataGroup = await axios
    .get(`${DATA_GROPE}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: key,
      },
    })
    .then((result) => {
      return result;
    });
  return dataGroup;
};

export const postDataGroup = async (group, key) => {
  const newData = {
    group: {
      name: group.groupName,
      user_ids: group.userIds.map((user) => user.userId),
    },
  };
  const resultSendData = await axios
    .post(`${ADD_GROUP}`, newData, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: key,
      },
    })
    .then((result) => {
      return result;
    });
  return resultSendData;
};

export const deleteDataGroup = async (idGroup, key) => {
  const resultDelete = await axios
    .delete(`${DELETE_GROUP}${idGroup}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: key,
      },
    })
    .then((result) => result);
  return resultDelete;
};

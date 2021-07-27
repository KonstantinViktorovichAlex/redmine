import axios from "axios";
import {
  CREATE_ISSUE,
  DATA_ISSUES_USER,
  ISSUE_FULL_INFO,
  ISSUE_PRIORITY,
  ISSUE_UPDATE,
} from "../../constants/url";

export const getIssuesData = async (key) => {
  const issuesData = await axios
    .get(`${DATA_ISSUES_USER}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        assigned_to_id: "me",
        key: key,
      },
    })
    .then((result) => result);
  return issuesData;
};

export const postUserIssue = async (data, key) => {
  const dataToJson = JSON.stringify(data);
  const resultIssuesData = await axios
    .post(`${CREATE_ISSUE}`, dataToJson, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: key,
      },
    })
    .then((result) => result);
  return resultIssuesData;
};

export const getIssuesPriority = async (key) => {
  const resultIssuePriority = await axios
    .get(`${ISSUE_PRIORITY}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => result);
  return resultIssuePriority;
};

export const getFullInfoIssue = async (idIssue) => {
  const resultFullInfo = await axios
    .get(`${ISSUE_FULL_INFO}${idIssue}.json?include=journals`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => result);
  return resultFullInfo;
};

export const putIssueFullInfo = async (key, idIssue, data) => {
  const resultUpdateInfo = await axios
    .put(`${ISSUE_UPDATE}${idIssue}.json`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: key,
      },
    })
    .then((result) => result);
  return resultUpdateInfo;
};

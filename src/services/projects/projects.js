import axios from "axios";
import { DATA_PROJECTS, DATA_PROJECTS_ID } from "../../constants/url";

export const getProjectsData = async () => {
  const dataProjects = await axios
    .get(`${DATA_PROJECTS}`)
    .then((result) => result);
  return dataProjects;
};

export const getIssuesProjectData = async (idProject, key) => {
  const dataProjectIssues = await axios
    .get(`${DATA_PROJECTS_ID}${idProject}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        key: key,
      },
    })
    .then((result) => result);
  return dataProjectIssues;
};

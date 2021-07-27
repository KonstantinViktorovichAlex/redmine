import { getDataGroup } from "../../services/group/group";
import { getProjectsData } from "../../services/projects/projects";
import { getIssuesData, getIssuesPriority } from "../../services/issues/issues";

export const getData = async (stateHomePage, setStateHomePage) => {
  const key = JSON.parse(localStorage.getItem("user")).api_key;

  const resultGroup = await getDataGroup(key).then((result) => {
    return result;
  });
  const resultProjects = await getProjectsData().then((result) => {
    return result;
  });
  const resultIssue = await getIssuesData(key).then((result) => {
    return result;
  });
  const resultIssuePriority = await getIssuesPriority(key).then((result) => {
    return result;
  });
  setStateHomePage({
    ...stateHomePage,
    dataGroup: resultGroup.data.groups,
    dataProjects: resultProjects.data.projects,
    dataIssues: resultIssue.data.issues,
    dataIssuesPriority: resultIssuePriority.data.issue_priorities,
  });
};

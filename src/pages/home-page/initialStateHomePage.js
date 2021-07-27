export const getInitialStateHomePage = () => {
  return {
    blackTheme: false,
    openMenu: false,
    isError: false,
    projectsPage: true,
    userIssuesPage: false,
    groupPage: false,
    apiKey: "",
    dataGroup: [],
    dataProjects: [],
    dataIssues: [],
    dataIssuesPriority: [],
    userName: `${JSON.parse(localStorage.getItem("user")).firstname} ${
      JSON.parse(localStorage.getItem("user")).lastname
    }`,
  };
};

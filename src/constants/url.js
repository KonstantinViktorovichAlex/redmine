import { REACT_APP_REDMINE_URL } from "./envUrl";
//authorization
export const AUTHORIZATION = `${REACT_APP_REDMINE_URL}/my/account.json`;
//projects
export const DATA_PROJECTS = `${REACT_APP_REDMINE_URL}/projects.json`;
export const DATA_PROJECTS_ID = `${REACT_APP_REDMINE_URL}/issues.json?project_id=`;
//issues
export const DATA_USERS_CREATE_ISSUE = `${REACT_APP_REDMINE_URL}/users.json`;
export const CREATE_ISSUE = `${REACT_APP_REDMINE_URL}/issues.json`;
export const DATA_ISSUES_USER = `${REACT_APP_REDMINE_URL}/issues.json?assigned_to_id=me`;
export const ISSUE_PRIORITY = `${REACT_APP_REDMINE_URL}/enumerations/issue_priorities.json`;
export const ISSUE_UPDATE = `${REACT_APP_REDMINE_URL}/issues/`;
export const ISSUE_FULL_INFO = `${REACT_APP_REDMINE_URL}/issues/`;
//groups
export const DATA_GROPE = `${REACT_APP_REDMINE_URL}/groups.json`;
export const DATA_USERS_GROUP = `${REACT_APP_REDMINE_URL}/groups/`;
export const ADD_USER_GROUP = `${REACT_APP_REDMINE_URL}/groups/`;
export const ADD_GROUP = `${REACT_APP_REDMINE_URL}/groups.json`;
export const DELETE_GROUP = `${REACT_APP_REDMINE_URL}/groups/`;

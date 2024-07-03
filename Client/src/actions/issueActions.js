import API from "../api";
import * as actionTypes from "./types";

const createIssueStart = () => {
  return {
    type: actionTypes.CREATE_ISSUES_START,
  };
};
const createIssueSuccess = (issue) => {
  return {
    type: actionTypes.CREATE_ISSUES_SUCCESS,
    issue: issue,
  };
};
const createIssueFailed = (error) => {
  return {
    type: actionTypes.CREATE_ISSUES_FAILED,
    error: error,
  };
};
export const createIssue = (data) => (dispatch) => {
  dispatch(createIssueStart());
  API.post("issue/createIssue", data)
    .then((res) => {
      if (res.data) {
        dispatch(createIssueSuccess(res.data.issue));
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(createIssueFailed(error));
    });
};
const fetchIssuesStart = () => {
  return {
    type: actionTypes.FETCH_ISSUES_START,
  };
};
export const fetchIssuesSuccess = (issues) => {
  return {
    type: actionTypes.FETCH_ISSUES_SUCCESS,
    issues: issues,
  };
};
const fetchIssuesFailed = (error) => {
  return {
    type: actionTypes.FETCH_ISSUES_FAILED,
    error: error,
  };
};
export const fetchIssues = (userId) => (dispatch) => {
  dispatch(fetchIssuesStart());
  API.get("issue/getIssues?userId=" + userId)
    .then((res) => {
      if (res.data) {
        dispatch(fetchIssuesSuccess(res.data.issues));
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchIssuesFailed(error));
    });
};

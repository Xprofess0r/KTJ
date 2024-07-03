import {
  CREATE_ISSUES_FAILED,
  CREATE_ISSUES_START,
  CREATE_ISSUES_SUCCESS,
  FETCH_ISSUES_FAILED,
  FETCH_ISSUES_START,
  FETCH_ISSUES_SUCCESS,
} from "../actions/types";
import isEmpty from "../validation/isEmpty";

const initialState = {
  issues: [],
  inProgress: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ISSUES_SUCCESS:
      return {
        ...state,
        inProgress: false,
        issues: [...state.issues, action.issue],
      };
    case CREATE_ISSUES_START:
      return {
        ...state,
        inProgress: true,
      };
    case CREATE_ISSUES_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        inProgress: false,
        issues: action.issues,
      };
    case FETCH_ISSUES_START:
      return {
        ...state,
        inProgress: true,
      };
    case FETCH_ISSUES_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}

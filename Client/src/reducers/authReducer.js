import {
  GET_ERRORS,
  SET_CURRENT_USER,
  LOG_IN_START,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  PRE_SIGN_UP_START,
  PRE_SIGN_UP_SUCCESS,
  PRE_SIGN_UP_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../actions/types";
import isEmpty from "../validation/isEmpty";

const localStorageData = JSON.parse(localStorage.getItem("ktjUserLoginData"));

const initialState = {
  isAuthenticated: localStorageData !== null,
  user: localStorageData || {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case LOG_IN_START:
    case PRE_SIGN_UP_START:
    case SIGN_UP_START:
      return {
        ...state,
        loading: true
      }
    case PRE_SIGN_UP_SUCCESS:
    case SIGN_UP_SUCCESS:
    case LOG_IN_SUCCESS:
    case PRE_SIGN_UP_FAILURE:
    case SIGN_UP_FAILURE:
    case LOG_IN_FAILURE:
      return {
        ...state,
        loading: false
      }
      
    default:
      return state;
  }
}

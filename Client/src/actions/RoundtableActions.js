import API from "./../api";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const findUser = (eventKTJID) => (dispatch) => {
	API.post("/findUser", eventKTJID)
		.then((res) => {
			dispatch(setCurrentUser(res.data.payLoad));
		})
		.catch((err) => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const registerRoundtable = (userData, history) => (dispatch) => {
	API.post("/event_reg", userData)
		.then((res) => {
			dispatch(setCurrentUser(res.data));
			history.push("/events/interactiveSession");
		})
		.catch((err) => {
			dispatch({ type: GET_ERRORS, payload: err.data });
		});
};

export const setErrors = (errors) => (dispatch) => {
	dispatch({ type: GET_ERRORS, payload: errors });
};

export const setCurrentUser = (userData) => {
	return {
		type: SET_CURRENT_USER,
		payload: userData,
	};
};

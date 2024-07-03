import API from "../api";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { updateUserInfo } from "./authActions";
export const findUser = (eventKTJID) => (dispatch) => {
  API.get("/findUser", eventKTJID)
    .then((res) => {
      dispatch(setCurrentUser(res.data.payLoad));
    })
    .catch((err) => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const registerEvent = (userData, history) => (dispatch) => {
  // console.log('data is for registration event',userData);
  return new Promise((resolve, reject) => {
    API.post("/team/register", userData)
      .then((res) => {
        if (res.data.teamID !== null) {
          resolve(res);
          localStorage.setItem(
            "ktjUserLoginData",
            JSON.stringify(res.data.userData)
          );
          dispatch(setCurrentUser(res.data.userData));
          dispatch({ type: GET_ERRORS, payload: {} });
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        // below logic is due to the
        // the way we are sending error from backend
        if (
          err?.response?.status === 422 &&
          err.response.data?.message.split(":")[1].split(" ")[1] ===
            userData.ktjID
        ) {
          dispatch(updateUserInfo(userData.userId));
          err.reset = true;
        } else if (err?.response?.data?.name == "JsonWebTokenError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else if (err?.response?.data?.name == "TokenExpiredError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else {
          dispatch({ type: GET_ERRORS, payload: err?.response?.data });
        }
        reject(err);
      });
  });
};

export const editTeam = (userData, history) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const { members, teamId, eventId,category } = userData;
    API.post("/team/edit", { members, teamId, eventId,category })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err?.response?.data?.name == "JsonWebTokenError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else if (err?.response?.data?.name == "TokenExpiredError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else {
          dispatch({ type: GET_ERRORS, payload: err?.response?.data });
        }
        reject(err);
      });
  });
};

export const deleteTeam = (userData, history) => (dispatch) => {
  return new Promise((resolve, reject) => {
    API.post("/team/delete", userData)
      .then((res) => {
        resolve(res);
        localStorage.setItem(
          "ktjUserLoginData",
          JSON.stringify(res.data.userData)
        );
        dispatch(setCurrentUser(res.data.userData));
      })
      .catch((err) => {
        // below logic is due to the
        // the way we are sending error from backend
        // if (
        //   err?.response?.status === 422
        // ) {
        //   dispatch(logoutUser(err.response.data, history.push("/signin")));
        // } else if (err?.response?.data?.name == "JsonWebTokenError") {
        //   dispatch(logoutUser(err.response.data, history.push("/signin")));
        // } else if (err?.response?.data?.name == "TokenExpiredError") {
        //   dispatch(logoutUser(err.response.data, history.push("/signin")));
        // } else {
        //   dispatch({ type: GET_ERRORS, payload: err?.response?.data });
        // }
        reject(err);
      });
  });
};

export const registerGame = (userData, history) => (dispatch) => {
  return new Promise((resolve, reject) => {
    API.post("/gameteam/register", userData)
      .then((res) => {
        // console.log(res);
        if (res.data.teamID !== null) {
          resolve(res);
          localStorage.setItem(
            "ktjUserLoginData",
            JSON.stringify(res.data.userData)
          );
          dispatch(setCurrentUser(res.data.userData));
          dispatch({ type: GET_ERRORS, payload: {} });
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        // below logic is due to the
        // the way we are sending error from backend
        if (
          err?.response?.status === 422 &&
          err.response.data?.message.split(":")[1].split(" ")[1] ===
            userData.ktjID
        ) {
          dispatch(updateUserInfo(userData.userId));
          err.reset = true;
        } else if (err?.response?.data?.name == "JsonWebTokenError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else if (err?.response?.data?.name == "TokenExpiredError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else {
          dispatch({ type: GET_ERRORS, payload: err?.response?.data });
        }
        reject(err);
      });
  });
};

export const editGameTeam = (userData, history) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const { members, teamId, gameId, ign, in_game_id, teamName } = userData;
    API.post("/gameteam/edit", {
      members,
      teamId,
      gameId,
      ign,
      in_game_id,
      teamName,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err?.response?.data?.name == "JsonWebTokenError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else if (err?.response?.data?.name == "TokenExpiredError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else {
          dispatch({ type: GET_ERRORS, payload: err?.response?.data });
        }
        reject(err);
      });
  });
};

export const deleteGameTeam = (userData, history) => (dispatch) => {
  return new Promise((resolve, reject) => {
    API.post("/gameteam/delete", userData)
      .then((res) => {
        resolve(res);
        localStorage.setItem(
          "ktjUserLoginData",
          JSON.stringify(res.data.userData)
        );
        dispatch(setCurrentUser(res.data.userData));
      })
      .catch((err) => {
        // below logic is due to the
        // the way we are sending error from backend
        // if (
        //   err?.response?.status === 422
        // ) {
        //   dispatch(logoutUser(err.response.data, history.push("/signin")));
        // } else if (err?.response?.data?.name == "JsonWebTokenError") {
        //   dispatch(logoutUser(err.response.data, history.push("/signin")));
        // } else if (err?.response?.data?.name == "TokenExpiredError") {
        //   dispatch(logoutUser(err.response.data, history.push("/signin")));
        // } else {
        //   dispatch({ type: GET_ERRORS, payload: err?.response?.data });
        // }
        reject(err);
      });
  });
};

export const registerISession = (userData, history) => (dispatch) => {
  API.post("/team/register", userData)
    .then((res) => {
      localStorage.setItem(
        "ktjUserLoginData",
        JSON.stringify(res.data.safeData)
      );
      dispatch(setCurrentUser(res.data.safeData));
      history.push("/events/interactiveSession");
    })
    .catch((err) => {
      if (err.response.data.name == "JsonWebTokenError") {
        dispatch(logoutUser(err.response.data, history.push("/signin")));
      } else if (err.response.data.name == "TokenExpiredError") {
        dispatch(logoutUser(err.response.data, history.push("/signin")));
      } else {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      }
    });
};

export const deRegisterEvent =
  (userData, history, eventTitle) => (dispatch) => {
    API.post("/team/delete", userData)
      .then((res) => {
        localStorage.setItem(
          "ktjUserLoginData",
          JSON.stringify(res.data.safeData)
        );
        dispatch(setCurrentUser(res.data.safeData));
        history.push("/events/" + eventTitle);
      })
      .catch((err) => {
        if (err.response.data.name == "JsonWebTokenError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else if (err.response.data.name == "TokenExpiredError") {
          dispatch(logoutUser(err.response.data, history.push("/signin")));
        } else {
          dispatch({ type: GET_ERRORS, payload: err.response.data });
        }
      });
  };

export const logoutUser = (userData, history) => (dispatch) => {
  localStorage.removeItem("ktjUserLoginData");
  dispatch(setCurrentUser({}));
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

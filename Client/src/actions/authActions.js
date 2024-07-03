import API from "../api";
import { fetchIssues, fetchIssuesSuccess } from "./issueActions";
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
  SIGN_UP_FAILURE,
} from "./types";

export const userAuth=(userData,history)=>(dispatch)=>{

  API.get("/userAuth")
  .then((res)=>{
    // console.log(res.data); 
    if(!res.data.success){
      dispatch(setCurrentUser({}));
    }
  }).catch((err)=>{
    console.log(err)
    dispatch(setCurrentUser({}));
  })
 
}

export const googleSignIn = (userData, history) => (dispatch) => {
  API.post("/preregisterGoogle", userData)
    .then((res) => {
      // console.log(res.data);
      if(res.data.user){
        const userData = res.data.user;
        localStorage.setItem(
          "ktjUserLoginData",
          JSON.stringify(userData)
        );
        // console.log("data", res.data.userData);
        dispatch(setCurrentUser(userData));
        dispatch(fetchIssues(userData._id));
        
        history.push("/profile");
      }
      else if (res.data) {
        history.push(`/signup?code=${res.data.code}&email=${res.data.email_id}`);
      } else {
        return res.status(400).json("Unsucessful presignup");
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const preregisterUser = (userData, history) => (dispatch) => {

  dispatch(preRegisterStart());

  API.post("/preregister", userData)
    .then((res) => {
      dispatch(preRegisterSuccess());
      if (res.data) {
        history.push({
          pathname: "/presignupmessage",
          state: { email_id: res.data.email_id },
        });
        history.push("/presignupmessage", res.data.email_id);
      } else {
        return res.status(400).json("Unsucessful presignup");
      }
    })
    .catch((err) => {
      dispatch(preRegisterFailure());

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
    
};

export const registerUser = (userData, history) => (dispatch) => {
  console.log("started!!!!")
  dispatch(RegisterStart());
  API.post("/register", userData)
    .then((res) => {
      console.log(res)
      if (res.data) {
        dispatch(RegisterSuccess());
        dispatch(loginRequest());
        API.post("/login", userData)
          .then((res) => {
            dispatch(loginSuccess());
            localStorage.setItem(
              "ktjUserLoginData",
              JSON.stringify(res.data.userData)
            );
            console.log("data", res.data.userData);
            dispatch(setCurrentUser(res.data.userData));
            dispatch(fetchIssues(res.data.userData._id));
          })
          .catch((err) => {
            dispatch(loginFailure());
            dispatch({ type: GET_ERRORS, payload: err.response.data });
          });
        history.push({
          pathname: "/signupmessage",
          state: { ktjID: res.data.ktjID },
        });
        history.push("/signupmessage", res.data.ktjID);
      } else {
        return res.status(400).json("Unsuccessful signup");
      }
    })
    .catch((err) => {
      dispatch(RegisterFailure());
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch(loginRequest());
  API.post("/login", userData)
    .then((res) => {
      dispatch(loginSuccess());
      localStorage.setItem(
        "ktjUserLoginData",
        JSON.stringify(res.data.userData)
      );
      // console.log("data", res.data.userData);
      dispatch(setCurrentUser(res.data.userData));
      dispatch(fetchIssues(res.data.userData._id));
    })
    .catch((err) => {
      dispatch(loginFailure());
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const googleLogin = (userData, history) => (dispatch) => {
  // console.log("googleLogin");
  API.post("/googleLogin", userData)
    .then((res) => {
      if(res.data.code) {
        history.push(`/signup?code=${res.data.code}&email=${res.data.email_id}`);
      }else{
        localStorage.setItem(
          "ktjUserLoginData",
          JSON.stringify(res.data.userData)
        );
        // console.log("data", res.data.userData);
        dispatch(setCurrentUser(res.data.userData));
        dispatch(fetchIssues(res.data.userData._id));
      }
    })
    .catch((err) => {
      console.log(err);
      // dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = (userData, history) => (dispatch) => {
  localStorage.removeItem("ktjUserLoginData");
  dispatch(setCurrentUser({}));
  dispatch(fetchIssuesSuccess([]));
};

export const setCurrentUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  };
};

export const loginRequest = () => {
  return {
    type: LOG_IN_START,
  };
};
export const loginSuccess = () => {
  return {
    type: LOG_IN_SUCCESS,
  };
};
export const loginFailure = () => {
  return {
    type: LOG_IN_FAILURE,
  };
};

export const preRegisterStart = () => {
  return {
    type: PRE_SIGN_UP_START,
  };
};

export const preRegisterSuccess = () => {
  return {
    type: PRE_SIGN_UP_SUCCESS,
  };
};

export const preRegisterFailure = () => {
  return {
    type: PRE_SIGN_UP_FAILURE,
  };
};
export const RegisterStart = () => {
  return {
    type: SIGN_UP_START,
  };
};

export const RegisterSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS,
  };
};

export const RegisterFailure = () => {
  return {
    type: SIGN_UP_FAILURE,
  };
};

export const regForNewsletters = (email) => {
  API.post("/regForLetter/add", { email })
    .then(() => {
      alert("Succesfully registered!");
    })
    .catch((err) => {
      alert("Some error encountered! Please try again");
    });
};

export const forgetPassword = (email) => {
  API.post("/forgot_password", email)
    .then((res) => {
      alert(res.data);
    })
    .catch(() => {
      alert("Some error encountered! Please try again");
    });
};

export const updateUserInfo = (userId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    API.post("/getUserInfo", { userId })
      .then((res) => {
        localStorage.setItem(
          "ktjUserLoginData",
          JSON.stringify(res.data.userData)
        );
        // console.log("data", res.data.userData);
        dispatch(setCurrentUser(res.data.userData));
        dispatch(fetchIssues(res.data.userData._id));
        return resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};



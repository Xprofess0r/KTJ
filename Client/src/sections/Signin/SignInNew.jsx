import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { message } from "antd";
import SignInNewForm from "./SignInNewForm";
import { loginUser, googleLogin } from "../../actions/authActions";
// import PageWrapper from "./Components/PageWrapper/PageWrapper";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SignIn = ({ loginUser, googleLogin, auth, errors, loading }) => {
  // console.log('SignIn Props:', loginUser, googleLogin, auth, errors, loading);
  const [state, setState] = useState({
    errors: {},
  });
  const [googleLoginAttempted, setGoogleLoginAttempted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // console.log(22);
      // console.log(auth.isAuthenticated);
      redirectToProfile();
    }
    if (googleLoginAttempted && !auth.isAuthenticated) {
      // console.log(11);
      message.error('User not found, please sign up first!');
    }
    if (errors !== state.errors) {
      setState((prevState) => ({ ...prevState, errors }));
    }
  }, [auth.isAuthenticated, errors]);

  const redirectToProfile = () => {
    if (localStorage.getItem("PreviousPath")) {
      navigate(localStorage.getItem("PreviousPath"));
      localStorage.removeItem("PreviousPath");
    } else {
      navigate("/profile");
    }
  };

  const callAPI = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const userData = { email, password };
    loginUser(userData);
    ReactGA.event({
      category: "Click",
      action: "Clicked Sign In button on Signin page",
    });
  };

  const callGoogleLogin = async(res) => {
    var decoded = jwtDecode(res.credential);
    // const email = res.profileObj.email;
    const email = decoded.email;
    // const user = { email, token: res.tokenId };
    const user = { email, token: res.credential };
    // console.log('111');
    await googleLogin(user);
    // console.log('222');
    ReactGA.event({
      category: "Click",
      action: "Clicked Sign In through google button on Signin page",
    });
    // console.log(auth);
    setGoogleLoginAttempted(true);
    // if(!auth.isAuthenticated){
    //   message.error('User not found, please sign up first!');
    // }
  };

  return (
      <SignInNewForm
        errors={state.errors}
        function={callAPI}
        googleLogin={callGoogleLogin}
        loading={loading}
      />
  );
};

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { loginUser, googleLogin })(SignIn);


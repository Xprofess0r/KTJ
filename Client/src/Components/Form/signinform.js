import React, { Component } from "react";
// import './signinform.css'
// import '../vdoplayer/Vdo'
// import '../../images/bgvdo.mp4'
import { Link } from "react-router-dom";
import ReactGa from "react-ga";

// import './SignUpPage.css'
import classes from "./Signin.module.css";

import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoogleLogin } from "react-google-login";
import { BsGoogle } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { TailSpin } from "react-loading-icons";
import { FaKey, FaEnvelope } from "react-icons/fa";
import webstrip from "../../images/web strip-01.jpg";

class SignInform extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
    };
  }

  // Getting errors from backend and updating when new errors arrive
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  render() {
    // console.log(this.props.loading);
    let errors = this.props.errors;
    let errordisplayEmail = "";
    let errordisplayPassword = "";
    let classesEmail = "formInput ";
    let classesPassword = "formInput ";

    if (errors.emailsignin) {
      classesEmail = classesEmail + "red-text-field";
      errordisplayEmail = (
        <div className={classes.error_message}>{errors.emailsignin} </div>
      );
    }
    if (errors.passwordsignin) {
      classesPassword = classesPassword + "red-text-field";
      errordisplayPassword = (
        <div className={classes.error_message}>{errors.passwordsignin}</div>
      );
    }

    // Google login

    const googleSuccess = async (res) => {
      if (res) {
        this.props.googleLogin(res);
      }
    };

    const googleFailure = (err) => {
      // set Errro msg
      errors.emailsignin = "Error in Signing in with Google";
      console.log("google Signin was unsuccessful");
      console.log(err);
    };

    return (
      <>
        <form
          onSubmit={(e) => {
            ReactGa.event({
              category: "Click",
              action: "Clicked on Sign In in Signinpage",
            });
            this.props.function(e);
          }}
          className="formOuter"
        >
          <div className={classes.leftdiv}>
            <div className={classes.signinmodal}>
              <h1 style={{ color: "white", fontFamily: "Solomon Sans Med" }}>
                SIGN IN
              </h1>

              <div className={classes.textboxcontainer}>
                <div className={classes.emailcontainer}>
                  <div className={classes.emailicondiv}>
                    <img
                      src={require("./Images/emailicon.png")}
                      className={classes.emailicon}
                    />
                  </div>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className={classes.textbox}
                  />
                </div>
                {errordisplayEmail}
                <div className={classes.passcontainer}>
                  <div className={classes.passicondiv}>
                    <img
                      src={require("./Images/password.png")}
                      className={classes.passicon}
                    />
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={classes.textbox}
                  />
                </div>
                {errordisplayPassword}
                {/* <div className={classes.emailcontainer}>

<div className={classes.emailicondiv}>
<img src={require('./Images/emailicon.png')} className={classes.emailicon}/>
</div>
 
<input type="text" name="Email ID" placeholder="Email-ID" className={classes.textbox}/>
<div className={classes.emailicondiv}>
<img src={require('./Images/emailicon.png')} className={classes.emailicon}/>
</div>
<input type="password" name="Password" placeholder="Password" className={classes.textbox}/>
</div>        */}
                {/* <input type="password" name="Password" placeholder="Password" className={classes.textbox}/> */}
                <Link
                  className={classes.forgotpassword}
                  onClick={() => {
                    ReactGa.event({
                      category: "Click",
                      action: "Clicked on Forget Password in Signinpage",
                    });
                  }}
                  to="/resetpassword"
                >
                  Forgot Password?
                </Link>
                <div className={classes.sign}>
                  <button type="submit" className={classes.signinbtn}>
                    {this.props.loading ? (
                      <div
                        style={{
                          marginRight: "9px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TailSpin width="20" height="20" />
                      </div>
                    ) : (
                      "SIGN IN"
                    )}
                  </button>
                  {/* <button type="button" className={classes.signinbtn}>Sign In with <span className={classes.googlelogo}>G</span></button> */}
                  <GoogleLogin
                    clientId="543780565590-ss4hetn9iorgsgvsj88n5jnuu7pr9f3c.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <>
                        {/* <button type="button" className={classes.Signupbtn} onClick={renderProps.onClick}>
                        Sign Up with <span className={classes.googlelogo}>G</span>
                      </button> */}

                        <button
                          type="button"
                          className={classes.signinbtn}
                          onClick={renderProps.onClick}
                        >
                          Sign In with{" "}
                          <span className={classes.googlelogo}>G</span>
                        </button>
                      </>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                  />
                </div>
                <h2 className={classes.signintext} style={{ color: "white" }}>
                  Don't have an account?{" "}
                  <Link to="/signuppre" className={classes.signuplink}>
                    Sign Up
                  </Link>
                </h2>
              </div>
            </div>
          </div>
          <div className={classes.rightdiv}>
            {/* <h1>Astro Page</h1> */}
            {/* <img src={require('./Images/sidebg.png')} className={classes.satellite}/> */}
            <img
              src="https://raw.githubusercontent.com/KSHITIJ-2024/media/a35b5c2b4a3e10c9ca5fc3ad69b4f286d1adc40b/astro%2Bsatellite.png"
              className={classes.astronaut}
            />
          </div>
          {/* <div className={classes.rightdiv}>
            
            <img src={require('./Images/sidebg.png')} className={classes.satellite} alt="satellite" />
            <img src={require('./Images/astro+satellite.png')} className={classes.astronaut} alt="astronaut" />
          </div> */}
        </form>
      </>
    );
  }
}

export default SignInform;

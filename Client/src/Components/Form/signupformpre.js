import React, { Component } from 'react'
// import "./signupform.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhoneAlt,
  faGraduationCap,
  faCity,
  faHotel,
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import ReactGa from 'react-ga'

import { GoogleLogin } from 'react-google-login'
// import { useGoogleLogin } from '@react-oauth/google';


import classes from './PreSignUpPage.module.css'
import { Link } from 'react-router-dom'
// import './PreSignUpPage.module.css'
import {
  FaPenNib,
  FaBuilding,
  FaCity,
  FaMapMarkerAlt,
  FaEnvelope,
} from 'react-icons/fa'
import { FaUserAlt } from 'react-icons/fa'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { FiPhoneCall } from 'react-icons/fi'
import { GiGraduateCap } from 'react-icons/gi'
import { BsGoogle } from 'react-icons/bs'
import Button from '@material-ui/core/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { TailSpin } from 'react-loading-icons'
import webstrip from "../../images/web strip-01.jpg";
import { preregisterloadingvalue } from '../../actions/authActions'




class signupformpre extends Component {
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
    let errors = this.props.errors;

    let errordisplayEmail = "";
    let classesEmail = "formInput ";
    console.log(errors);
    if (errors.emailpresignup) {
      classesEmail = classesEmail + "red-text-field";
      errordisplayEmail = (
        <div className="error-message" style={{ color: "red" }}>
          {errors.emailpresignup}
        </div>
      );
    } else {
      errordisplayEmail = (
        <div className="error-message" style={{ color: "red" }}>
          <br />
        </div>
      );
    }

    // Google OAuth

    const googleSuccess = async (res) => {
      // console.log(res, "google success");
      if (res) {
        this.props.googleAuth(res);
      }
    };
    const BackToSignIn = () => { };
    const googleFailure = (err) => {
      // set Errro msg
      errors.emailpresignup = "Error in Signing up with Google";
      console.log("google Signin was unsuccessful");
      console.log(err);
    };
    // let oauth2login = this.props.useGoogleLogin({
    //   onSuccess:{ googleSuccess },
    //   onError:{ googleFailure }
    // });
    return (


      <>
        <form
          id="form"
          onSubmit={(e) => {
            ReactGa.event({
              category: "Click",
              action: "Clicked on Sign Up in Signuppage",
            });
            this.props.function(e);
          }}
        >
          <div className={classes.leftdiv}>
            <div className={classes.Signupmodal}>
              <h1 style={{ color: "white" }}>SIGN UP</h1>
              <div className={classes.textboxcontainer}>
                <div className={classes.emailcontainer}>
                  <div className={classes.emailicondiv}>
                    <img
                      src={require("./Images/emailicon.png")}
                      className={classes.emailicon}
                    />
                  </div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    className={classes.textbox}
                  />
                </div>
                {errordisplayEmail}
                {/* <input type="password" name="Password" placeholder="Password" className={classes.textbox}/> */}
                {/* <a href="" className={classes.forgotpassword}>Forgot Password?</a> */}
                <div className={classes.Sign}>
                  <button type="submit" className={classes.Signupbtn}>
                    {this.props.loading ? (
                      <span style={{ marginRight: "9px" }}>
                        {/* <TailSpin width="20" height="20" /> */}
                        {/* Loading... */}
                        <TailSpin width='20' height='20' />
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                    {/* SIGN UP */}
                  </button>


                  <GoogleLogin
                    clientId="543780565590-ss4hetn9iorgsgvsj88n5jnuu7pr9f3c.apps.googleusercontent.com"
                    render={(renderProps) => (<>
                      <button type="button" className={classes.Signupbtn} onClick={renderProps.onClick}>
                        Sign Up with <span className={classes.googlelogo}>G</span>
                      </button></>

                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                  />


                </div>
                <h2 className={classes.signuptext} style={{ color: "white" }}>
                  Already have an account?{" "}
                  <Link to="/signin" className={classes.signuplink}>
                    Sign In
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
        </form>
      </>

    );
  }
}

export default signupformpre

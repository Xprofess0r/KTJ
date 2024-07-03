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

import classes from './signupemail.module.css';
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

class signupemail extends Component {
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
    // let errors = this.props.errors;

    // let errordisplayEmail = "";
    // let classesEmail = "formInput ";
    // console.log(errors);
    // if (errors.emailpresignup) {
    //   classesEmail = classesEmail + "red-text-field";
    //   errordisplayEmail = (
    //     <div className="error-message" style={{ color: "red" }}>
    //       {errors.emailpresignup}
    //     </div>
    //   );
    // } else {
    //   errordisplayEmail = (
    //     <div className="error-message" style={{ color: "red" }}>
    //       <br />
    //     </div>
    //   );
    // }

    // Google OAuth

    const googleSuccess = async (res) => {
      if (res) {
        this.props.googleAuth(res);
      }
    };
    const BackToSignIn = () => {};
    const googleFailure = (err) => {
      // set Errro msg
      errors.emailpresignup = "Error in Signing up with Google";
      console.log("google Signin was unsuccessful");
      console.log(err);
    };

    return (
      
      
    <>
      <div className={classes.leftdiv}>
        <div className={classes.Signupmodal}>
          {/* <h1>SIGN UP</h1> */}
          <div className={classes.textboxcontainer}>
             <p> We have sent an email to</p>
             <span id="email">iitian@gmail.com</span>
             <p>Please Verify your email to continue the Registration Process</p>
             <br />
             <p className={classes.spam}>(Check your spam if not found)</p>
          </div>
        </div>
      </div>
      <div className={classes.rightdiv}>
        
      <img
          src="https://raw.githubusercontent.com/KSHITIJ-2024/media/a35b5c2b4a3e10c9ca5fc3ad69b4f286d1adc40b/astro%2Bsatellite.png"
          className={classes.astronaut}
        />
      </div>
    </>

    );
  }
}

export default signupemail

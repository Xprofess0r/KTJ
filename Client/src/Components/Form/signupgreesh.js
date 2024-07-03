import React, { Component } from "react";
// import "./signupform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faGraduationCap,
  faCity,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import ReactGa from "react-ga";
import { useLocation } from "react-router-dom";

import classes from "./SignUpPage.module.css";
import {
  FaPenNib,
  FaBuilding,
  FaCity,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";
import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
 

export default function signupgreesh() {
  return (


<>
         
<div className={classes.totaldiv}>
  <div className={classes.leftdiv}>
    <div className={classes.signinmodal}>


      <div className={classes.textboxcontainer}>
        <div className={classes.usernamecontainer}>
          <div className={classes.usernameicondiv}>
            <img
              src={require("./icons/username.png")}
              className={classes.usernameicon}
            />
          </div>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            required
            className={classes.textbox}
          />
        </div>
       
        <div className={classes.emailcontainer}>
          <div className={classes.emailicondiv}>
            <img
              src={require("./icons/mail.png")}
              className={classes.emailicon}
            />
          </div>
          <input
            id="email"
            type="text"
            placeholder="Email"
            disabled
            className={classes.textbox}
          
            required
          />
        </div>
        
        <div className={classes.contactgendercontainer}>
          <div className={classes.contactcontainer}>
            <div className={classes.contacticondiv}>
              <img
                src={require("./icons/contact.png")}
                className={classes.contacticon}
              />
            </div>
            <input
              id="phone"
              type="text"
              placeholder="Contact Number"
              required
              className={classes.textbox}
            />
          </div>
         
          <div className={classes.gendercontainer}>
            <div className={classes.gendericondiv}>
              <img
                src={require("./icons/gender.png")}
                className={classes.gendericon}
              />
            </div>
            <input
              type="text"
              id="gender"
              name=""
              placeholder="Gender"
              className={classes.textbox}
              required
            />
          </div>
         
          <input
            id="code"
            type="text"
            placeholder="code"
            disabled
             
            required
            style={{ display: "none" }}
          />
        </div>
        <div className={classes.collegecollegeidcontainer}>
          <div className={classes.collegecontainer}>
            <div className={classes.collegeicondiv}>
              <img
                src={require("./icons/College.png")}
                className={classes.collegeicon}
              />
            </div>
            <input
              id="college"
              type="text"
              placeholder="College"
              required
              className={classes.textbox}
            />
          </div>
          
          <div className={classes.collegeidcontainer}>
            <div className={classes.collegeidicondiv}>
              <img
                src={require("./icons/collegeId.png")}
                className={classes.collegeidicon}
              />
            </div>
            <input
              id="clgid"
              type="text"
              required
              placeholder="College ID"
              className={classes.textbox}
            />
          </div>
           
        </div>
        <div className={classes.departmentcontainer}>
          <div className={classes.departmenticondiv}>
            <img
              src={require("./icons/dept.png")}
              className={classes.departmenticon}
            />
          </div>
          <input
            id="dep"
            type="text"
            placeholder="Department"
            className={classes.textbox}
            required
          />
        </div>
       
        <div className={classes.citystatecontainer}>
          <div className={classes.citycontainer}>
            <div className={classes.cityicondiv}>
              <img
                src={require("./icons/city.png")}
                className={classes.cityicon}
              />
            </div>
            <input
              id="city"
              type="text"
              placeholder="City"
              className={classes.textbox}
              required
            />
          </div>
           
          <div className={classes.statecontainer}>
            <div className={classes.stateicondiv}>
              <img
                src={require("./icons/state.png")}
                className={classes.stateicon}
              />
            </div>
            <input
              id="state"
              type="text"
              placeholder="State"
              required
              className={classes.textbox}
            />
          </div>
          
        </div>
        <div className="citystatecontainer">
          <div className={classes.passwordconfirmpasswordcontainer}>
            <div className={classes.passwordcontainer}>
              {/* <div className={classes.cityicondiv}>
      <img
        src={require("./icons/city.png")}
        className={classes.cityicon}
      />
    </div> */}
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                required
                className={classes.textbox}
              />
            </div>
           
            <div className={classes.confirmpasswordcontainer}>
              {/* <div className={classes.stateicondiv}>
      <img
        src={require("./icons/state.png")}
        className={classes.stateicon}
      />
    </div> */}
              <input
                id="conpassword"
                type="password"
                placeholder="Confirm Password"
                required
                className={classes.textbox}
              />
            </div>
          
          </div>
        </div>

        <div className={classes.sign}>
          <button type="submit" className={classes.Signupbtn}>

          </button>
          
        </div>
      </div>
    </div>
  </div>

  <div className={classes.rightdiv}>
    
   <img
src="https://raw.githubusercontent.com/KSHITIJ-2024/media/a35b5c2b4a3e10c9ca5fc3ad69b4f286d1adc40b/astro%2Bsatellite.png"
className={classes.astronaut}
/>
  </div>
</div>

</>
   
  )
}

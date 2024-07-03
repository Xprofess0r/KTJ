import React from "react";
import classes from './SignUpPagenew.module.css';
export default function Signup() {
  return (
    <>
      <div className={classes.leftdiv}>
        <div className={classes.signinmodal}>
          <h1>SIGN UP</h1>

          <div className={classes.textboxcontainer}>


            <div className={classes.usernamecontainer}>
              <div className={classes.usernameicondiv}>
                <img
                  src={require("./icons/username.png")}
                  className={classes.usernameicon}
                />
              </div>
              <input
                type="text"
                name="Username"
                placeholder="Username"
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
                type="text"
                name="Email ID"
                placeholder="Email-ID"
                className={classes.textbox}
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
                type="text"
                name="Contact No"
                placeholder="Contact No."
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
                name="Gender"
                placeholder="Gender"
                className={classes.textbox}
              />
            </div>
            </div>
            <div className={classes.collegecollegeidcontainer}>

            <div className={classes.collegecontainer}>
              <div className={classes.collegeicondiv}>
                <img
                  src={require("./icons/collegeId.png")}
                  className={classes.collegeicon}
                />
              </div>
              <input
                type="text"
                name="College"
                placeholder="College"
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
                type="text"
                name="College ID"
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
                type="text"
                name="Department"
                placeholder="Department"
                className={classes.textbox}
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
                type="text"
                name="City"
                placeholder="City"
                className={classes.textbox}
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
                type="text"
                name="State"
                placeholder="State"
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
                type="text"
                name="Password"
                placeholder="Enter Password"
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
                type="text"
                name="Password"
                placeholder="Confirm Password"
                className={classes.textbox}
              />
            </div>
            </div>
            </div>
            

            
            <div className={classes.sign}>
              <button type="button" className={classes.Signupbtn}>
                Sign Up
              </button>
              <button type="button" className={classes.Signupbtn}>
                Sign Up with <span className={classes.googlelogo}>G</span>
              </button>
            </div>
            
          </div>
        </div>
      </div>

      <div className={classes.rightdiv}>
        <img
          src={require("./Images/sidebg.png")}
          className={classes.satellite}
          alt="satellite"
        />
        <img
          src={require("./Images/astro+satellite.png")}
          className={classes.astronaut}
          alt="astronaut"
        />
      </div>
    </>
  );
}

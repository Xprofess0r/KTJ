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
import { TailSpin } from "react-loading-icons";
class signupform extends Component {
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

    let errordisplayName = "";
    let errordisplayEmail = "";
    let errordisplayGender = "";
    let errordisplayPhone = "";
    let errordisplayCollege = "";
    let errordisplayCollegeid = "";
    let errordisplayDepartment = "";
    let errordisplayCity = "";
    let errordisplayState = "";
    let errordisplayPassword = "";
    let errordisplayConPassword = "";
    let classesName = "formInput ";
    let classesEmail = "formInput ";
    let classesGender = "input-flex ";
    let classesPhone = "phone-input ";
    let classesCollege = "input-flex ";
    let classesCollegeid = "input-flex ";
    let classesDepartment = "formInput ";
    let classesCity = "input-flex ";
    let classesState = "input-flex ";
    let classesPassword = "input-flex ";
    let classesConPassword = "input-flex ";

    if (errors.username) {
      classesName = classesName + "red-text-field";
      errordisplayName = (
        <div className={classes.error_message}>{errors.username}</div>
      );
    } else {
      errordisplayName = <div className={classes.error_message}></div>;
    }

    if (errors.email) {
      classesEmail = classesEmail + "red-text-field";
      errordisplayEmail = (
        <div className={classes.error_message}>{errors.email}</div>
      );
    } else {
      errordisplayEmail = <div className={classes.error_message}></div>;
    }

    if (errors.gender) {
      classesGender = classesGender + "red-text-field";
      errordisplayGender = (
        <div className={classes.error_message}>{errors.gender}</div>
      );
    } else {
      errordisplayGender = <div className={classes.error_message}></div>;
    }

    if (errors.phone) {
      classesPhone = classesPhone + "red-text-field";
      errordisplayPhone = (
        <div className={classes.error_message}>{errors.phone}</div>
      );
    }

    if (errors.college) {
      classesCollege = classesCollege + "red-text-field";
      errordisplayCollege = (
        <div className={classes.error_message}>{errors.college}</div>
      );
    } else {
      errordisplayCollege = <div className={classes.error_message}></div>;
    }

    if (errors.collegeid) {
      classesCollegeid = classesCollegeid + "red-text-field";
      errordisplayCollegeid = (
        <div className={classes.error_message}>{errors.collegeid}</div>
      );
    }
    if (errors.department) {
      classesDepartment = classesDepartment + "red-text-field";
      errordisplayDepartment = (
        <div className={classes.error_message}>{errors.department}</div>
      );
    } else {
      errordisplayDepartment = <div className={classes.error_message}></div>;
    }

    if (errors.city) {
      classesCity = classesCity + "red-text-field";
      errordisplayCity = (
        <div className={classes.error_message}>{errors.city}</div>
      );
    } else {
      errordisplayCity = <div className={classes.error_message}></div>;
    }
    if (errors.state) {
      classesState = classesState + "red-text-field";
      errordisplayState = (
        <div className={classes.error_message}>{errors.state}</div>
      );
    }
    if (errors.password) {
      classesPassword = classesPassword + "red-text-field";
      errordisplayPassword = (
        <div className={classes.error_message}>{errors.password}</div>
      );
    }
    if (errors.conpassword) {
      classesConPassword = classesConPassword + "red-text-field";
      errordisplayConPassword = (
        <div className={classes.error_message}>{errors.password}</div>
      );
    } else {
      errordisplayConPassword = <div className={classes.error_message}></div>;
    }

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
        // className="forminner"
        >
          <div className={classes.totaldiv}>
            <div className={classes.leftdiv}>
              <div className={classes.signinmodal}>
                {/* <h1>SIGN UP</h1> */}

                <div className={classes.textboxcontainer}>

                  <div className={classes.usernamecontainer}>
                    <div className={classes.fillingerrors}>
                      <div className={classes.usernameicondiv}>
                        <img
                          src={require("./icons/username.png")}
                          className={classes.usernameicon}
                        />
                      </div>
                      <div className={classes.full}>
                        <input
                          id="name"
                          type="text"
                          placeholder="Full Name"
                          required
                          className={classes.textbox}
                        />
                      </div>
                    </div>
                    <div className={classes.errors}>  {errordisplayName}</div>
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
                      type="email"
                      placeholder="Email"
                      className={classes.textbox}
                      required
                    />
                  </div>

                  {/* <div className={classes.errors}>   {errordisplayEmail}</div> */}
                  <div className={classes.contactgendercontainer}>
                    <div className={classes.contactcontainer}>
                      <div className={classes.fillingerrors}>
                        <div className={classes.contacticondiv}>
                          <img
                            src={require("./icons/contact.png")}
                            className={classes.contacticon}
                          />
                        </div>
                        <div>
                          <input
                            id="phone"
                            type="text"
                            placeholder="Contact Number"
                            required
                            className={classes.textbox}
                          />
                        </div>
                      </div>
                      <div className={classes.errors}> {errordisplayPhone}</div>
                    </div>
                    <div className={classes.gendercontainer}>
                      <div className={classes.fillingerrors}>

                        <div className={classes.gendericondiv}>
                          <img
                            src={require("./icons/gender.png")}
                            className={classes.gendericon}
                          />
                        </div>
                        <div>
                          {/* <input
                            type="text"
                            id="gender"
                            name=""
                            placeholder="Gender"
                            className={classes.textbox}
                            required
                          /> */}
                          <select
                            name="gender"
                            required
                            id="gender"
                            placeholder="Select"
                            defaultValue={null}
                            className={classes.SG}
                            onChange={this.onChangeHandler}
                          > 
                            <option value="" disabled selected>Select</option>
                            <option className={classes.OG} value="Male">
                              Male
                            </option>
                            <option className={classes.OG} value="Female">
                              Female
                            </option>
                            <option className={classes.OG} value="Other">
                              Other
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className={classes.errors}> {errordisplayGender}</div>
                    </div>
                    <input
                      id="code"
                      type="text"
                      placeholder="code"
                      disabled
                      value={this.props.querycode}
                      required
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className={classes.collegecollegeidcontainer}>
                    <div className={classes.collegecontainer}>
                      <div className={classes.fillingerrors}>
                        <div className={classes.collegeicondiv}>
                          <img
                            src={require("./icons/College.png")}
                            className={classes.collegeicon}
                          />
                        </div>
                        <div>
                          <input
                            id="college"
                            type="text"
                            placeholder="College"
                            required
                            className={classes.textbox}
                          />
                        </div>
                      </div>

                      <div className={classes.errors}> {errordisplayCollege}</div>
                    </div>
                    <div className={classes.collegeidcontainer}>
                      <div className={classes.fillingerrors}>
                        <div className={classes.collegeidicondiv}>
                          <img
                            src={require("./icons/collegeId.png")}
                            className={classes.collegeidicon}
                          />
                        </div>
                        <div>
                          <input
                            id="clgid"
                            type="text"
                            required
                            placeholder="College ID"
                            className={classes.textbox}
                          />
                        </div>
                      </div>
                      <div className={classes.errors}> {errordisplayCollegeid}</div>
                    </div>

                  </div>
                  <div className={classes.departmentcontainer}>
                    <div className={classes.fillingerrors}>
                      <div className={classes.departmenticondiv}>
                        <img
                          src={require("./icons/dept.png")}
                          className={classes.departmenticon}
                        />
                      </div>
                      <div className={classes.full}>
                        <input
                          id="dep"
                          type="text"
                          placeholder="Department"
                          className={classes.textbox}
                          required
                        />
                      </div>
                    </div>
                    <div className={classes.errors}>   {errordisplayDepartment}</div>
                  </div>
                  <div className={classes.citystatecontainer}>
                    <div className={classes.citycontainer}>
                      <div className={classes.fillingerrors}>
                        <div className={classes.cityicondiv}>
                          <img
                            src={require("./icons/city.png")}
                            className={classes.cityicon}
                          />
                        </div>
                        <div>
                          <input
                            id="city"
                            type="text"
                            placeholder="City"
                            className={classes.textbox}
                            required
                          />
                        </div>
                      </div>
                      <div className={classes.errors}>  {errordisplayCity}</div>
                    </div>
                    <div className={classes.statecontainer}>
                      <div className={classes.fillingerrors}>
                        <div className={classes.stateicondiv}>
                          <img
                            src={require("./icons/state.png")}
                            className={classes.stateicon}
                          />
                        </div>
                        <div>

                          <input
                            id="state"
                            type="text"
                            placeholder="State"
                            required
                            className={classes.textbox}
                          />

                        </div>
                      </div>
                      <div className={classes.errors}>   {errordisplayState}</div>
                    </div>
                  </div>
                  {/* <div className="citystatecontainer"> */}
                  <div className={classes.passwordconfirmpasswordcontainer}>
                    <div className={classes.passwordcontainer}>
                      <div className={classes.fillingerrors}>
                        <div className={classes.full}>
                          <input
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            required
                            className={classes.textbox}
                          />
                        </div>
                      </div>
                      <div className={classes.errors}>{errordisplayPassword}</div>
                    </div>

                    <div className={classes.confirmpasswordcontainer}>

                      <div className={classes.fillingerrors}>
                        <div className={classes.full}>
                          <input
                            id="conpassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className={classes.textbox}
                          />
                        </div>
                      </div>

                      <div className={classes.errors}>  {errordisplayConPassword}</div>
                    </div>
                  </div>

                  <div className={classes.sign}>
                    <button type="submit" className={classes.Signupbtn}>
                      {this.props.loading ? (
                        <span style={{ marginRight: "9px" }}>
                          <TailSpin width="20" height="20" />
                          {/* Loading... */}
                        </span>
                      ) : (
                        "Sign UP"
                      )}


                    </button>
                    {/* <button type="button" className={classes.Signupbtn}>
                Sign Up with <span className={classes.googlelogo}>G</span>
              </button> */}
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.rightdiv}>
              {/* <img
          src={require("./Images/sidebg.png")}
          className={classes.satellite}
          alt="satellite"
        /> */}
              <img
                src="https://raw.githubusercontent.com/KSHITIJ-2024/media/a35b5c2b4a3e10c9ca5fc3ad69b4f286d1adc40b/astro%2Bsatellite.png"
                className={classes.astronaut}
              />
            </div>
          </div>
        </form>
      </>

      // <div className={Classes.form}>

      //   <form
      //     id='form'
      //     onSubmit={(e) => {
      //       ReactGa.event({
      //         category: 'Click',
      //         action: 'Clicked on Sign Up in Signuppage',
      //       })
      //       this.props.function(e)
      //     }}
      //     // className="forminner"
      //   >
      //     {' '}
      //     <Container>
      //       <Row>
      //         <Col className={Classes.signupform}>
      //           <div className={Classes.container}>
      //             <div className={Classes.input_icons}>
      //               <div className={Classes.inputRow}>
      //                 <FaUserAlt className={Classes.signupPage_icons} />

      //                 <input
      //                   className={[
      //                     Classes.input_field,
      //                     Classes.with_icon,
      //                   ].join(' ')}
      //                   id='name'
      //                   type='text'
      //                   placeholder='Full Name'
      //                   required
      //                 />
      //               </div>
      //               {errordisplayName}
      //               <div className={Classes.inputRow}>
      //                 {/* <i
      //               className={[Classes.fa, Classes.fa_user, Classes.icon].join(
      //                 ' '
      //               )}
      //             ></i> */}
      //                 <FaEnvelope className={Classes.signupPage_icons} />
      //                 <input
      //                   className={[
      //                     Classes.input_field,
      //                     Classes.with_icon,
      //                   ].join(' ')}
      //                   id='email'
      //                   type='text'
      //                   placeholder='Email'
      //                   disabled
      //                   value={this.props.queryemailid}
      //                   required
      //                 />
      //               </div>
      //               {errordisplayEmail}
      //               <div className={Classes.inputRow} style={{display:'none'}}>
      //                 {/* <i
      //               className={[Classes.fa, Classes.fa_user, Classes.icon].join(
      //                 ' '
      //               )}
      //             ></i> */}
      //                 <FaEnvelope className={Classes.signupPage_icons} />
      //                 <input
      //                   className={[
      //                     Classes.input_field,
      //                     Classes.with_icon,
      //                   ].join(' ')}
      //                   id='code'
      //                   type='text'
      //                   placeholder='code'
      //                   disabled
      //                   value={this.props.querycode}
      //                   required
      //                 />
      //               </div>

      //               {/* <div className="inputRow">
      //             <i className="fa fa-instagram icon"></i>
      //             <input className="input-field with-icon" type="text" placeholder="Email ID"/>
      //           </div> */}
      //               <div className={Classes.inputRow}>
      //                 <div className={Classes.inputCol}>
      //                   <FiPhoneCall className={Classes.signupPage_icons} />
      //                   <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.with_icon,
      //                     ].join(' ')}
      //                     id='phone'
      //                     type='text'
      //                     placeholder='Contact Number'
      //                     required
      //                   />
      //                   {errordisplayPhone}
      //                 </div>
      //                 <div
      //                   className={[Classes.inputCol, Classes.gender].join(' ')}
      //                 >
      //                   <BsGenderAmbiguous
      //                     className={Classes.signupPage_icons}
      //                   />
      //                   {/* <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.with_icon,
      //                     ].join(' ')}
      //                     id='gender'
      //                     type='text'
      //                     placeholder='Gender'
      //                   /> */}

      //                   <select
      //                     name=''
      //                     required
      //                     id='gender'
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.with_icon,
      //                     ].join(' ')}
      //                   >
      //                     <option value='Male'>Male</option>
      //                     <option value='Female'>Female</option>
      //                     <option value='Other'>Other</option>
      //                   </select>
      //                   {errordisplayGender}
      //                 </div>
      //               </div>
      //               <div className={Classes.inputRow}>
      //                 <div className={Classes.inputCol}>
      //                   <GiGraduateCap className={Classes.signupPage_icons} />
      //                   <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.with_icon,
      //                     ].join(' ')}
      //                     id='college'
      //                     type='text'
      //                     placeholder='College'
      //                     required
      //                   />
      //                   {errordisplayCollege}
      //                 </div>
      //                 <div className={Classes.inputCol}>
      //                   <FaPenNib className={Classes.signupPage_icons} />
      //                   <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.with_icon,
      //                     ].join(' ')}
      //                     id='clgid'
      //                     type='text'
      //                     required
      //                     placeholder='College ID'
      //                   />
      //                   {errordisplayCollegeid}
      //                 </div>
      //               </div>

      //               <div className={Classes.inputRow}>
      //                 <FaBuilding className={Classes.signupPage_icons} />
      //                 <input
      //                   className={[
      //                     Classes.input_field,
      //                     Classes.with_icon,
      //                   ].join(' ')}
      //                   id='dep'
      //                   type='text'
      //                   placeholder='Department'
      //                   required
      //                 />
      //               </div>
      //               {errordisplayDepartment}
      //               <div className={Classes.inputRow}>
      //                 <div className={Classes.inputCol}>
      //                   <FaCity className={Classes.signupPage_icons} />
      //                   <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.with_icon,
      //                     ].join(' ')}
      //                     id='city'
      //                     type='text'
      //                     placeholder='City'
      //                     required
      //                   />
      //                   {errordisplayCity}
      //                 </div>
      //                 <div className={Classes.inputCol}>
      //                   <FaMapMarkerAlt className={Classes.signupPage_icons} />
      //                   <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.with_icon,
      //                     ].join(' ')}
      //                     id='state'
      //                     type='text'
      //                     placeholder='State'
      //                     required
      //                   />
      //                   {errordisplayState}
      //                 </div>
      //               </div>

      //               <div className={Classes.inputRow}>
      //                 <div className={Classes.inputCol}>
      //                   <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.password_field,
      //                     ].join(' ')}
      //                     id='password'
      //                     type='password'
      //                     placeholder='Enter Password'
      //                     required
      //                   />{' '}
      //                   {errordisplayPassword}
      //                 </div>
      //                 <div className={Classes.inputCol}>
      //                   <input
      //                     className={[
      //                       Classes.input_field,
      //                       Classes.password_field,
      //                     ].join(' ')}
      //                     id='conpassword'
      //                     type='password'
      //                     placeholder='Confirm Password'
      //                     required
      //                   />{' '}
      //                   {errordisplayConPassword}
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //           <div style={{ width: '100%', paddingBottom: '10px' }}>
      //             <Button
      //               ClassName={Classes.button}
      //               variant='contained'
      //               color='primary'
      //               onClick={this.props.clicked}
      //               style={{ left: '40%' }}
      //             >
      //               <button
      //                 type='submit'
      //                 style={{
      //                   border: 'none',
      //                   color: 'inherit',
      //                   background: 'none',
      //                   padding: '0',
      //                   cursor: 'pointer',
      //                   outline: 'inherit',
      //                   display: 'flex',
      //                   alignItems: 'center',
      //                   justifyContent: 'center',
      //                 }}
      //               >
      //                 {this.props.loading ? (
      //                   <span style={{ marginRight: '9px' }}>
      //                     <TailSpin width='20' height='20' />
      //                   </span>
      //                 ) : (
      //                   ''
      //                 )}

      //                 <span style={{ fontFamily: 'NeueKabel' }}>Register</span>
      //               </button>
      //             </Button>
      //             <br />
      //           </div>

      //           {/* <div className={classesName}>
      //       <FontAwesomeIcon
      //         icon={faUser}
      //         className={`formLogo ${errors.username ? "red-icon" : ""}`}
      //       />
      //       <input id="name" type="text" placeholder="Full Name"></input>
      //     </div>
      //     {errordisplayName}

      //     <div className={classesEmail}>
      //       <FontAwesomeIcon
      //         icon={faEnvelope}
      //         className={`formLogo ${errors.email ? "red-icon" : ""}`}
      //       />
      //       <input id="email" type="email" placeholder="Email Address"></input>
      //     </div>
      //     {errordisplayEmail}
      //     <div className="sid">
      //       <div>
      //         <FontAwesomeIcon
      //           icon={faPeopleArrows}
      //           className={`formLogo ${errors.gender ? "red-icon" : ""}`}
      //         />
      //         <input
      //           id="gender"
      //           type="text"
      //           placeholder={"Gender"}
      //           className={classesGender}
      //         ></input>
      //         {errordisplayGender}
      //       </div>

      //       <div className="sidz">
      //         <FontAwesomeIcon
      //           icon={faPhoneAlt}
      //           className={`formLogo ${errors.phone ? "red-icon" : ""}`}
      //         />
      //         <input
      //           id="phone"
      //           type="tel"
      //           placeholder="Phone Number"
      //           className={classesPhone}
      //         ></input>
      //         {errordisplayPhone}
      //       </div>
      //     </div>
      //     <div className="sid2">
      //       <div>
      //         <FontAwesomeIcon
      //           icon={faGraduationCap}
      //           className={`formLogo2 ${errors.college ? "red-icon" : ""}`}
      //         />
      //         <input
      //           className={classesCollege}
      //           id="college"
      //           type="text"
      //           placeholder={"College"}
      //         ></input>
      //         {errordisplayCollege}
      //       </div>
      //       <div>
      //         <FontAwesomeIcon
      //           icon={faPen}
      //           className={`formLogo2 ${errors.collegeid ? "red-icon" : ""}`}
      //         />
      //         <input
      //           className="input-flex"
      //           id="clgid"
      //           type="text"
      //           placeholder="College ID"
      //           className={classesCollegeid}
      //         ></input>
      //         {errordisplayCollegeid}
      //       </div>
      //     </div>
      //     <div className={classesDepartment}>
      //       <FontAwesomeIcon
      //         icon={faBook}
      //         className={`formLogo ${errors.department ? "red-icon" : ""}`}
      //       />
      //       <input id="dep" type="text" placeholder="Department"></input>
      //     </div>
      //     {errordisplayDepartment}
      //     <div className="sid2">
      //       <div>
      //         <FontAwesomeIcon
      //           icon={faCity}
      //           className={`formLogo2 ${errors.city ? "red-icon" : ""}`}
      //         />
      //         <input
      //           className="input-flex"
      //           id="city"
      //           type="text"
      //           placeholder="City"
      //           className={classesCity}
      //         ></input>
      //         {errordisplayCity}
      //       </div>
      //       <div>
      //         <FontAwesomeIcon
      //           icon={faHotel}
      //           className={`formLogo2 ${errors.state ? "red-icon" : ""}`}
      //         />
      //         <input
      //           className="input-flex"
      //           id="state"
      //           type="text"
      //           placeholder="State"
      //           className={classesState}
      //         ></input>
      //         {errordisplayState}
      //       </div>
      //     </div>
      //     <div className="sid2">
      //       <div>
      //         <FontAwesomeIcon
      //           icon={faLock}
      //           className={`formLogo2 ${errors.password ? "red-icon" : ""}`}
      //         />
      //         <input
      //           className={classesPassword}
      //           id="password"
      //           type="Password"
      //           placeholder="Password"
      //         ></input>
      //         {errordisplayPassword}
      //       </div>

      //       <div>
      //         <FontAwesomeIcon
      //           icon={faLock}
      //           className={`formLogo2 ${errors.conpassword ? "red-icon" : ""}`}
      //         />
      //         <input
      //           className={classesConPassword}
      //           id="conpassword"
      //           type="Password"
      //           placeholder="Confirm Password"
      //         ></input>
      //         {errordisplayConPassword}
      //       </div>
      //     </div>
      //     <button type="submit" className="formSubmit">Sign Up</button> */}
      //         </Col>
      //       </Row>
      //     </Container>
      //   </form>
      // </div>
    );
  }
}

export default signupform;

 
 // THIS PAGE FOR SEE IMPLEMENT OF CSS OF ORIGINAL PAGE BECUSE IN LOCALHOST BACKEND CANT RUN.....
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Table.module.css";
import responsiveObserve from "antd/lib/_util/responsiveObserve";
import ReactGa from "react-ga";
import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../api";
// import {useForm} from 'react-hook-form'
import { updateUserInfo } from "../../actions/authActions";
function tabnew() {
    return (
        <div className={classes.head}>
           
          
            <div className={classes.form}>
              <form
                className={classes.ftag}
                id="form"
                 
              >
                <div className={classes.IForm}>
                  <div className={classes.fNameR}>
                    {/* <div className={classes.fkeyName}>Name :</div> */}
                    <input
                      className={classes.fvalueName}
                      // id="name"
                      name="name"
                      type="text"
                      disabled
                      placeholder="Full Name"
                      value={"Souvik Mondal"}
                      required
                         
                    />
                  </div>
  
                  <div className={classes.Row}>
                    <div className={classes.fkey}>{"KTJ ID :"}</div>
                    <input
                      className={classes.fvalue}
                      name="ktjID"
                      id="ktjID"
                      type="text"
                      value={"21KTJJJJJ123456"}
                      disabled
                      required
                    />
                  </div>
  
                  <div className={classes.Row}>
                    <div className={classes.fkey}>{"Email ID :"}</div>
                    <input
                      className={classes.fEvalue}
                      name="email"
                      id="email"
                      type="text"
                      disabled
                      placeholder="Email"
                      value={"greeshraj234@gmail.com"}
                      required
                    />
                  </div>
  
                  <div className={classes.Row}>
                    <div className={classes.fkey}>{"Contact Number :"}</div>
                    <input
                      className={classes.fvalue}
                      name="phone"
                      id="phone"
                      type="text"
                      disabled
                      pattern="[1-9]{1}[0-9]{9}"
                      value={"93017901520"}
                      placeholder="Contact Number"
                         
                      required
                    />
                  </div>
                   
                  <div className={classes.GRow}>
                    <div className={classes.Gkey}>{"Gender :"}</div>
                    <select
                      disabled
                      name="gender"
                      required
                      id="gender"
                      className={classes.SG}
                         
                      value={"Male"}
                    >
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
  
                  <div className={classes.Row}>
                    <div className={classes.fkey}>{"College ID :"}</div>
                    <input
                      className={classes.fvalue}
                      name="collegeid"
                      id="clgid"
                      type="text"
                      disabled
                      value={"greeshrajgreeshraj@kgpian.iitkgp.ac.in"}
                      placeholder="College ID"
                         
                      required
                    />
                  </div>
  
                  <div className={classes.Row}>
                    <div className={classes.fkey}>{"Department :"}</div>
                    <input
                      disabled
                      className={classes.fvalue}
                      id="dep"
                      name="department"
                      type="text"
                      placeholder="Department"
                      value={"HumanitiesHumanities And Social Sciences"}
                         
                      required
                    />
                  </div>
  
                  <div className={classes.Row}>
                    <div className={classes.fkey}>{"City State :"}</div>
                    <input
                      className={classes.fCSvalue1}
                      id="city"
                      name="city"
                      disabled
                      type="text"
                      placeholder="City"
                      required
                      value={"MahobaMahoba"}
                         
                    />
  
                    <input
                      className={classes.fCSvalue2}
                      id="state"
                      name="state"
                      disabled
                      type="text"
                      placeholder="State"
                      value={"Uttar Pradesh"}
                         
                      required
                    />
                  </div>
                  <div className={classes.ERow}>
                    <div className={classes.fkey}>{"Registered Events :"}</div>
                    <div className={classes.fTvalue}>
                       
                    </div>
                  </div>
                  
                </div>
  
                {/* <div className={classes.SPBdiv}>
                  <button
                    className={classes.SPButton}
                    type="submit"
                    onClick={(e) => {
                      ReactGa.event({
                        category: "Click",
                        action: "Clicked Edit Profile button",
                      });
                    }}
                  >
                    Edit Details
                  </button>
                  <br />
                </div> */}
              </form>
            </div>
    
          <div className={classes.imgDiv}>
          <img
          src={require("./Images/astro+satellite.png")}
          className={classes.image1}
        />
          </div>
        </div>
      );
}

export default tabnew
 
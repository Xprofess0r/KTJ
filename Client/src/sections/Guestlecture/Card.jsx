//card
import React, { useEffect } from "react";
import classes from "./Card.module.css"
import { connect, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import api from "../../api"
import {
  message,
} from "antd";

const card = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const openInNewTab = (gid) => {
    console.log(auth?.isAuthenticated)
    if (auth?.isAuthenticated != true)
      navigate("/signin");

    api
      .post('/guestLectures/register', { ktjID: auth.user?.ktjID, glId: gid })
      .then((response) => {
        if (response.status == 200) {
          const data = response.data;
          message.success('Registered successfully!');
          navigate('/Accommodation');
        }
      })
      .catch((error) => {
        console.log('err', error);
        if (error.response.status === 300) {
          navigate('/Accommodation');
          message.success('Already registered!')
        } else {
          message.error('Something went wrong!');
        }
      })
  }

  return (<div className={classes.CardContainer}>

    <div className={classes.cardDiv}>
      <div className={classes.imgC}>
        <img src={props.gInfo.imageUrl} alt="" />
        <div className={classes.descGL}>{props.gInfo.lectureDescription}</div>
        <button className={classes.btnReg} onClick={(e) => { openInNewTab(props.gInfo._id) }}><span className={classes.reg}>REGISTER</span></button>
        {/* <button className={classes.btnJoin} onClick={() => { openInNewTab(props.join1)}}>JOIN</button> */}
      </div>
      {/* <p>{props.gInfo.g1}</p> */}
    </div>
  </div>)
}

export default card


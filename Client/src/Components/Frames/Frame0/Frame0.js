import React from "react";
import classes from "./Frame0.module.css";
import { ReactSVG } from "react-svg";
import building from "../../../images/homepage/Central Building.svg";
import Frame12 from "../Frame12/Frame12";
import Frame34 from "../Frame34/Frame34";
import Frame56 from "../Frame56/Frame56";

import spacetowerlight from "../../../images/homepage/Space tower light.png";
import skyline from "../../../images/homepage/skyline.png";
import Countdown from "../../Countdown/Countdown";

const Frame0 = (props) => (
  <div className={classes.container}>
    <div className={classes.homepagebackground}>
      <div className={classes.imgcontainer + " " + classes.starssvg}>
        <div></div>
      </div>
      <div className={classes.imgcontainer + " " + classes.clouds}>
        <div></div>
      </div>
    </div>
    <div
      className={classes.Homepage + " " + classes.normal}
      id="homepage"
      onWheel={props.onWheel}
      onTransitionEnd={props.onTransitionEnd}
    >
      <ReactSVG
        src={building}
        renumerateIRIElements={false}
        className={classes.buildingsvg}
      />
      <div className={classes.imgcontainer + " " + classes.spacetowerlight}>
        <img src={spacetowerlight} alt=""></img>
      </div>
      <div className={classes.imgcontainer}>
        <img src={skyline} alt="" style={{ height: "100%" }}></img>
      </div>
      <Countdown />
      <Frame12 frame={props.frame} />
      <Frame34 frame={props.frame} />
      <Frame56 frame={props.frame} />
    </div>
  </div>
);

export default Frame0;

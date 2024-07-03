import classes from "./ComingSoon.module.css";

import React, { Component } from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <>
      <div className={classes.comsouterdiv}>
        <div
          className={classes.overlaycoms}
          style={{
            backgroundImage: `url("https://i.postimg.cc/cJkmLxcr/egradient.png")`,
          }}
        ></div>
        <div className={classes.containercoms}>
          <div className={classes.comstext}>
            <div className={classes.comscoming}>
              C
              <img
                src="https://i.postimg.cc/mrgj4zCv/clockpng2.png"
                className={classes.comsclock}
              ></img>
              ming
            </div>
            <div className={classes.comssoon}>
              S
              <img
                src="https://i.postimg.cc/mrgj4zCv/clockpng2.png"
                className={classes.comsclock}
              ></img>
              <img
                src="https://i.postimg.cc/mrgj4zCv/clockpng2.png"
                className={classes.comsclock}
              ></img>
              n
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;

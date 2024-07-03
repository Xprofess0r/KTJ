import classes from "./Error.module.css";

import React, { Component } from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div
        className={classes.errorouterdiv}
      >
        <div
          className={classes.overlayerror}
          style={{ backgroundImage: `url("https://i.postimg.cc/cJkmLxcr/egradient.png")` }}
        ></div>
        <div className={classes.containererror}>
          <div className={classes.errortext}>Error</div>
          <div className={classes.errorfourofour}>
            4
            <img src="https://i.postimg.cc/mrgj4zCv/clockpng2.png" className={classes.errorclock}></img>
            4
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
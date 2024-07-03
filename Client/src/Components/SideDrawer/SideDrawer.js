import React from "react";
import classes from "./SideDrawer.module.css";

function SideDrawer(props) {
  let Class = [classes.SideDrawer, classes.Hide];
  if (props.show) {
    Class = [classes.SideDrawer, classes.Show];
  }
  return (
    <div className={Class.join(" ")}>
      <div
        className={classes.SideDrawerCloseBtn}
        onClick={props.toggleSideDrawer}
      >
        <span className={classes.KTJHeading}>KTJ</span>
        <span>
          <i className="fas fa-arrow-left"></i>
        </span>
      </div>
      <div>Events </div>
      <div>Activities</div>
      <div>Regionals</div>
      <div>Campus Ambassadors</div>
      <div>Merchandise</div>
      <div>Contact Us</div>
      <div>Sign In</div>
    </div>
  );
}

export default SideDrawer;

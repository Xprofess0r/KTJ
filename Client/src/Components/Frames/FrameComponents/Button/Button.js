import React from "react";
import classes from "./Button.module.css";

const Button = (props) => (
  <button
    className={
      classes.Button +
      " " +
      (props.secondary ? classes.secondary : classes.primary)
    }
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default Button;

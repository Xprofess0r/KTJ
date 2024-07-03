import React from "react";
import classes from "./Window.module.css";

const window = (props) => {
  return (
    <div className={classes.window + " " + props.className}>
      <video style={{ opacity: props.off ? ".3" : "1" }} autoPlay muted loop>
        <source src={props.src} type="video/webm"></source>
      </video>
    </div>
  );
};

export default window;

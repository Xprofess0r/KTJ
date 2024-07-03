import React, { useEffect, useRef } from "react";
import classes from "./Description.module.css";

const Description = (props) => {
  let wasscrolling = false,
    cooldown = false;
  const descbox = useRef(null);
  useEffect(() => {
    descbox.current.addEventListener("wheel", (e) => {
      let el = e.currentTarget;
      if (
        (e.deltaY > 0 &&
          el.scrollTop + el.clientHeight + 1 < el.scrollHeight) ||
        (e.deltaY < 0 && el.scrollTop > 0)
      ) {
        e.stopPropagation();
        wasscrolling = true;
      } else if (wasscrolling) {
        e.stopPropagation();
        cooldown = true;
        wasscrolling = false;
        setTimeout(() => {
          cooldown = false;
        }, 500);
      } else if (cooldown) e.stopPropagation();
    });
  });
  return (
    <div ref={descbox} className={classes.Description}>
      {props.children}
    </div>
  );
};

export default Description;

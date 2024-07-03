import React, { useEffect, useState } from "react";
import Bullet from "./Bullets.js";
import classes from "./Bullets.module.css"

function Container(props) {
  const [glow, setGlow] = useState(1);
  const handleScroll = () => {
    if (props.page===1) {
      if(glow>1) {props.setCoolDown(2); props.setMovingRight(false)}
      setGlow(1)
    }
    else if (props.page===2) {
      if(glow<2) {props.setCoolDown(1); props.setMovingRight(true)}
      if(glow>2) {props.setCoolDown(2); props.setMovingRight(false)}
      setGlow(2);
    }
    else if (props.page===3) {
      if(glow<3) {props.setCoolDown(1); props.setMovingRight(true)}
      if(glow>3) {props.setCoolDown(2); props.setMovingRight(false)}
      setGlow(3);
    }
    else if (props.page===4) {
      if(glow<4) {props.setCoolDown(1); props.setMovingRight(true)}
      if(glow>4) {props.setCoolDown(2); props.setMovingRight(false)}
      setGlow(4);
    }
    else if (props.page===5) {
      if(glow<5) {props.setCoolDown(1); props.setMovingRight(true)}
      if(glow>5) {props.setCoolDown(2); props.setMovingRight(false)}
      setGlow(5);
    }
    else if (props.page===6) {
      if(glow<6) {props.setCoolDown(1); props.setMovingRight(true)}
      setGlow(6);
    }
  }
  useEffect(() => {
    handleScroll();
  });
  return (
    <div className={classes.container}>
      <Bullet glow={glow===1} obj={props.obj.obj1} func={props.func} name = "Home"/>
      <Bullet glow={glow===2} obj={props.obj.obj2} func={props.func} name = "Events"/>
      <Bullet glow={glow===3} obj={props.obj.obj3} func={props.func} name = "Activities"/>
      <Bullet glow={glow===4} obj={props.obj.obj4} func={props.func} name = "Theme"/>
      <Bullet glow={glow===5} obj={props.obj.obj5} func={props.func} name = "Initiatives"/>
      <Bullet glow={glow===6} obj={props.obj.obj6} func={props.func} name = "Sponsors"/>
    </div>
  );
};
export default Container;

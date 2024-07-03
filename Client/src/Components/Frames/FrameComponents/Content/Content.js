import React from "react";
import classes from "./Content.module.css";
import Wrapper from "../../../../Utils/Wrapper";
import { CSSTransition } from "react-transition-group";

const Content = (props) => {
  return (
    <CSSTransition
      in={props.frame === props.thisframe}
      classNames="frame__content"
      timeout={1000}
      mountOnEnter
      unmountOnExit
    >
      <div className={classes.left_content}>
        <div className={classes.left_content_firstDiv}>
          {props.orientation === "left" ? (
            <Wrapper>
              <div className={classes.aboutUs}>{props.Heading}</div>
              <div className={classes.Video2}>
                <video autoPlay muted loop>
                  <source src={props.gif} type="video/webm" />
                </video>
              </div>
            </Wrapper>
          ) : (
            <Wrapper>
              <div className={classes.Video2}>
                <video autoPlay muted loop>
                  <source src={props.gif} type="video/webm" />
                </video>
              </div>
              <div className={classes.aboutUs}>{props.Heading}</div>
            </Wrapper>
          )}
        </div>
        {props.children}
      </div>
    </CSSTransition>
  );
};

export default Content;

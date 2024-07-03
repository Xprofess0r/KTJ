import React from "react";
import Window from "../FrameComponents/Window/Window";
import classes from "./Frame56.module.css";
import Frame5_video1 from "../../../Videos/Frame5_video1.webm";
import Frame5_video2 from "../../../Videos/Frame5_video2.webm";
import Frame6_video1 from "../../../Videos/Frame6_video1.webm";
import Frame6_video2 from "../../../Videos/Frame6_video2.webm";
import Content from "../FrameComponents/Content/Content";
import Button from "../FrameComponents/Button/Button";
import Description from "../FrameComponents/Description/Description";
import { Link } from "react-router-dom";
import { regForNewsletters } from "../../../actions/authActions";
import ReactGa from "react-ga";

const submitform = () => {
  ReactGa.event({
    category: "Click",
    action: "Clicked on Submit in Newsletters Homepage",
  });
  let email = document.getElementById("newsletter-email").value;
  regForNewsletters(email);
};

const Frame56 = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Window
          className={classes.window1}
          src={Frame5_video1}
          off={props.frame === 6}
        />
        <Window
          className={classes.window2}
          src={Frame6_video1}
          off={props.frame === 5}
        />
      </div>
      <div className={classes.right}>
        <Content
          gif={Frame5_video2}
          frame={props.frame}
          Heading={"Sponsors"}
          orientation="right"
          thisframe={5}
        >
          <Description>
            Our sponsors are an integral part of our fest culture, and we look
            forward to them as our partners in innovative education. We are
            incredibly thankful to each sponsor and partner, without whom the
            symposium would not be possible. For more details on our sponsors,
            kindly check out the sponsors' page.
          </Description>
          <Link
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on Know More in Sponsors-Homepage",
              });
              window.scroll({ left: 0, top: 0, behavior: "smooth" });
            }}
            to="/sponsors"
          >
            <Button secondary>Click to know more</Button>
          </Link>
        </Content>
        <Content
          gif={Frame6_video2}
          frame={props.frame}
          Heading={"Register For Newsletters"}
          orientation="right"
          thisframe={6}
        >
          {/* <Description>{content}</Description> */}
          <div className={classes.frameEmail}>
            <label htmlFor="email">Email ID </label>
            <input
              type="Email"
              name="email"
              id="newsletter-email"
              className={classes.inputEmail}
            />
          </div>
          <Button onClick={submitform} primary>
            Register Now
          </Button>
        </Content>
      </div>
    </div>
  );
};

export default Frame56;

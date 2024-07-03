import React from "react";
import Window from "../FrameComponents/Window/Window";
import classes from "./Frame12.module.css";
import Content from "../FrameComponents/Content/Content";
import Frame1_video1 from "../../../Videos/Frame1_video1.webm";
import Frame1_video2 from "../../../Videos/Frame1_video2.webm";
import Frame2_video1 from "../../../Videos/Frame2_video1.webm";
import Frame2_video2 from "../../../Videos/Frame2_video2.webm";
import Button from "../FrameComponents/Button/Button";
import Description from "../FrameComponents/Description/Description";
const Frame12 = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Content
          gif={Frame1_video2}
          frame={props.frame}
          Heading={"About Us"}
          orientation="left"
          thisframe={1}
        >
          <Description>
            Kshitij, the annual techno-management symposium of IIT Kharagpur,
            has been going from strength to strength, celebrating the spirit of
            science and technology, congregating students all over India to
            showcase their scientific and managerial dexterity. <br />
            <br />
            We are known to provide an assorted mix of a galaxy of events with
            the synchronized conduction of workshops, technical exhibitions, and
            guest lectures by people of the utmost stature in the fields of
            technology and entrepreneurship. Events spread across from
            technology to management provides students with the opportunity to
            gauge their strengths and aim higher than ever before. From applying
            their technical know-how to presenting their ideas in front of
            potential investors, Kshitji has been challenging students to come
            up with something unique, which they have successfully done year
            after year.
          </Description>
        </Content>
        <Content
          gif={Frame2_video2}
          frame={props.frame}
          Heading={"Growth"}
          orientation="left"
          thisframe={2}
        >
          <Description>
            Since its inception in 2004, Kshitij has grown to be Asia's largest
            Techno-management festival. Year after year, Kshitij has empowered
            the technically inclined youth with the opportunities to showcase
            their talents, get recognized & rewarded, and get unique learning
            experiences. With the ever-increasing reach and participation from
            various technical institutes and educational communities across the
            world, Kshtitij offers exposure to cutting edge technologies and
            skills that inspire the youth to build world-changing solutions
            using technology.
          </Description>
        </Content>
      </div>
      <div className={classes.right}>
        <Window
          className={classes.window1}
          src={Frame1_video1}
          off={props.frame === 2}
        />
        <Window
          className={classes.window2}
          src={Frame2_video1}
          off={props.frame === 1}
        />
      </div>
    </div>
  );
};

export default Frame12;

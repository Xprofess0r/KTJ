import React from "react";
import Window from "../FrameComponents/Window/Window";
import classes from "./Frame34.module.css";
import Frame3_video1 from "../../../Videos/Frame3_video1.webm";
import Frame3_video2 from "../../../Videos/Frame3_video2.webm";
import Frame4_video1 from "../../../Videos/Frame4_video1.webm";
import Frame4_video2 from "../../../Videos/Frame4_video2.webm";
import Content from "../FrameComponents/Content/Content";
import Button from "../FrameComponents/Button/Button";
import Description from "../FrameComponents/Description/Description";

const Frame34 = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.right}>
        <Window
          className={classes.window1}
          src={Frame3_video1}
          off={props.frame === 4}
        />
        <Window
          className={classes.window2}
          src={Frame4_video1}
          off={props.frame === 3}
        />
      </div>
      <div className={classes.left}>
        <Content
          gif={Frame3_video2}
          frame={props.frame}
          Heading={"Theme"}
          orientation="right"
          thisframe={3}
        >
          <Description>
            Future is definitely something to behold. Our actions continuously
            mold and redefine our future, navigating us through the infinite
            possibilities. <br />
            <br /> Over the ages, people with hope and belief have looked onto
            the sun on the horizon, pondering over the transient nature of this
            world. Always wishing for a way to get a glimpse of what awaits
            them. This is one of the very few constants that remain as we
            transition from one timeline to another. <br />
            <br />
            Kshitij, IIT Kharagpur is proud to present the theme of its 18th
            edition, Ticking Timelines.
          </Description>
        </Content>
        <Content
          gif={Frame4_video2}
          frame={props.frame}
          Heading={"Initiatives"}
          orientation="right"
          thisframe={4}
        >
          <Description>
            Apart from the events, workshops, exhibitions and the other host of
            activities that takes place in Kshitij, we also take up social
            initiatives every year in an endeavor to make a difference in
            society. Giving back can provide your life with more meaning and
            make you grow in unexpected ways. It is a way of being a better
            person and living your values every day. <br />
            <br />
            Some of the initiatives taken up in the previous editions were:
            <br />
            <ul style={{ listStylePosition: "inside" }}>
              <li>
                Astitva, an initiative to bring about awareness about mental
                health care.
              </li>
              <li>
                Prakriti, an initiative to optimize solid waste management using
                Artificial Intelligence and concepts of Robotics.
              </li>
              <li>
                Sankalp, an initiative taken up in association with UNICEF with
                an aim to work towards eradicating child malnutrition.
              </li>
              <li>
                Digital India Summit, held under the aegis of Prime Minister
                Narendra Modi's vision to make all parts of the country
                digitally empowered in the field of technology.
              </li>
              <li>
                An initiative was taken up in association with PETA to voice the
                need for the ethical treatment of animals.
              </li>
              <li>
                Ankur, in association with Kailash Satyarthi Children
                Foundation, conducted a campaign for educating children in rural
                areas.
              </li>
              <li>
                Illuminate, in association with the NGO Drishti, working towards
                the cause of eye donation.
              </li>
            </ul>
            <br />
            No matter who you are, being an altruist, and helping others will
            enhance your life and create new opportunities for connection,
            self-efficacy, and confidence. For the upcoming edition, we plan to
            conduct a social initiative keeping in mind our commitments and
            vision for a better world. We believe that changes at a small level
            can have a huge impact and that is our responsibility to make this
            happen as makers of social change.
          </Description>
          {/** <Button>Click to know more</Button>*/}
        </Content>
      </div>
    </div>
  );
};

export default Frame34;

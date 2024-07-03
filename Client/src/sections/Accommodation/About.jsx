import React from "react";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate(-1); 
      };
  return (
    <div className={classes.containerk}>
      <div className={classes.container1}>
        <div className={classes.headerA}>ABOUT</div>
        <div className={classes.backBtn} onClick= {handleBackButtonClick}>
          <span>{"<"}</span>
          <span>BACK</span>
        </div>
        <div className={classes.matter}>
          Kshitij, IIT Kharagpur, has been hosting participants from all across India since its inception in 2004. The fest has come a long way since then in both volume of participants and the technological depth of events, hosting as many as 70,000 Participants in over 37 events. But still, as every year passes, we have felt more effortless and easier to accommodate all the participants here, thanks to the energy we get by seeing such a huge crowd gathered on the campus of IIT Kharagpur, which is the oldest and largest of all IITs.

          “Think. Create. Enjoy.” This is the motto of Kshitij. All the work we do, and all the events we organize have the sole purpose to make students experience the ideals of our motto. We take every step and turn every corner to remove as many obstacles as we can from the path of students in reaching our campus to take part in various competitions.

          Thanks to our campus's sheer size and infrastructure, we can proudly say that all the participants we have accommodated till now are completely satisfied, and we are sure that's how participants of this year will feel.

        </div>

      </div>
    </div>
  )

}

export default About
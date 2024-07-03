import React from "react";
import classes from "./ScheduleCard.module.css";
import ReactGa from "react-ga";

function ScheduleCard(props) {
  return (
    <div className={classes.ScheduleCard}>
      <div className={classes.ScheduleCard_ImgCnt}>
        <img className={classes.ScheduleCard_ImgCnt} src={props.Image} />
      </div>
      <div className={classes.InfoCnt}>
        <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          {props.event}
        </div>
        <div className={classes.InfoCnt_time}>
          <div className={classes.ScheduleCard_Host}>{props.Host}</div>
          <div className={classes.InfoCnt_timeCnt}>{props.Timing}</div>
        </div>
        <div className={classes.ScheduleCard_company}>{props.company}</div>
        <div>{props.About}</div>
        <a
          href={props.link}
          target="_blank"
          className={classes.joinbtn}
          onClick={() => {
            ReactGa.event({
              category: "Click",
              action:
                "Clicked the Join here button in schedule for " + props.event,
            });
          }}
        >
          Join Here
        </a>
      </div>
    </div>
  );
}

export default ScheduleCard;

import React from "react";
import classes from "./ScheduleCard1.module.css";
import ReactGa from "react-ga";

function ScheduleCard(props) {
  return (
        <div className={classes.ScheduleCard}>
            <div className={classes.ScheduleCard_ImgCnt}>
                <img className={classes.ScheduleCard_ImgCnt} src={props.imageUrl} />
            </div>
            <div className={classes.InfoCnt}>
                <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    {props.title}
                </div>
                <div className={classes.InfoCnt_time}>
                    <div className={classes.ScheduleCard_Host}>{props.deadline}</div>
                </div>
                <div className={classes.ScheduleCard_company}>{props.company}</div>
                <div>{props.content}</div>
                {/* <div className={classes.InfoCnt_timeCnt}>{props.deadline}</div> */}
                {
                    (props.link != "")?
                        <a
                        href={props.registration_link}
                        target="_blank"
                        className={classes.joinbtn}
                        onClick={() => {
                            ReactGa.event({
                            category: "Click",
                            action: "Clicked the Join here button in schedule for " + props.event,
                            });
                        }}
                        >
                            Explore Now
                        </a>
                    :
                        null
                }
                
                
            </div>
        </div>
    );
}

export default ScheduleCard;

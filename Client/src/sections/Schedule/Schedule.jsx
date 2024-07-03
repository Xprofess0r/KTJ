import React, { useState, useEffect } from "react";
import axios from "../../api";
import classes from "./Schedule.module.css";

const DataBox = (props) => {
  const event = props.event;
  const index = props.index;
  return (
    <div className={classes.box} key={index}>
      <img className={classes.eventPoster} src={event.imageUrl} />
      <div className={classes.eventDetails}>
        <span className={classes.eventCompany}>{event.title}</span>
        <br />
        <span className={classes.eventDescription}>
          <b>Type: </b>
          {event.type}
        </span>
        <br />
        <span className={classes.eventDescription}>
          <b>Starting Time:</b>
          {event.startingTime}
        </span>
        <br />
        <span className={classes.eventDescription}>
          <b>Ending Time: </b>
          {event.endingTime}
        </span>
        <br />
        <span className={classes.eventDescription}>
          <b>Description: </b>
          {event.description}
        </span>
        <br />
        <span className={classes.eventDescription}>
          <b>Date: </b>
          {event.date}
        </span>
        <br />
        <span className={classes.eventDescription}>
          <b>{event.joiningLinkText}: </b>
          {event.joiningLink}
        </span>
      </div>
    </div>
  );
};

const Schedule = () => {
  const [dataloading, setdataLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = async () => {
    setdataLoading(true);
    try {
      const res = await axios.get("/schedule/");
      console.log(res.data);
      const data = res.data.schedule.map((schedule) => ({
        ...schedule,
        actions: schedule,
      }));
      setSchedules(data);
    } catch (err) {
      console.log(err);
    } finally {
      setdataLoading(false);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.heading}>SCHEDULE</div>
        <div className={classes.Outerbox}>
          <div className={classes.left}>
            {schedules
              .filter((event, index) => index % 2)
              .map((event, index) => (
                <DataBox event={event} index={index} />
              ))}
          </div>
          <div className={classes.right}>
            {schedules
              .filter((event, index) => !(index % 2))
              .map((event, index) => (
                <DataBox event={event} index={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;

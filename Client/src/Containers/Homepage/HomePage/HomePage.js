import React from "react";
import classes from "./HomePage.module.css";
import timmer from "./timing.png"
// import Timer from "../../Timer/Timer";

// import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
const Elements = () => {
  return (
    <div className={classes.container}>
      <div>
        <img
          className={classes.planet}
          src="https://i.imgur.com/Pak2qXx.png"
          alt=""
        />
      </div>
      <div>
        {/*<img
          className={classes.meteorite}
          src="https://github.com/KSHITIJ-2024/media/blob/main/meteorite%20home.png?raw=true"
          alt=""
  />*/}
        <picture >
          <source media="(max-width: 480px)" srcset="https://i.imgur.com/26Ke5ve.png" />
          <img className={classes.meteorite} src="https://i.imgur.com/U7DbDQq.png" alt="asteroids" />
        </picture>

        <img className={classes.meteorite2} src="https://i.imgur.com/MvbPzlK.png" alt="asteroids" />
        <img className={classes.movingmeteorite} src="https://i.imgur.com/ifOx5sj.png" alt="asteroids" />
        <img className={classes.movingmeteorite2} src="https://i.imgur.com/ifOx5sj.png" alt="asteroids" />
        <img className={classes.movingmeteorite3} src="https://i.imgur.com/ifOx5sj.png" alt="asteroids" />

        <img className={classes.movingmeteorite4} src="https://i.imgur.com/ifOx5sj.png" alt="asteroids" />
        <img className={classes.movingmeteorite5} src="https://i.imgur.com/ifOx5sj.png" alt="asteroids" />
        <img className={classes.movingmeteorite7} src="https://i.imgur.com/ifOx5sj.png" alt="asteroids" />
        <img className={classes.movingmeteorite6} src="https://i.imgur.com/ifOx5sj.png" alt="asteroids" />
      </div>
      <div className={classes.ilutimer}>
        <div>
          <img
            className={classes.ilu}
            src="https://i.imgur.com/E2Mbajv.png"
            alt=""
          />
          <img
            className={`${classes.ilu} ${classes.timer2}`}
            src={timmer}
            alt=""
          />
        </div>
        <div className={classes.timerrimg }>
          <div className={classes.timer}>
            <Countdown className={classes.livetime} style={{ color: "red", border: "2px" }} date={new Date("Jan 20, 2024 00:00:00")}>
              <button class={classes.noselect}></button>
            </Countdown>
            {/* <h18>Timerrrrrrrrrrrrrrrrrrrr</h18> */}
          </div>
        </div>
      </div>
      <div>
        <img
          className={classes.spaceship}
          src="https://i.imgur.com/VM2sQ5J.png"
          alt="new"
        />
      </div>
    </div>
  );
};

export default Elements;

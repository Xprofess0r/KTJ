import React from "react";
import classes from "./ActivityPage.module.css";
import Card from "../../../Cards/Card"

const Elements = () => {
  return (
    <div className={classes.container}>
      <div>
       {/* <img
          className={classes.asteroids}
          src="https://github.com/KSHITIJ-2024/media/blob/main/asteroids_theme_page.png?raw=true"
          alt="asteroids"
  />*/}
  <picture >
    <source media="(max-width: 480px)" srcset="https://i.imgur.com/wQdSqA5.png" />
    <img className={classes.asteroids} src="https://i.imgur.com/ENReTvx.png" alt="Asteroids" />
</picture>
<img className={classes.asteroidsA1} src="https://i.imgur.com/2yPcR0k.png" alt="Asteroids" />
<img className={classes.asteroidsA2} src="https://i.imgur.com/OhFiSdZ.png" alt="Asteroids" />
      </div>
      <div>
        <img
          className={classes.satellite}
          src="https://i.imgur.com/RuVwmb1.png"
          alt="satellite"
        />
        
      </div>
      <div>
        <img
          className={classes.satelliteO}
          src="https://i.imgur.com/BG6aSpk.png"
          alt="satellite"
        />
      </div>

      <div>
        <img
          className={classes.dish_relay}
          src="https://i.imgur.com/tJ4tPeY.png"
          alt="dish_relay"
        />
      </div>
      <div className={classes.posA}><Card head=<span className={classes.HeA}>Activities</span> desc=<span className={classes.DeA}>
      Kshitij organizes a range of activities including Guest Lectures, workshops, Exhibitions, Auto Expos, and Mega shows with some eminent personalities, bleeding-edge technologies, and astounding DJs from all over the world.</span>></Card></div>
    </div>
  );
};

export default Elements;

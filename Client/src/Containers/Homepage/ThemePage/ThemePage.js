import React from "react";
import { useState, useEffect } from 'react'
import classes from "./ThemePage.module.css";
import Card from '../../../Cards/Card';

const Elements = () => {
  return (
    <div className={classes.container}>

      
  
      <div>
        {/*<img
          className={classes.asteroids}
        
          src="https://github.com/KSHITIJ-2024/media/blob/main/asteroids_theme_page.png?raw=true"

          alt="asteroids"
  />*/} <picture >
    <source media="(max-width: 480px)" srcset="https://i.imgur.com/rztM4EC.png" />
    <img className={classes.asteroids} src="https://i.imgur.com/huULMgn.png" alt="asteroids" />
</picture>
<img className={classes.asteroids1} src="https://i.imgur.com/3zqigY9.png" alt="asteroids" />
<img className={classes.asteroids2} src="https://i.imgur.com/7qUXJ3t.png" alt="asteroids" />
      </div>
      <div>
        {/*<img
          className={classes.imageA}
          src="https://github.com/KSHITIJ-2024/media/blob/main/circles+astro.png?raw=true"
          alt=""
  />*/}
   <picture >
    {/*<source media="(max-width: 500px)" srcset="https://github.com/KSHITIJ-2024/media/blob/main/spaceship+astro.png?raw=true" />*/}
    <img className={classes.imageA} src="https://i.imgur.com/LU4hRSD.png" alt="Spaceship" />
</picture>
<picture >
    {/*<source media="(max-width: 500px)" srcset="https://github.com/KSHITIJ-2024/media/blob/main/spaceship+astro.png?raw=true" />*/}
    <img className={classes.imageC} src="https://i.imgur.com/Z6ghxJy.png" alt="Spaceship" />
</picture>
      </div>
      <div className={classes.posT}><Card head=<span className={classes.He1}>THEME</span> desc=<span className={classes.De1}>As each day passes, we get closer to shattering the chains holding us put in this earth, commencing an exodus across the endless cosmos to claim everything that exists as ours. Take pride in being alive in this era when mankind takes a generational leap in space technologies.</span>></Card></div>
    </div>
  );
};

export default Elements;

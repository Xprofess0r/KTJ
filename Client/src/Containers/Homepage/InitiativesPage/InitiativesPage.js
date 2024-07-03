import React from "react";
import classes from "./InitiativesPage.module.css";
import Card from "../../../Cards/Card"

const Elements = () => {
  return (
    <div className={classes.container}>
    
      <div>
        {/*<img
          className={classes.planet}
          src="https://github.com/KSHITIJ-2024/media/blob/main/Initiatives%20elements/planet.png?raw=true"
          alt="planet"
  />*/}<picture >
    <source media="(max-width: 500px)" srcset="https://i.imgur.com/592OnQV.png" />
    <img className={classes.planet} src="https://i.imgur.com/oaw3CBC.png" alt="Spaceship" />
</picture>
 
      </div>
      <div>
      <img
          className={classes.combined}
          src="https://i.imgur.com/RrhZnaT.png"
          alt="combined"
/>
<img
          className={classes.combinedO}
          src="https://i.imgur.com/29kNskA.png"
          alt="combined"
/>


      </div>

     
      <div className={classes.posI}><Card head=<span className={classes.HeI}>Initiatives</span> desc=<span className={classes.DeI}>
        Kshitij, IIT Kharagpur, organises an array of activities like guest lectures, workshops, exhibitions and megashows.
        We bring various prominent personilities from various aspects of life to deliver lectures on their area of 
        expertise.</span>></Card></div>
  
      
    </div>
  );
};

export default Elements

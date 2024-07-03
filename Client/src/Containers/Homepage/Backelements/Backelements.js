import React from "react";
import classes from './Backelements.module.css';



const Elements = () => {
    return (
        <div className={classes.container}>
            <div><img className={classes.planet} src="https://i.imgur.com/X9kR9e0.png" alt="" /></div>
            <div><img className={classes.meteorite} src="https://i.imgur.com/HL3j4K5.png" alt="" /></div>
            <div><img className={classes.ilu} src="https://i.imgur.com/dxWM1Hn.png" alt="" /></div>
            <div><img className={classes.spaceship} src="https://i.imgur.com/xQzUBrC.png" alt="new" /></div>
        </div>
     );
}
 
export default Elements;
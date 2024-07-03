import React from "react";
import classes from "./Gamefestcard.module.css"


const Gamefestcard = () =>{

    return(
        <div>
            <div className={classes.full}>
                <div className={classes.heading}>GAMEFEST</div>
                <div className={classes.cards}>
                    <li>
                        <div className={classes.card}></div>
                        <div className={classes.card}></div>
                    </li>
                    <li>
                        <div className={classes.card}></div>
                        <div className={classes.card}></div>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default Gamefestcard
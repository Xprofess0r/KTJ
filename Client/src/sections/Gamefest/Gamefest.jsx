import React, { useEffect } from "react";
import classes from "./Gamefest.module.css"
import { Link, useNavigate } from "react-router-dom";

const Gamefest = () =>{
    const navigate=useNavigate();
    useEffect(() => {
        if(localStorage.getItem("Ktj_id_isRegisteredGamefest")=="true"){
            navigate("/events/gamefest");
        }
      });

    return(
        <div>
            <div className={classes.full}>
                <div className={classes.heading}>GAMEFEST</div>
                <div className={classes.register}><button><Link to="/events/gamefest" onClick={()=>{localStorage.setItem("Ktj_id_isRegisteredGamefest", "true");}} className={classes.link}>REGISTER</Link></button></div>
            </div>
        </div>
    )
}

export default Gamefest
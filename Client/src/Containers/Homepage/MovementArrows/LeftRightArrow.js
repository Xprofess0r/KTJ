import classes from "./LeftRightArrow.module.css";

const LeftRightArrow = (props) => {
    return ( 
        <>
            {props.arrow=="right"&&<div className={classes.arrowBox}>
                <span></span>
                <span></span>
            </div>}
            {props.arrow=="left"&&<div className={`${classes.arrowBox} ${classes.rot}`} >
                <span></span>
                <span></span>
            </div>}
            {props.arrow=="down"&&<div className={`${classes.arrowBox} ${classes.rotDown}`} >
                <span></span>
                <span></span>
            </div>}
        </>
     );
}

export default LeftRightArrow;
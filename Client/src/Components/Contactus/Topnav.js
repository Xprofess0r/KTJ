import React from 'react'
import classes from './contactus.module.css';
import design from './Images/design.png';
import core from './Images/core.png';
import tech from './Images/tech.png';
import { Link } from 'react-router-dom';
export default function Topnav(props) {
    return (
        <>
            <div className={classes.topnav}>
                {/* {console.log(props.active)} */}
                <Link to="/contactus/design">
                <div className={props.active==0? classes.activeTab:classes.inactiveTab} id={0}>
                    <div className={classes.navicon}>
                        <img src={design} style={{ width: '3.5rem' }} alt="" />
                    </div>
                    <div className={`${classes.heading}`}>
                        <div className={classes.headingWord}>Design &nbsp;</div>
                        <div className={classes.headingWord}>Team  </div>
                    </div>
                </div>
                </Link>
                <Link to="/contactus/core">
                <div className={props.active==1? classes.activeTab:classes.inactiveTab} id={0}>
                    <div className={classes.navicon}>
                        <img src={core} style={{ width: '3.5rem' }} alt="" />
                    </div>
                    <div className={`${classes.heading}`}>
                        <div className={classes.headingWord}>Core &nbsp;</div>
                        <div className={classes.headingWord}>Team  </div>
                    </div>
                </div>
                </Link>
                <Link to="/contactus/tech">
                <div className={props.active==2? classes.activeTab:classes.inactiveTab} id={0}>
                    <div className={classes.navicon}>
                        <img src={tech} style={{ width: '3.5rem' }} alt="" />
                    </div>
                    <div className={`${classes.heading}`}>
                        <div className={classes.headingWord}>Tech &nbsp;</div>
                        <div className={classes.headingWord}>Team  </div>
                    </div>
                </div>
                </Link>
            </div>
        </>
    )
}

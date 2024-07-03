import classes from './Poster.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const Poster = (props) => {
    console.log(props);
    // console.log(props);
    const userid = useSelector((state) => state.auth.user.ktjID);
    const onClickHandler = () => {
        props.on_reg(userid, props.id)
    }




    return (
        <div className={classes.posterBanner}>
            <img className={classes.poster} src={props.img} alt="poster" />
            <div className={classes.overPoster}>
                <div className={classes.name}>{props.name}</div>
                <div dangerouslySetInnerHTML={{ __html: props.desc}}  className={classes.desc}></div>

                <div className={classes.btn} onClick={onClickHandler}><span>REGISTER</span></div>
                <div className={classes.cond}>Conducted by:- {props.conducted}</div>
            </div>
        </div>
    );
}

export default Poster;
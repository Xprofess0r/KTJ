import React, {useEffect, useState} from "react";
import ReactGa from "react-ga";
import { useHistory } from "react-router-dom";
import classes from "./ExhibitionCards.module.css";

function ExhibitionCards(props) {
  // linking in div

  const [test, setTest] = useState(0);

  const google_analy = (x) => {
    ReactGa.event({
      category: "Click",
      action: x,
    });
  };
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  const history = useHistory();
  function handleClick(x, y) {
    //   SEND DATA TO BACKEND
    console.log("Clicked on Register");
    google_analy(y);
  }

  useEffect(() => setTest(0), [props.ImageLink]);

  return (
    <div className={classes.cView}>
      <div className={classes.CardDiv}>
        <div className={classes.CardText}>
          <div className={classes.CardPara}>
            <span className={classes.cardHead}>Conducted by: </span>
            {props.conducted_by}
          </div>
          <div className={classes.CardPara}>
            <span className={classes.cardHead}>Topic: </span> {props.topic}
          </div>
          <div className={classes.CardPara}>
            <span className={classes.cardHead}>Date: </span> {props.date}
          </div>
          <div className={classes.CardPara2}>{props.p}</div>
          {/* <div className={classes.CardPara}></div> */}
          <div
            className={`${classes.Regis} ${classes.CardPara}`}
            onClick={() => {
              handleClick(
                `${props.cLink}`,
                `Clicked on Watch in ${props.CName} in Exhibitions Page`
              );
              openInNewTab(props.YTlink);
            }}
          >
            Watch
          </div>

        </div>
        <div className={classes.CardPic}>
          {!test && <svg style={{ width: '10vw' }} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite" />
            </path>
          </svg>}

          <img onLoad={()=>{setTest(1);}} style={test==0? {display: "none"}: {display:"block"}} onLoadStart={()=>{setTest(0);}} src={props.ImageLink} alt="" />
        </div>
        <div className={classes.mobileView}>
          <div className={classes.cardTop}>
            <div className={classes.CardPic}>
            {!test && <svg style={{ width: '10vw' }} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite" />
            </path>
          </svg>}

          <img onLoad={()=>{setTest(1);}} style={test==0? {display: "none"}: {display:"block"}} onLoadStart={()=>{setTest(0);}} src={props.ImageLink} alt="" />
            </div>

            <div className={classes.Paras}>
              <div className={classes.CardPara}>
                <span className={classes.cardHead}>Conducted by: </span>
                {props.conducted_by}
              </div>
              <div className={classes.CardPara}>
                <span className={classes.cardHead}>Topic: </span> {props.topic}
              </div>
              <div className={classes.CardPara}>
                <span className={classes.cardHead}>Date: </span> {props.date}
              </div>
              <div
                className={`${classes.Regis} ${classes.CardPara}`}
                onClick={() => {
                  handleClick(
                    `${props.cLink}`,
                    `Clicked on Watch in ${props.CName} in Exhibitions Page`
                  );
                  openInNewTab(props.YTlink);
                }}
              >
                Watch
              </div>

            </div>
          </div>
          <div className={classes.CardPara2}>{props.p}</div>

        </div>
      </div>
    </div>
  );
}

export default ExhibitionCards;

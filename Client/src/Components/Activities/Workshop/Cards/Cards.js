
import React, { useEffect, useState } from "react";
import ReactGa from "react-ga";
import { useHistory, Link } from "react-router-dom";
import classes from "./Cards.module.css";
import { useSelector } from "react-redux";
function ExhibitionCards(props) {
  console.log(props.joinLink)
  const google_analy = (x) => {
    ReactGa.event({
      category: "Click",
      action: x,
    });
  }
  const [test, setTest] = useState(0);
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  const history = useHistory()
  function handleClick(x, y) {
    //   SEND DATA TO BACKEND
    //save path in local storage
    localStorage.setItem('PreviousPath', history.location.pathname)
    console.log('Clicked on Register')
    google_analy(y)
  }
  const workshops = useSelector((state) =>
    state.auth.user.workshops ? state.auth.user.workshops : []
  )

  useEffect(() => setTest(0), [props.ImageLink]);

  return (
    <div className={classes.cView}>
      <div className={classes.CardDiv}>
        <div className={classes.CardText}>
          <div className={classes.CardPara2}>
            <div dangerouslySetInnerHTML={{ __html: props.p }} />
          </div>
          {/* <div className={classes.CardPara}></div> */}

          <div style={{ display: 'flex', columnGap: '2em' }}>
            {props.isWorkshop ? (
              <>
                {workshops.includes(props.topic) && props.joinLink.length > 0 && (
                  <a href={props.joinLink} target='_blank'>
                    <div
                      className={`${classes.Regis} ${classes.CardPara}`}
                      style={{ color: 'white' }}
                    >
                      Join Now
                    </div>
                  </a>
                )}
                <Link
                  to={
                    !workshops.includes(props.topic)
                      ? props.YTlink
                      : '../workshop/deregister/' + props.topic
                  }
                >
                  <div
                    className={`${classes.Regis} ${classes.CardPara}`}
                    style={{ color: 'white' }}
                    onClick={() => {
                      handleClick(
                        `${props.cLink}`,
                        `Clicked on Deregister in ${props.CName} in Workshop Page`
                      )
                    }}
                  >
                    {!workshops.includes(props.topic)
                      ? 'Register'
                      : 'Deregister'}
                  </div>
                </Link>
              </>
            ) : (
              <div
                className={`${classes.Regis} ${classes.CardPara}`}
                onClick={() => {
                  handleClick(
                    `${props.cLink}`,
                    `Clicked on Register in ${props.CName} in Workshop Page`
                  )
                  openInNewTab(props.YTlink)
                }}
              >
                Register
              </div>
            )}

            {props.joinLink && !props.isWorkshop ? (
              <div
                className={`${classes.Regis} ${classes.CardPara}`}
                onClick={() => {
                  handleClick(
                    `${props.cLink}`,
                    `Clicked on Join in ${props.CName} in Workshop Page`
                  )
                  openInNewTab(props.YTlink)
                }}
              >
                Join
              </div>
            ) : (
              ''
            )}
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

          <img onLoad={() => { setTest(1); }} style={test == 0 ? { display: "none" } : { display: "block" }} src={props.ImageLink} alt="" />
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

              <img onLoad={() => { setTest(1); }} style={test == 0 ? { display: "none" } : { display: "block" }} src={props.ImageLink} alt="" />
            </div>

            <div className={classes.Paras}>
              {/* <div
                className={`${classes.Regis} ${classes.CardPara}`}
                onClick={() => {
                  handleClick(
                    `${props.cLink}`,
                    `Clicked on Register in ${props.CName} in Workshop Page`
                  );
                  openInNewTab(props.YTlink);
                }}
              >
                Register
              </div> */}

              {/*-------------------------------- */}

              {props.isWorkshop ? (
                <>
                  {workshops.includes(props.topic) &&
                    props.joinLink.length > 0 && (
                      <a href={props.joinLink} target='_blank'>
                        <div
                          className={`${classes.Regis} ${classes.CardPara}`}
                          style={{ color: 'white' }}
                        >
                          Join Now
                        </div>
                      </a>
                    )}
                  <Link
                    to={
                      !workshops.includes(props.topic)
                        ? '../workshop/register/' + props.topic
                        : '../workshop/deregister/' + props.topic
                    }
                  >
                    <div
                      className={`${classes.Regis} ${classes.CardPara}`}
                      style={{ color: 'white' }}
                      onClick={() => {
                        handleClick(
                          `${props.cLink}`,
                          `Clicked on Deregister in ${props.CName} in Workshop Page`
                        )
                      }}
                    >
                      {!workshops.includes(props.topic)
                        ? 'Register'
                        : 'Deregister'}
                    </div>
                  </Link>
                </>
              ) : (
                <div
                  className={`${classes.Regis} ${classes.CardPara}`}
                  onClick={() => {
                    handleClick(
                      `${props.cLink}`,
                      `Clicked on Register in ${props.CName} in Workshop Page`
                    )
                    openInNewTab(props.YTlink)
                  }}
                >
                  Register
                </div>
              )}

              {props.joinLink && !props.isWorkshop ? (
                <div
                  className={`${classes.Regis} ${classes.CardPara}`}
                  onClick={() => {
                    handleClick(
                      `${props.cLink}`,
                      `Clicked on Join in ${props.CName} in Workshop Page`
                    )
                    openInNewTab(props.YTlink)
                  }}
                >
                  Join
                </div>
              ) : (
                ''
              )}

              {/*-------------------------------- */}
            </div>
          </div>
          <div
            className={classes.CardPara2}
            dangerouslySetInnerHTML={{ __html: props.p }}
          />
        </div>
      </div>
    </div>
  )
}

export default ExhibitionCards

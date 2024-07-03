import React, { useEffect, useState } from 'react'
// import Paper from '@material-ui/core/Paper'
// import Tab from '@material-ui/core/Tab'
// import Tabs from '@material-ui/core/Tabs'
import API from '../../../api'
import classes from './GamefestNew.module.css'
//import link B
import { Link, useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux'
import clickGif from '../../../images/gifgame.gif'

const GamefestNew = (props) => {
  const [showEle, setShowEle] = useState(false)
  const [data, setData] = useState()
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate(null);

  useEffect(() => {
    console.log('useEffect')

    getGames()
  }, [])

  const getGames = () => {
    API.get('/games/getgames/')
      .then((res) => {
        setData(res.data.games)
        console.log(res.data.games)
      })
      .catch((err) => console.log(err))
  }
  const registerCheck = () => {
    console.log('registerCheck ', auth.isAuthenticated);
    if (!(auth.isAuthenticated)) {
      //store path in local storage
      console.log('not authenticated')
    } else {
      navigate(`/game-register/${id}`);
    }
    
  }

  useEffect(() => {
    // window.onload = function(){
    window.onclick = function click(e) {
      var evt = document.getElementsByClassName(`${classes.GamefestNewContainer}`).event || e;
      evt.preventDefault();
      //console.log(evt.clientX);
      //console.log(evt.clientY);
      setShowEle(true);
      var width = document.getElementsByClassName(`${classes.clickO}`)[0].offsetWidth;
      var height = document.getElementsByClassName(`${classes.clickO}`)[0].offsetHeight;
      //console.log(width);
      let W1 = evt.clientX - (width / 2);
      let H1 = evt.clientY - (height / 2);
      //console.log(H1);
      document.getElementsByClassName(`${classes.clickO}`)[0].style.left = W1 + 'px';
      document.getElementsByClassName(`${classes.clickO}`)[0].style.top = H1 + 'px';

      setTimeout(() => { setShowEle(false); }, 600);
      // document.getElementsByClassName(`${classes.clickO}`)[0].style.display = 'block';
      // document.getElementsByClassName(`${classes.clickO}`)[0].style.delay(1000).fadeOut(500);
      return () => {
        document.getElementsByClassName(`${classes.GamefestNewContainer}`).removeEventListener("click", click);
      }
    }//}

  }, []);
  return (
    <div className={classes.GamefestNewContainer}>
      {showEle ? <div onMouseOut={() => { setShowEle(false) }} ><img className={classes.clickO} style={{ zIndex: 1 }} src={clickGif} /></div> : <></>}
      <div className={classes.GamefestNewHeader}>
        <div className={classes.tab}>Gamefest</div>
      </div>
      <div className={classes.cardDiv}>
        {(data)?.filter((gf, id) => { return !gf.active }).map((item, index) => (

          <div className={classes.GamefestNewCard} key={index}>
            <div className={classes.ButtonStyle}>
              <img
                className={classes.ImgStyle}
                src={item.imageUrl}
                // src='https://cdn.talkesport.com/wp-content/uploads/csgo-breaks-record-for-highest-player-count-all-time.jpg.webp'
                alt=''
              />
              {item.registration === true ? <Link to={`/game-register/${item._id}`}>
                <button className={classes.btngrp1} onClick={registerCheck}>
                  Register
                </button>
              </Link> : <button className={classes.btngrp1} onClick={registerCheck}>
                Registration Closed
              </button>}
            </div>

            <div className={classes.Gamedetails}>
              <div className={classes.GamedetailsHeader}>
                <h1 className={classes.TitleStyle}>{item.title}</h1>
                <div className={classes.GamedetailsHeaderRight}>
                  <h3
                    style={{
                      fontFamily: 'Audiowide, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      color: '  #fff',
                      textAlign: 'right',
                      width: 'max-content'
                    }}
                  >
                    Prize Money:<br />INR {item.prize_money}
                  </h3>
                </div>
              </div>
              <h3 className={classes.description}>{item.content}</h3>
            </div>

            <div className={classes.buttons}>
              <div className={classes.contactus}>
                <div className={classes.contactitem}>Contact Us:</div>
                <div className={classes.subcontactitem}>
                  <i class='fas fa-user-alt'></i> &nbsp;
                  {/* {info.headObjectId?.username} */}
                  Hemant Kumar
                </div>
                <a
                  // href={'tel:' + info.headObjectId?.phone}
                  className={classes.subcontactitem}
                >
                  <i class='fas fa-phone-alt'></i>&nbsp;
                  {/* {info.headObjectId?.phone} */}
                  +91 95211 61194
                </a>
                <a
                  // href={'mailto:' + info.headObjectId?.email}
                  className={classes.subcontactitem}
                >
                  <i class='far fa-envelope'></i>&nbsp;
                  {/* {info.headObjectId?.email} */}
                  kumar.hemant@ktj.in
                </a>
              </div>
              {item.registration === true ? <Link to={`/game-register/${item._id}`}>
                <button className={classes.btngrp} onClick={registerCheck}>
                  Register
                </button>
              </Link> : <button className={classes.btngrp}>
                Registration Closed
              </button>}
              {/* <button className={classes.btngrp}>Contact Details</button> */}
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}
export default connect(mapStateToProps, null)(GamefestNew)

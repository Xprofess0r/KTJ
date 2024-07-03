// import { React, useState } from 'react'
// import ReactDOM from 'react-dom'
// import classes from './Cards.module.css'
// import 'react-multi-carousel/lib/styles.css'
// import Carousel from 'react-multi-carousel'
// import ReactGa from 'react-ga'
// import { useHistory } from 'react-router-dom'
// import API from "../../../api";
// import { useSelector, useDispatch } from "react-redux";
// import { updateUserInfo } from "../../../actions/authActions";
// import { useEffect } from "react";

import  {useState, useRef, React} from 'react'
import classes from './Cards.module.css'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'


function Cards(props) {
  // google analytics
  // const google_analy = (x) => {
  //   ReactGa.event({
  //     category: "Click",
  //     action: x,
  //   });
  // };

  // const history = useHistory()
  // function handleClick(x, y) {
  //   if(isAuthenticated == false)
  //   history.push("/signin");
  //   // window.open(x, "_blank");
  //   google_analy(y);
  //   register(props.number);
  // }
  // const [isRegistered, setisRegistered] = useState(false);

  // const auth = useSelector((state) => state.auth.user);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (auth.interactive?.includes(props.number)) {
  //     setisRegistered(true);
  //   }
  // }, []);

  // const register = (number) => {
  //   console.log(number);
  //   API.post("/interactive/register", { number: number })
  //     .then((res) => {
  //       console.log(res);
  //       dispatch(updateUserInfo(auth._id));
  //       setisRegistered(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setisRegistered(false);
  //     });
  // };
  const[slideIndex, setSlideIndex] = useState(0);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };

  // console.log("==",isAuthenticated)

  return (
    <>
      <div className={classes.mainCard}>
      <div className={classes.border}>
        <div className={classes.left}>
          <div
            className={classes.image}
            style={{
              background: `url(${props.img}) no-repeat center center/cover`,
            }}
          ></div>
          
        </div>  
       
      </div>
        <div className={classes.right}>
          <div className={classes.til}>{props.title}</div>
            <div className={classes.slide}>
            <Carousel
            responsive={responsive}
            infinite={true}
            focusOnSelect
            autoPlay
            autoPlaySpeed={3000}
            slidesToShow={3}
            arrows={false}
            beforeChange={(nextSlide,{currentSlide, onMove})=>setSlideIndex(nextSlide)}
          >
            {props.persons.map((e, index) => (
              <div className={`${classes.frames} ${index === slideIndex ? classes.active : ''}`} key={index}>
                <img src={e.imLink} alt="" className={classes.bImg}/>
                <div className={classes.bNam}>{e.name}</div>
                <div className={classes.bCom}>{e.company}</div>
              </div>
            ))}
          </Carousel>
            </div>
          
          <div
            className={classes.button}
            onClick={() => {
              // handleClick(`${props.lk}`, "clicked on register in summits page");
            }}
          >
            {/*isRegistered ? "Registered" : */"Register"}
          </div>
          {/* {isRegistered && props.lk !== "" && (
            <div
              className={classes.button}
              onClick={() => {
                window.open(props.lk, "_blank");
              }}
            >
              Join Here
            </div>
          )} */}
          {

          }
        </div>
      </div>
    </>
  );
}

export default Cards

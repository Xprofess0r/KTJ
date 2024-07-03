import classes from "./HorizonScroll.module.css";
import React, { useEffect, useRef, useState } from "react";
import Container from "./Bullets/Container";
import HomePage from "./HomePage/HomePage";
import ThemePage from "./ThemePage/ThemePage";
import ActivityPage from "./ActivityPage/ActivityPage";
import EventPage from "./EventPage/EventPage";
import InitiativePage from "./InitiativesPage/InitiativesPage";
import SponsorsPage from "./SponsersPage/SponsersPage";
import ChatApp from "../../ChatBot/ChatApp";
import magic from "../../Sound/so.mpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import LeftRightArrow from "./MovementArrows/LeftRightArrow";

//satellite and orbit in activity page
//relay dish and signals in activity page
//solar system and orbits in event page
//orbit and space ship in sponsors and register page
//orbit and satellite in initiatives page

const HorizontalScroll = () => {
  // const audio = new Audio(magic);
  const [audioStatus, changeAudioStatus] = useState(false);
  const [first, setFirst] = useState(true)
  const myRef = useRef();
  const [fullScreenStatus, changefullScreenStatus] = useState(document.fullscreenElement==null ? false:true);
  let myDocument = document.documentElement;
  const FirstTime = ()=>{
    if(first)
    {
      startAudio();
      // setFirst(false);
    }
  }

  const startAudio = () => {
    if(myRef.current)
    {
      myRef.current.loop = true;
      myRef.current.play();
      changeAudioStatus(true);
      setFirst(false);
    }
  };

  const pauseAudio = () => {
    // console.log("here");
    if(myRef.current){
    myRef.current.pause();
    changeAudioStatus(false);}
    changeAudioStatus(false);
  };
  const startFullScreen = () => {
    if(myDocument.requestFullScreen){
      myDocument.requestFullScreen();
    changefullScreenStatus(true);
    }
    else if(myDocument.msRequestFullScreen) {
      myDocument.msRequestFullScreen();
    changefullScreenStatus(true);
    }
    else if(myDocument.mozRequestFullScreen) {
      myDocument.mozRequestFullScreen();
    changefullScreenStatus(true);
    }
    else if (myDocument.webkitRequestFullScreen) {
      myDocument.webkitRequestFullScreen();
    changefullScreenStatus(true);
    }
    else {
      myDocument.requestFullScreen();
    changefullScreenStatus(true);
    }
    
  };

  const stopFullScreen = () => {
    console.log("here");
    if(document.exitFullscreen){
      document.exitFullscreen();
    changefullScreenStatus(false);
    }
    else if(document.msExitFullscreen) {
      document.msExitFullscreen();
    changefullScreenStatus(false);
    }
    else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    else {
      document.exitFullscreen();
    changefullScreenStatus(false);
    }
  };

  let count = useRef(0);
  let obj1 = useRef(null);
  let obj2 = useRef(null);
  let obj3 = useRef(null);
  let obj4 = useRef(null);
  let obj5 = useRef(null);
  let obj6 = useRef(null);
  var direction;
  const [movingRight, setMovingRight] = useState(true);
  const [canUserScroll, setCanUserScroll] = useState(true);
  let xDis = useRef(0);
  const [coolDown, setCoolDown] = useState(0);
  const [leftRightKey, setLeftRightKey] = useState(false);

  useEffect(() => {
    const newWidth = window.innerWidth;
    if (coolDown === 1) {
      const timer = setTimeout(
        () => {
          setCoolDown(0);
        },
        newWidth > 600 ? (newWidth > 1300 ? 460 : 310) : 215
      );
      return () => clearTimeout(timer);
    } else if (coolDown === 2) {
      const timer = setTimeout(
        () => {
          setCoolDown(0);
        },
        newWidth > 600 ? (newWidth > 1300 ? 480 : 320) : 215
      );
      return () => clearTimeout(timer);
    } else if (coolDown === 3) {
      const timer = setTimeout(() => {
        setCoolDown(0);
      }, 115);
      return () => clearTimeout(timer);
    } else if (coolDown === 4) {
      const timer = setTimeout(() => {
        setCoolDown(0);
      }, 115);
      return () => clearTimeout(timer);
    }

    // 0 -> stop
    // 1 -> forward
    // 2 -> Reverse
    // 3 -> small reverse
    // 4 -> small forward
  });

  const funcScrollTo = (obj) => {
    setCoolDown(1);
    obj.current.scrollIntoView();
  };
  let innerWidth = window.outerWidth;

  const [page, setPage] = useState(1);
  const onScroll = (e) => {
    const roadStyle=document.getElementById('1').style;
    xDis.current = e.target.scrollLeft;

    if (count !== 0) {
      e.target.style.transition = "all 0.6s ease-in";
      roadStyle.transition="all 0.6s ease-in";
      count.current = 1;
    }
    if (xDis.current < (3 * innerWidth) / 4) {
      e.target.style.backgroundColor = "#1d304b";
      roadStyle.backgroundColor="rgb(21 36 57)";
      setPage(1);
    } else if (
      xDis.current >= (3 * innerWidth) / 4 &&
      xDis.current < (3 * innerWidth) / 4 + innerWidth
    ) {
      e.target.style.backgroundColor = "rgb(38,58,86)";
      roadStyle.backgroundColor="rgb(30 46 68)";
      setPage(2);
    } else if (
      xDis.current >= (3 * innerWidth) / 4 + innerWidth &&
      xDis.current < (3 * innerWidth) / 4 + 2 * innerWidth
    ) {
      e.target.style.backgroundColor = "#0e4b3d";
      roadStyle.backgroundColor="rgb(10 57 46)";
      setPage(3);
    } else if (
      xDis.current >= (3 * innerWidth) / 4 + 2 * innerWidth &&
      xDis.current < (3 * innerWidth) / 4 + 3 * innerWidth
    ) {
      e.target.style.backgroundColor = "#0e4b3d";
      roadStyle.backgroundColor="rgb(11 58 48)";
      setPage(4);
    } else if (
      xDis.current >= (3 * innerWidth) / 4 + 3 * innerWidth &&
      xDis.current < (3 * innerWidth) / 4 + 4 * innerWidth
    ) {
      e.target.style.backgroundColor = "rgba(70,44,59,1)";
      roadStyle.backgroundColor="rgb(51 33 43)";
      setPage(5);
    } else if (
      xDis.current >= (3 * innerWidth) / 4 + 4 * innerWidth &&
      xDis.current < (3 * innerWidth) / 4 + 5 * innerWidth
    ) {
      e.target.style.backgroundColor = "#3b2231";
      roadStyle.backgroundColor="rgb(40 23 33)";
      setPage(6);
    }
  };
  const keyRelease = (e) => {
    let keycode = e.keyCode;
    if (keycode === 39) {
      //right
      setLeftRightKey(true);
      setMovingRight(true);
      e.preventDefault();
      setCanUserScroll(true);
    } else if (keycode === 37) {
      //left
      setMovingRight(false);
      setLeftRightKey(true);
      e.preventDefault();
      setCanUserScroll(true);
      // document.getElementById('char').classList.remove(`${classes.scrollAnimationKey}`);
    } else if (keycode === 38) {
      //up
      setMovingRight(false);
      e.preventDefault();
      setCanUserScroll(true);
    } else if (keycode === 40) {
      //down
      setMovingRight(true);
      e.preventDefault();
      setCanUserScroll(true);
    }
  };
  const keyPress = (e) => {
    FirstTime();
    let keycode = e.keyCode;
    // if (keycode === 39) {
    //   //right
    //   setLeftRightKey(true);
    //   setMovingRight(true);
    //   e.preventDefault();

    //   if (canUserScroll == false) return;

    //   // console.log(keycode);
    //   if (window.scrollY !== 0) {
    //     // ;
    //     window.scrollTo(xDis.current, -window.outerHeight * 10);
    //   } else {
    //     // ;
    //     document.getElementById("home").scrollBy(innerWidth * 0.05, 0);
    //     setCanUserScroll(false);
    //   }
    //   if (xDis.current >= innerWidth * 5) {
    //     // //;
    //     window.scrollTo(xDis.current, window.outerHeight * 10);
    //   }

    //   if (xDis.current > 5 * innerWidth + (3 * innerWidth) / 4) {
    //     setCoolDown(0);
    //   } else {
    //     setCoolDown(4);
    //   }
    // } else if (keycode === 37) {
    //   //left
    //   setMovingRight(false);
    //   setLeftRightKey(true);
    //   e.preventDefault();

    //   if (canUserScroll == false) return;

    //   let bottom = 0;
    //   if (window.scrollY > 0) {
    //     e.preventDefault();
    //     //setRe;
    //     window.scrollTo(xDis.current, -window.outerHeight);
    //     bottom = 1;
    //   }
    //   if (!bottom) {
    //     // document.getElementById('char').classList.add(`${classes.scrollAnimationKey}`);
    //     document.getElementById("home").scrollBy(-innerWidth * 0.05, 0);
    //     setCanUserScroll(false);
    //   }
    //   if (xDis.current >= innerWidth * 5) {
    //     window.scrollTo(xDis.current, -window.outerHeight * 15);
    //   }

    //   if (xDis.current < innerWidth / 100) {
    //     setCoolDown(0);
    //   } else {
    //     setCoolDown(3);
    //   }
    if (keycode === 38||keycode===37) {
      //up
      setLeftRightKey(false);
      e.preventDefault();
      setMovingRight(false);
      if (canUserScroll == false) return;
      else {
        let frame;
        let check = 0;
        if (window.scrollY !== 0) {
          window.scrollTo(xDis.current, -window.outerHeight * 10);
        } else if (
          xDis.current >= (3 * innerWidth) / 4 &&
          xDis.current < (3 * innerWidth) / 4 + innerWidth
        ) {
          frame = 1;
        } else if (
          xDis.current >= (3 * innerWidth) / 4 + innerWidth &&
          xDis.current < (3 * innerWidth) / 4 + 2 * innerWidth
        ) {
          frame = 2;
        } else if (
          xDis.current >= (3 * innerWidth) / 4 + 2 * innerWidth &&
          xDis.current < (3 * innerWidth) / 4 + 3 * innerWidth
        ) {
          frame = 3;
        } else if (
          xDis.current >= (3 * innerWidth) / 4 + 3 * innerWidth &&
          xDis.current < (3 * innerWidth) / 4 + 4 * innerWidth
        ) {
          frame = 4;
        } else if (
          xDis.current >= (3 * innerWidth) / 4 + 4 * innerWidth &&
          xDis.current < (3 * innerWidth) / 4 + 5 * innerWidth
        ) {
          if (window.scrollY === 0) {
            frame = 5;
          } else {
            check = 1;
            frame = 6;
          }
          window.scrollTo(xDis.current, -window.outerHeight * 10);
        }
        if (check || xDis.current < (3 * innerWidth) / 4) {
          setCoolDown(0);
        } else {
          setCoolDown(2);
        }
        document
          .getElementsByClassName(`${classes.comp}`)
        [frame - 1].scrollIntoView();
        setCanUserScroll(false);
      }
    } else if (keycode === 40||keycode===39) {
      //down
      e.preventDefault();
      setLeftRightKey(false);
      setMovingRight(true);
      let frame;
      if (canUserScroll == false) return;
      if (window.scrollY !== 0) {
        window.scrollTo(xDis.current, -window.outerHeight * 10);
      }
      if (xDis.current < (3 * innerWidth) / 4) {
        frame = 1;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 &&
        xDis.current < (3 * innerWidth) / 4 + innerWidth
      ) {
        frame = 2;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 2 * innerWidth
      ) {
        frame = 3;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 2 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 3 * innerWidth
      ) {
        frame = 4;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 3 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 4 * innerWidth
      ) {
        frame = 5;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 4 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 5 * innerWidth
      ) {
        frame = 6;
        window.scrollTo(xDis.current, window.outerHeight * 10);
      }
      if (frame !== 6) {
        setCoolDown(1);
        document
          .getElementsByClassName(`${classes.comp}`)
        [frame].scrollIntoView();
        setCanUserScroll(false);
      }
    }
  };
  const arrowPressed = (arrow) => {
    // console.log(arrow,"===");
    // return;
    if (arrow === "right") {
      setLeftRightKey(false);
      setMovingRight(true);
      let frame=1;
      // console.log(Elements);
      // console.log(xDis.current);
      if (window.scrollY !== 0) {
        window.scrollTo(xDis.current, -window.outerHeight * 10);
      }
      if (xDis.current < (3 * innerWidth) / 4) {
        frame = 1;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 &&
        xDis.current < (3 * innerWidth) / 4 + innerWidth
      ) {
        frame = 2;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 2 * innerWidth
      ) {
        frame = 3;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 2 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 3 * innerWidth
      ) {
        frame = 4;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 3 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 4 * innerWidth
      ) {
        frame = 5;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 4 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 5 * innerWidth
      ) {
        frame = 6;
        window.scrollTo(xDis.current, window.outerHeight * 10);
      }
      if (frame !== 6) {
        setCoolDown(1);
        document
          .getElementsByClassName(`${classes.comp}`)
        [frame].scrollIntoView();
        setCanUserScroll(false);
      }
      // console.log(Elements);
    }
    else if(arrow==="left") {
      setLeftRightKey(false);
      setMovingRight(false);
      let frame=1;
      let check = 0;
      if (window.scrollY !== 0) {
        window.scrollTo(xDis.current, -window.outerHeight * 10);
      } else if (
        xDis.current >= (3 * innerWidth) / 4 &&
        xDis.current < (3 * innerWidth) / 4 + innerWidth
      ) {
        frame = 1;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 2 * innerWidth
      ) {
        frame = 2;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 2 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 3 * innerWidth
      ) {
        frame = 3;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 3 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 4 * innerWidth
      ) {
        frame = 4;
      } else if (
        xDis.current >= (3 * innerWidth) / 4 + 4 * innerWidth &&
        xDis.current < (3 * innerWidth) / 4 + 5 * innerWidth
      ) {
        if (window.scrollY === 0) {
          frame = 5;
        } else {
          check = 1;
          frame = 6;
        }
        window.scrollTo(xDis.current, -window.outerHeight * 10);
      }
      if (check || xDis.current < (3 * innerWidth) / 4) {
        setCoolDown(0);
      } else {
        setCoolDown(2);
      }
      document
          .getElementsByClassName(`${classes.comp}`)
        [frame-1].scrollIntoView();
      setCanUserScroll(false);
    }
    else{
      window.scrollTo(xDis.current, window.outerHeight * 10);
    }
  }
  const scrollHandler = (e) => {
    e.preventDefault();
    return;
    // if (window.scrollY === 0) {
    //   handleMouseWheelDirection(detectMouseWheelDirection(e));
    // }
  };
  useEffect(() => {
    const el = document.getElementById("home");
    el.addEventListener("touchstart", handleStart);
    el.addEventListener("touchend", handleEnd);
    el.addEventListener("touchcancel", handleCancel);
    el.addEventListener("touchmove", handleMove);

    document.querySelector("#home").addEventListener("wheel", scrollHandler);
    document.addEventListener("visibilitychange",onMinimise);
    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyRelease);

    return () => {
      el.removeEventListener("touchstart", handleStart);
      el.removeEventListener("touchend", handleEnd);
      el.removeEventListener("touchcancel", handleCancel);
      el.removeEventListener("touchmove", handleMove);

      document
        .querySelector("#home")
        .removeEventListener("wheel", scrollHandler);
      document.removeEventListener("keyup", keyPress);
      document.removeEventListener("visibilitychange",onMinimise);
      document.removeEventListener("keydown", keyPress);
    };
  });
  useEffect(() => {
    if((xDis.current>3*innerWidth/4)&&first==true){
      FirstTime();
      console.log("--->hey");
    }
  }, [page]);
  useEffect(() => {
    window.scrollTo(0, 0);
    // myRef.current.loop = true;
    // myRef.current.play();
    // changeAudioStatus(true);
  }, []);

  const onMinimise=()=>{
    pauseAudio();
  }
  // function detectMouseWheelDirection(e) {
  //   var delta = null,
  //     direction = false;
  //   if (!e) {
  //     // if the event is not provided, we get it from the window object
  //     e = window.event;
  //   }
  //   if (e.wheelDelta) {
  //     // will work in most cases
  //     delta = e.wheelDelta / 60;
  //   } else if (e.detail) {
  //     // fallback for Firefox
  //     delta = -e.detail / 2;
  //   }

  //   if (delta !== null) {
  //     direction = delta > 0 ? "up" : "down";
  //   }
  //   return direction;
  // }
  // function go_up() {
  //   if (coolDown === 1) return;
  //   setMovingRight(true);
  //   let frame;
  //   if (window.scrollY !== 0) {
  //     window.scrollTo(xDis.current, -window.outerHeight * 10);
  //   }
  //   if (xDis.current < (3 * innerWidth) / 4) {
  //     frame = 1;
  //   } else if (
  //     xDis.current >= (3 * innerWidth) / 4 &&
  //     xDis.current < (3 * innerWidth) / 4 + innerWidth
  //   ) {
  //     frame = 2;
  //   } else if (
  //     xDis.current >= (3 * innerWidth) / 4 + innerWidth &&
  //     xDis.current < (3 * innerWidth) / 4 + 2 * innerWidth
  //   ) {
  //     frame = 3;
  //   } else if (
  //     xDis.current >= (3 * innerWidth) / 4 + 2 * innerWidth &&
  //     xDis.current < (3 * innerWidth) / 4 + 3 * innerWidth
  //   ) {
  //     frame = 4;
  //   } else if (
  //     xDis.current >= (3 * innerWidth) / 4 + 3 * innerWidth &&
  //     xDis.current < (3 * innerWidth) / 4 + 4 * innerWidth
  //   ) {
  //     frame = 5;
  //   } else if (
  //     xDis.current >= (3 * innerWidth) / 4 + 4 * innerWidth &&
  //     xDis.current < (3 * innerWidth) / 4 + 5 * innerWidth
  //   ) {
  //     frame = 6;
  //     window.scrollTo(xDis.current, window.outerHeight * 10);
  //   }
  //   if (frame !== 6) {
  //     setCoolDown(1);
  //     document
  //       .getElementsByClassName(`${classes.comp}`)
  //     [frame].scrollIntoView();
  //   }

  //   // console.log("uppp callled")
  // }
  // function go_down() {
  //   setMovingRight(false);
  //   if (canUserScroll === true) {
  //     let frame = 1;
  //     if (window.scrollY !== 0) {
  //       window.scrollTo(xDis.current, -window.outerHeight * 10);
  //     } else if (
  //       xDis.current >= (3 * innerWidth) / 4 &&
  //       xDis.current < (3 * innerWidth) / 4 + innerWidth
  //     ) {
  //       frame = 1;
  //     } else if (
  //       xDis.current >= (3 * innerWidth) / 4 + innerWidth &&
  //       xDis.current < (3 * innerWidth) / 4 + 2 * innerWidth
  //     ) {
  //       frame = 2;
  //     } else if (
  //       xDis.current >= (3 * innerWidth) / 4 + 2 * innerWidth &&
  //       xDis.current < (3 * innerWidth) / 4 + 3 * innerWidth
  //     ) {
  //       frame = 3;
  //     } else if (
  //       xDis.current >= (3 * innerWidth) / 4 + 3 * innerWidth &&
  //       xDis.current < (3 * innerWidth) / 4 + 4 * innerWidth
  //     ) {
  //       frame = 4;
  //     } else if (
  //       xDis.current >= (3 * innerWidth) / 4 + 4 * innerWidth &&
  //       xDis.current < (3 * innerWidth) / 4 + 5 * innerWidth
  //     ) {
  //       if (window.scrollY === 0) {
  //         frame = 5;
  //       } else {
  //         frame = 6;
  //       }
  //       window.scrollTo(xDis.current, -window.outerHeight * 10);
  //     }
  //     if (frame !== 5) {
  //       if (coolDown === 2) return;
  //     }

  //     if (xDis.current !== 0) {
  //       setCoolDown(2);
  //     }

  //     document
  //       .getElementsByClassName(`${classes.comp}`)
  //     [frame - 1].scrollIntoView();
  //     // console.log("downnn callled + " + frame)
  //   }
  // }
  // const handleMouseWheelDirection = (direction) => {
  //   setLeftRightKey(false);
  //   if (canUserScroll == false) return;
  //   if (document.querySelector("#home").scrollLeft >= innerWidth * 5) {
  //     window.scrollTo(xDis.current, window.outerHeight * 10);
  //   }
  //   if (window.scrollY > 0) {
  //     window.scrollTo(xDis.current, -window.outerHeight * 10);
  //   } else if (direction === "up") {
  //     go_down();
  //   } else if (direction === "down") {
  //     go_up();
  //   }
  // };

  var p_s_x, p_s_y, p_m_x, p_m_y;
  function handleStart(evt) {
    evt.preventDefault();
    p_s_x = evt.targetTouches[0].clientX;
    p_s_y = evt.targetTouches[0].clientY;
  }
  function handleMove(evt) {
    evt.preventDefault();
    p_m_x = evt.targetTouches[0].clientX;
    p_m_y = evt.targetTouches[0].clientY;
  }
  function handleEnd(evt) {
    evt.preventDefault();
    if(first==true){
      FirstTime();
    }
    setLeftRightKey(false);
    if (
      p_m_x - p_s_x > 0 &&
      p_m_x - p_s_x > (p_m_y > p_s_y ? p_m_y - p_s_y : p_s_y - p_m_y)
    ) {
      if (window.scrollY > 0) {
        window.scrollTo(xDis.current, -window.outerHeight * 10);
      } else if (p_m_x - p_s_x >= 20) {
        setMovingRight(false);
        if (xDis.current < (3 * innerWidth) / 10) {
          setCoolDown(0);
        } else {
          setCoolDown(2);
        }
        document
          .getElementById("home")
          .scrollTo((xDis.current / innerWidth - 1) * innerWidth, 0);
      }
    } else if (
      p_s_x - p_m_x > 0 &&
      p_s_x - p_m_x > (p_m_y > p_s_y ? p_m_y - p_s_y : p_s_y - p_m_y)
    ) {
      if (xDis.current >= innerWidth * 4 + (innerWidth * 3) / 4) {
        window.scrollTo(xDis.current, window.outerHeight * 10);
      } else if (p_s_x - p_m_x >= 20) {
        setMovingRight(true);
        setCoolDown(1);
        document
          .getElementById("home")
          .scrollTo((xDis.current / innerWidth + 1) * innerWidth, 0);
      }
    } else if (
      p_m_y - p_s_y > 0 &&
      p_m_y - p_s_y > (p_m_x > p_s_x ? p_m_x - p_s_x : p_s_x - p_m_x)
    ) {
      if (window.scrollY > 0) {
        window.scrollTo(xDis.current, -window.outerHeight * 10);
      } else if (p_m_y - p_s_y >= 20) {
        setMovingRight(false);
        if (xDis.current < (3 * innerWidth) / 10) {
          setCoolDown(0);
        } else {
          setCoolDown(2);
        }
        document
          .getElementById("home")
          .scrollTo((xDis.current / innerWidth - 1) * innerWidth, 0);
      }
    } else if (
      p_s_y - p_m_y > 0 &&
      p_s_y - p_m_y > (p_m_x > p_s_x ? p_m_x - p_s_x : p_s_x - p_m_x)
    ) {
      if (xDis.current >= innerWidth * 5) {
        window.scrollTo(xDis.current, 10 * window.outerHeight);
      } else if (p_s_y - p_m_y >= 20) {
        setMovingRight(true);
        setCoolDown(1);
        document
          .getElementById("home")
          .scrollTo((xDis.current / innerWidth + 1) * innerWidth, 0);
      }
    }
  }
  function handleCancel(evt) {
    evt.preventDefault();
    p_m_x = evt.targetTouches[0].clientX;
    p_m_y = evt.targetTouches[0].clientY;
  }

  return (
    <>
      <div
        className={classes.cont}
        onScroll={onScroll}
        onClick={FirstTime}
        id="home"
      >
        {page != 1 && <div className={classes.leftArrowKey} onClick={(e)=>arrowPressed("left")}>
          <LeftRightArrow arrow={"left"} />
        </div>}
        {page == 6 && <div className={classes.downArrowKey} onClick={(e)=>arrowPressed("down")}>
          <LeftRightArrow arrow={"down"} />
        </div>}
        {page != 6 && <div className={classes.rightArrowKey} onClick={(e)=>arrowPressed("right")}>
          <LeftRightArrow arrow={"right"} />
        </div>}
        <div className={classes.bulletCont}>
          <Container
            page={page}
            obj={{ obj1, obj2, obj3, obj4, obj5, obj6 }}
            func={funcScrollTo}
            setCoolDown={setCoolDown}
            setMovingRight={setMovingRight}
          />
        </div>
        <div className={classes["homes"]}>
          <div className={classes["comp"]} ref={obj1}>
            <HomePage />
          </div>
          <div className={classes["comp"]} ref={obj2}>
            <EventPage />
          </div>
          <div className={classes["comp"]} ref={obj3}>
            <ActivityPage />
          </div>
          <div className={classes["comp"]} ref={obj4}>
            <ThemePage />
          </div>
          <div className={classes["comp"]} ref={obj5}>
            <InitiativePage />
          </div>
          <div className={classes["comp"]} ref={obj6}>
            <SponsorsPage />
          </div>
        </div>
        {movingRight ? (
          <div
            className={
              (coolDown === 1 || coolDown === 4) && leftRightKey
                ? `${classes.character} ${classes.scrollAnimationKey}`
                : coolDown === 1 || coolDown === 4
                  ? `${classes.character} ${classes.scrollAnimation}`
                  : (coolDown === 2 || coolDown === 3) && leftRightKey
                    ? `${classes.character} ${classes.scrollAnimationKeyReverse}`
                    : coolDown === 2 || coolDown === 3
                      ? `${classes.character} ${classes.scrollAnimationReverse}`
                      : classes.character
            }
            id="char"
          ></div>
        ) : (
          <div
            style={{ transform: "rotateY(180deg)" }}
            className={
              (coolDown === 1 || coolDown === 4) && leftRightKey
                ? `${classes.character} ${classes.scrollAnimationKeyReverse}`
                : coolDown === 1 || coolDown === 4
                  ? `${classes.character} ${classes.scrollAnimationReverse}`
                  : (coolDown === 2 || coolDown === 3) && leftRightKey
                    ? `${classes.character} ${classes.scrollAnimationKey}`
                    : coolDown === 2 || coolDown === 3
                      ? `${classes.character} ${classes.scrollAnimation}`
                      : classes.character
            }
            id="char"
          ></div>
        )}
        <div className={classes.road} id='1'></div>
      </div>
      <ChatApp />
      <audio
        ref={myRef}
        src={magic}
      />
      <FontAwesomeIcon icon={audioStatus == false ? faVolumeMute : faVolumeUp} className={classes.audioIcon2} onClick={e => {
        if (audioStatus == false) { startAudio(); }
        else {
          pauseAudio();
        }
      }} />
      <>
        {
          fullScreenStatus==false?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={classes.fullScreen} viewBox="0 0 16 16" onClick={e=>{
              if(fullScreenStatus==false ) { startFullScreen(); }
              else if (fullScreenStatus==true){ 
                  stopFullScreen();
              } 
            }}>
              <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={classes.fullScreen} viewBox="0 0 16 16" onClick={e=>{
              if(fullScreenStatus==false ) { startFullScreen(); }
              else if (fullScreenStatus==true){ 
                  stopFullScreen();
              } 
            }}>
            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
            </svg>
        }
      </>
    </>
  );
};
export default HorizontalScroll;

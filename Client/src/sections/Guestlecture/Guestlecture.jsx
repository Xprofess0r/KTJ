import React, { useState, useEffect } from "react";
import Card from "./Card";
import classes from "./Guestlecture.module.css"
import Carousel from 'react-material-ui-carousel'
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { colors, stepClasses } from "@mui/material";
import axios from "../../api";

const GuestLecture = () => {

  const [gInfo, setGInfo] = useState([]);
  const [regEvent, setRegEvent] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    (window.innerWidth <= 920 ? setIsMobile(true) : setIsMobile(false) );
  });

  useEffect(() => {
    axios
      .get('/guestLectures/')
      .then((res) => {
        console.log(res.data)
        setGInfo(res.data.guestLectures)
        // const data = res.data.guestLectures.filter((gl, id) => { return !gl.active }).map((gl) => { return gl });
        console.log(data, "===")
        // for (let i = 0; i < data.length; i = i + 3) {
        //   let obj = {
        //     id1: (i < data.length) ? data[i]._id : "",
        //     g1: (i < data.length) ? data[i].guestName : "",
        //     img1: (i < data.length) ? data[i].imageUrl : "",
        //     desc1: (i < data.length) ? data[i].lectureDescription : "",
        //     reg1: (i < data.length) ? data[i].registrationLink : "",
        //     join1: (i < data.length) ? data[i].youtubeLink : "",

        //     id2: (i + 1 < data.length) ? data[i + 1]._id : "",
        //     g2: (i + 1 < data.length) ? data[i + 1].guestName : "",
        //     img2: (i + 1 < data.length) ? data[i + 1].imageUrl : "",
        //     desc2: (i + 1 < data.length) ? data[i + 1].lectureDescription : "",
        //     reg2: (i + 1 < data.length) ? data[i + 1].registrationLink : "",
        //     join2: (i + 1 < data.length) ? data[i + 1].youtubeLink : "",

        //     id3: (i + 2 < data.length) ? data[i + 2]._id : "",
        //     g3: (i + 2 < data.length) ? data[i + 2].guestName : "",
        //     img3: (i + 2 < data.length) ? data[i + 2].imageUrl : "",
        //     desc3: (i + 2 < data.length) ? data[i + 2].lectureDescription : "",
        //     reg3: (i + 2 < data.length) ? data[i + 2].registrationLink : "",
        //     join3: (i + 2 < data.length) ? data[i + 2].youtubeLink : "",
        //   }
          // setGInfo((olddata) => [...olddata, obj]);
        // }
      })
      .catch((error) => {
        console.log('err', error)
      })
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.containertwo}>
        <div className={classes.heading}>GUEST LECTURES</div>
        {isMobile ? ( gInfo.map((g, index) => ( 
            <Card className={classes.card} key={index} gInfo={g} />
           ))) : (<Carousel className={classes.cara}
          NextIcon={<ArrowForwardIosTwoToneIcon className={classes.arrow} />}
          PrevIcon={<ArrowBackIosTwoToneIcon className={classes.arrow} />}
          autoPlay={false}
          animation={"slide"}
          navButtonsAlwaysVisible={true}
          navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            style: {
              backgroundColor: 'transparent',
              color: 'rgb(253,253,253)',
              transform: 'scale(2)',
              borderRadius: 50,
              borderColor: 'red',
              borderWidth: '2rem'
            }
          }}>
           {gInfo.map((g, index) => ( 
            <Card className={classes.card} key={index} gInfo={g} />
           ))}
        </Carousel>)}
        
      </div>
    </div>
  )

}

export default GuestLecture
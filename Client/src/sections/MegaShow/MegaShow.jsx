import React, { useState, useEffect } from "react";
import Card from "./Card";
import classes from "./MegaShow.module.css"
import Carousel from 'react-material-ui-carousel'
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { colors, stepClasses } from "@mui/material";
import axios from "../../api";

const MegaShow = () => {

  const gInfo=[{
    imageUrl:"https://i.postimg.cc/hvcyXQ8L/MEGASHOWS-edit-1.png",
    lectureDescription:"",
  },]
  const [regEvent, setRegEvent] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    (window.innerWidth <= 920 ? setIsMobile(true) : setIsMobile(false) );
  });

  return (
    <div className={classes.container}>
      <div className={classes.containertwo}>
        <div className={classes.heading}>MEGASHOWS</div>
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

export default MegaShow;
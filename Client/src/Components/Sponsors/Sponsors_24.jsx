import React, { useState } from 'react';
import classes from './Sponsors_24.module.css';

function Sponsors() {

  const [imageOpacity1, setImageOpacity1] = useState(0.3);         
  const [imageOpacity2, setImageOpacity2] = useState(0.3);         
  const [imageOpacity3, setImageOpacity3] = useState(0.3);         
  const [imageOpacity4, setImageOpacity4] = useState(0.3);         
  const [imageOpacity5, setImageOpacity5] = useState(0.3);         

  const changeOpacity24 = () => {

    if(imageOpacity1 === 0.3){
      setImageOpacity1(1)
    } else{
      setImageOpacity1(0.3)
    }
  }

  const changeOpacity23 = () => {

    if(imageOpacity2 === 0.3){
      setImageOpacity2(1)
    } else{
      setImageOpacity2(0.3)
    }
  }

  const changeOpacity22 = () => {

    if(imageOpacity3 === 0.3){
      setImageOpacity3(1)
    } else{
      setImageOpacity3(0.3)
    }
  }

  const changeOpacity21 = () => {

    if(imageOpacity4 === 0.3){
      setImageOpacity4(1)
    } else{
      setImageOpacity4(0.3)
    }
  }

  const changeOpacity20 = () => {

    if(imageOpacity5 === 0.3){
      setImageOpacity5(1)
    } else{
      setImageOpacity5(0.3)
    }
  }

  const timeTravelClockClasses = [
    {
      "key": "one",
      "className": "year_2024",
      "imageLinkOfSuccessiveYears": "https://i.postimg.cc/rsRHHwC2/year-2024.png"
    },
    {
      "key": "two",
      "className": "year_2023",
      "imageLinkOfSuccessiveYears": "https://i.postimg.cc/L6KRMcq3/year-2023.png"
    },
    {
      "key": "three",
      "className": "year_2022",
      "imageLinkOfSuccessiveYears": "https://i.postimg.cc/FR3WbB9h/yaer-2022.png"
    },
    {
      "key": "four",
      "className": "year_2021",
      "imageLinkOfSuccessiveYears": "https://i.postimg.cc/QtJgdG8K/year-2021.png"
    },
    {
      "key": "five",
      "className": "year_2020",
      "imageLinkOfSuccessiveYears": "https://i.postimg.cc/J7g0HYss/year-2020.png"
    }
  ]
  
  // const renderTimeTravelClockList = () => {
  //   return timeTravelClockClasses.map( (timeTravelClockClass, index) => {
  //     return(
  //       <div 
  //       key={index}
  //       className={classes.time_travel_clock}
        
  //       >
  //         <img 
  //         src={timeTravelClockClass.imageLinkOfSuccessiveYears} 
  //         className={timeTravelClockClass.className} 
  //         />
  //         <div className="time_clock">
  //           <img onClick={changeOpacity()} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={`${classes.glow} ${timeTravelClockClass.key}`} />
  //           <img src="https://i.postimg.cc/65sb3wfT/time-clock.png" className={classes.clock_image} />
  //         </div>
  //       </div>
  //     )
  //   })
  // }

  return (

    <div className={classes.sponsors_page}>
      <div className={classes.box}>

        <div className={classes.heading_sponsors}><img src="https://i.postimg.cc/1trS3y2d/text-sponsors.png" alt="sponsors_text" /></div>
        <div className={classes.body_sponsors}>

          <img className={classes.box_image} src="https://i.postimg.cc/MKWTRFYR/box.png" alt="box" />

          <div className={classes.clock_box}>
            <div className={classes.time_travel_clock}>
              <img src="https://i.postimg.cc/rsRHHwC2/year-2024.png" className={classes.year_2024} />
              <div className="time_clock">
                <img onMouseOver={changeOpacity24} style={{opacity: imageOpacity1}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/65sb3wfT/time-clock.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <img src="https://i.postimg.cc/L6KRMcq3/year-2023.png" className={classes.year_2023} />
              <div className="time_clock">
                <img onMouseOver={changeOpacity23} style={{opacity: imageOpacity2}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/65sb3wfT/time-clock.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <img src="https://i.postimg.cc/FR3WbB9h/yaer-2022.png" className={classes.year_2022} />
              <div className="time_clock">
                <img onMouseOver={changeOpacity22} style={{opacity: imageOpacity3}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/65sb3wfT/time-clock.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <img src="https://i.postimg.cc/QtJgdG8K/year-2021.png" className={classes.year_2021} />
              <div className="time_clock">
                <img onMouseOver={changeOpacity21} style={{opacity: imageOpacity4}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/65sb3wfT/time-clock.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <img src="https://i.postimg.cc/J7g0HYss/year-2020.png" className={classes.year_2020} />
              <div className="time_clock">
                <img onMouseOver={changeOpacity20} style={{opacity: imageOpacity5}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/65sb3wfT/time-clock.png" className={classes.clock_image} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;


import { React, useState } from 'react'
import ReactDOM from 'react-dom'
import classes from './Cards.module.css'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import ReactGa from 'react-ga'
import { useHistory } from 'react-router-dom'

function Cards(props) {
  // google analytics
  const google_analy = (x) => {
    ReactGa.event({
      category: 'Click',
      action: x,
    })
  }

  function handleClick(x, y) {
    window.open(x, '_blank')
    google_analy(y)
  }

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
  }

  return (
    <>
      <div className={classes.mainCard}>
        <div className={classes.left}>
          <div
            className={classes.image}
            style={{
              background: `url(${props.img}) no-repeat center center/cover`,
            }}
          ></div>
        </div>
        <div className={classes.right}>
          <div className={classes.til}>{props.title}</div>
          <Carousel
            responsive={responsive}
            infinite
            focusOnSelect
            autoPlay
            autoPlaySpeed={5000}
            containerClass={classes.slide}
          >
            {props.persons.map((e, i) => (
              <div className={classes.frames} key={i}>
                <img src={e.imLink} alt='' className={classes.bImg} />
                <div className={classes.bNam}>{e.name}</div>
                <div className={classes.bCom}>{e.company}</div>
              </div>
            ))}
          </Carousel>
          <div
            className={classes.button}
            onClick={() => {
              handleClick(`${props.lk}`, 'clicked on register in summits page')
            }}
          >
            Watch Now
          </div>
        </div>
      </div>
    </>
  )
}

export default Cards

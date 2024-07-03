import React, { Component } from 'react'
import classes from './Vdo.module.css'

class Vdo extends Component {
  componentDidUpdate() {
  }
  render() {
    return (
      <div className={classes.bgvideo}>
        <div
          className={classes.bgvideo_content}
          id='videoContainer'
        > 
          <img src="https://i.imgur.com/26chHfx.png" className={classes.imgg}/>
        </div>
      </div>
    )
  }
}
export default Vdo

import React, { Component } from 'react'
import classes from './video.module.css'

class MyVideo extends Component {
  componentDidUpdate() {
    // document.getElementById('videoContainer').load()
  }
  render() {
    return (
      <div className={classes.bgvideo}>
        <div
          className={classes.bgvideo_content}
          id='videoContainer'
        >
          <img className={classes.comingSoonGIF} src={this.props.name} alt="my-gif" />
        </div>
      </div>
    )
  }
}
export default MyVideo;

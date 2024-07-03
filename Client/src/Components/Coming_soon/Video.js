import React, { Component } from 'react'
import './video.css'

class Video extends Component {
  componentDidUpdate() {
    document.getElementById('videoContainer').load()
  }
  render() {
    return (
      <div className='bgvideo'>
        <video
          className='bgvideo_content'
          id='videoContainer'
          loop={this.props.loopCondition}
          onEnded={this.props.ended}
          autoPlay
          muted
        >
          <source src={this.props.name} type='video/mp4' />
        </video>
      </div>
    )
  }
}
export default Video;

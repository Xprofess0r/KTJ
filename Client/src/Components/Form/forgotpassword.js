import React, { Component } from 'react'
import Classes from './forgotpassword.module.css'
import Vdo from '../vdoplayer/Vdo'
import ReactGa from 'react-ga'
import Button from '@material-ui/core/Button'

import isEmpty from '../../validation/isEmpty'
import { forgetPassword } from '../../actions/authActions'
// import Navbar from '../Navbar/Navbar'
import PageWrapper from '../PageWrapper/PageWrapper'
import { useState } from 'react'

// const bgvdo =
//   'https://github.com/KSHITIJ-2022/media/blob/master/Signin-Signup-Video/video/scanner-loop-final1.mp4?raw=true'
// const bgvdo1 =
//   'https://github.com/KSHITIJ-2022/media/blob/master/Signin-Signup-Video/video-mobile/loop-mobile-final.mp4?raw=true'
// const bgvdogreen1 =
//   'https://github.com/KSHITIJ-2022/media/blob/master/Signin-Signup-Video/video-mobile/access-granted-final.mp4?raw=true'
// const bgvdogreen =
//   'https://github.com/KSHITIJ-2022/media/blob/master/Signin-Signup-Video/video/access-granted-final.mp4?raw=true'

// const bgvdored =
//   'https://github.com/KSHITIJ-2022/media/blob/master/Signin-Signup-Video/video/access-denied-final.mp4?raw=true'
// const bgvdored1 =
//   'https://github.com/KSHITIJ-2022/media/blob/master/Signin-Signup-Video/video-mobile/access-denied-final.mp4?raw=true'
class ForgotPassword extends Component {
  constructor(props) {
    super()
    this.state = {
      errors: {},
      outputMessage:"nil",
      // redirectToProfile: this.redirectToProfile.bind(this),
      isTrue: true,
    }
    this.setState=this.setState.bind(this)
  };
  updateState(message){ 
    // Changing state 
    this.setState({
      outputMessage:message
    }) 
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
  }
  // handleVideoChange = () => {
  //   if (isEmpty(this.state.errors)) {
  //     this.setState({ isTrue: false })

  //     if (window.innerWidth < 996) {
  //       this.setState({ link: bgvdogreen1 })
  //     } else {
  //       this.setState({ link: bgvdogreen })
  //     }
  //   } else {
  //     this.setState({ isTrue: false })

  //     if (window.innerWidth < 996) {
  //       this.setState({ link: bgvdored1 })
  //     } else {
  //       this.setState({ link: bgvdored })
  //     }
  //   }
  // }
  submitform = (e) => {
    e.preventDefault()
    ReactGa.event({
      category: 'Click',
      action: 'Clicked on Forgot Password in forgotpasswordpage',
    })
    let email = document.getElementById('email').value
  
    forgetPassword({ email });
    // this.handleVideoChange()
    
  }
  render() {
    return (
      <PageWrapper>
        <div className={Classes.signOuter}>

          <form className={Classes.formOuter}>
            <input
              type='text'
              className={Classes.Email}
              placeholder='Email'
              id='email'
            ></input>
            <Button
              style={{
                fontFamily: 'NeueKabel',
                width: '45%',
                minWidth:"fit-content",
                margin: '0',
                position: 'absolute',
                left: '30%',
                top: '70%',
                color:'white',
                backgroundColor:'#240718',
                transform: 'translateX(-30%)',
                transform: 'translateY(-70%)',
              }}
              variant='contained'
              color='red'
            >
              <input
              
                type='submit'
                value='Send New Password'
                id='submit'
                style={{
                  border: 'none',
                  color: 'inherit',
                  background: 'none',
                  padding: '0',
                  font: 'inherit',
                  cursor: 'pointer',
                  outline: 'inherit',
                  width: '100%',
                  textAlign: 'center',
                }}
                onClick={this.submitform}
              />
            </Button>
          </form>
          {/* {this.state.outputMessage} */}
        </div>
        <Vdo
        />
      </PageWrapper>
    )
  }
}

export default ForgotPassword

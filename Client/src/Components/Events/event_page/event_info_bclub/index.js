import React from 'react'
import classes from '../eventinfo/index.module.css'
import axios from '../../../../api'
import { useState, useEffect } from 'react'
import bclub from './bclub.jpeg'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BackBtn from '../../../BackButton/button'

const Info = (props) => {
  const auth = useSelector((state) => state.auth)
  let registerCheck = () => {
    if (!auth.isAuthenticated) {
      //store path in local storage
      localStorage.setItem('PreviousPath', props.location.pathname)
      props.history.push('/signin')
    } else {
      document.getElementById('regbutton').href = 'https://icc.bclub.co.in/'
    }
  }

  useEffect(() => {
    document
      .getElementsByClassName(classes.heading)[0]
      .addEventListener('hover', () => {
        this.childNode.style.color = 'black !important'
      })
  })

  return (
    <div className={classes.outbox}>
      <div className={classes.innerbox}>
        <div className={classes.leftbox}>
          <div className={classes.imgbox}>
            <img className={classes.imagetags} src={bclub} alt='' />
          </div>
          <div className={classes.buttonbox}>
            <div className={classes.heading}>
              {' '}
              <a
                onClick={registerCheck}
                id='regbutton'
                target='_blank'
                className={classes.anchortag}
              >
                Register
              </a>{' '}
            </div>
          </div>
        </div>
        <div className={classes.rightbox}>
          <div className={classes.subheading}>Indian Case Challenge</div>
          <div className={classes.prizemoney}>
            Prize Money: INR 1,50,000
          </div>{' '}
          <br />
          <div className={classes.description}>Description :</div>
          <div className={classes.about}>
            Indian Case Challenge, is an international case study competition.
            The competition is organised by Business Club, IIT Kharagpur. The
            2022 Edition will be conducted in association with Kshitij, the
            annual Techno-management fest of IIT Kharagpur
          </div>
          <div className={classes.contactus}>
            <div className={classes.contactitem}>Contact Us:</div>
            <div className={classes.subcontactitem}>
              {' '}
              <i class='fas fa-user-alt'></i> &nbsp;Bharat{' '}
            </div>
            <div className={classes.subcontactitem}>
              <i class='fas fa-phone-alt'></i>&nbsp; +91 8907940000
            </div>
          </div>
        </div>
      </div>
      <BackBtn position='right-bottom' />
    </div>
  )
}

export default withRouter(Info)

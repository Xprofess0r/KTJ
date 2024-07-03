import React from 'react'
import classes from './index.module.css'
import axios from '../../../../api'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import BackBtn from '../../../BackButton/button'
import Loader from '../../../Loader'

const Info = (props) => {
  const [info, setInfo] = useState({})
  let { id } = useParams()
  const auth = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`/competitions/${id}`)
      .then((res) => {
        setInfo(res.data.competition[0])
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log('error', error)
      })
  }, [])

  const registerCheck = () => {
    if (!auth.isAuthenticated) {
      //store path in local storage
      localStorage.setItem('PreviousPath', props.location.pathname)
      props.history.push('/signin')
    } else {
      props.history.push(`/register/${id}`)
    }
  }
  useEffect(() => {
    document
      .getElementsByClassName(classes.heading)[0]
      ?.addEventListener('hover', () => {
        this.childNode.style.color = 'black !important'
      })
  })
  return (
    <div className={classes.outbox}>
      <div className={classes.innerbox}>
        <div className={classes.leftbox}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className={classes.imgbox}>
                <img className={classes.imagetags} src={info.imageUrl} alt='' />
              </div>
              <div className={classes.buttonbox}>
                <div className={classes.heading}>
                  {info.registration ? (
                    <div onClick={registerCheck} className={classes.anchortag}>
                      {props.auth?.user?.competitions
                        ?.map((comp) => comp._id)
                        .includes(info._id)
                        ? 'View Team'
                        : 'Register'}
                    </div>
                  ) : props.auth?.user?.competitions
                      ?.map((comp) => comp._id)
                      .includes(info._id) ? (
                    <div onClick={registerCheck} className={classes.anchortag}>
                      View Team
                    </div>
                  ) : (
                    <div className={classes.anchortag}>Registration Closed</div>
                  )}
                </div>
                {info.problem_statement_link ? <div className={classes.heading}>
                  <a
                    href={info.problem_statement_link}
                    target='_blank'
                    className={classes.anchortag}
                  >
                    Problem Statement
                  </a>
                </div>: null }
                
              </div>
            </>
          )}
        </div>
        <div className={classes.rightbox} style={{ position: 'relative' }}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {info?.sponsors?.length > 0 ? (
                <div className={classes.topheading}>
                  {info?.sponsors?.map((img) => {
                    if (img)
                      return (
                        <img
                          className={classes.sponsimages}
                          src={img.sponsorImg}
                          alt=''
                        />
                      )
                  })}
                </div>
              ) : null}
              <div className={classes.subheading}>{info.title}</div>
              <div className={classes.prizemoney}>
                Prize Money:{' '}
                {Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(info.prize_money)}
              </div>
              <br />
              <div className={classes.description}>Description:</div>
              <div
                className={classes.about}
                dangerouslySetInnerHTML={{ __html: info.content }}
              ></div>
              <div className={classes.contactus}>
                <div className={classes.contactitem}>Contact Us:</div>
                <div className={classes.subcontactitem}>
                  <i class='fas fa-user-alt'></i> &nbsp;
                  {info.headObjectId?.username}
                </div>
                <a
                  href={'tel:' + info.headObjectId?.phone}
                  className={classes.subcontactitem}
                >
                  <i class='fas fa-phone-alt'></i>&nbsp;{' '}
                  {info.headObjectId?.phone}
                </a>
                <a
                  href={'mailto:' + info.headObjectId?.email}
                  className={classes.subcontactitem}
                >
                  <i class='far fa-envelope'></i>&nbsp;{' '}
                  {info.headObjectId?.email}
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <BackBtn position='right-bottom' />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, null)(Info)

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactGa from 'react-ga'

// JSFile Imports
import Navigation from '../../NavBarCopy/Navbar'
import Register from './registration'
import Details from './details'

// CSS File Imports
import './sandRover.css'

// Image imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import image from '../img/agri_info.png'
import axios from '../../../api'
import { parseQueryString } from '../../../Utils/utils'

class Agri extends Component {
  constructor() {
    super()
    this.state = {
      competition: {
        title: '',
        problem_statement_link: '',
        content: '',
        prize_money: '',
        imageUrl: '',
      },
      maxCount: 4,
      isHidden: true,
    }
    this.registrationDiv = React.createRef()
  }
  componentDidMount() {
    console.log('params', this.props)
    const competitionId = this.props.match.params.competitionId

    if (competitionId) {
      axios
        .get('/competitions/' + competitionId)
        .then((response) => {
          return this.setState({
            competition: response.data.competition,
            eventTitle: response.data.competition.title,
          })
        })
        .catch((error) => console.log('err', error))
    }
  }
  gotoreg = () => {
    //google analytics
    if (this.props.auth.user.events.indexOf(this.state.eventTitle) >= 0) {
      ReactGa.event({
        category: 'Click',
        action: 'Clicked myTeam button of ' + this.state.eventTitle,
      })
    } else {
      ReactGa.event({
        category: 'Click',
        action: 'Clicked Register button of ' + this.state.eventTitle,
      })
    }
    //completed google analytics
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/signin')
    } else {
      this.setState({
        isHidden: false,
      })

      document.getElementById('reg').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }
  }

  redirectToSignIn = () => {
    //google analytics
    ReactGa.event({
      category: 'Click',
      action: 'Clicked Register button of ' + this.state.eventTitle,
    })
    //
    window.scroll({ left: 0, top: 0, behavior: 'smooth' })
    window.location.href = '/#/signin'
  }

  renderContent() {
    if (this.state.isHidden) {
      return null
    } else {
      if (this.props.auth.isAuthenticated) {
        if (this.props.auth.user.events.indexOf(this.state.eventTitle) >= 0) {
          return <Details eventTitle='Agri' />
        } else
          return <Register maxCount={this.state.maxCount} eventTitle='Agri' />
      } else return null
    }
  }

  renderRegister() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.events.indexOf(this.state.eventTitle) >= 0) {
        return (
          <text
            transform='translate(60.59 606.58)'
            fill='#120A5A'
            style={{ fontSize: '34px', cursor: 'pointer' }}
            fontFamily='AvenirLT-Heavy,"Avenir LT 55 Roman"'
            fontWeight={700}
            onClick={this.gotoreg}
          >
            {'MY TEAM'}
          </text>
        )
      } else
        return (
          <text
            transform='translate(60.59 606.58)'
            fill='#120A5A'
            style={{ fontSize: '34px', cursor: 'pointer' }}
            fontFamily='AvenirLT-Heavy,"Avenir LT 55 Roman"'
            fontWeight={700}
            onClick={this.gotoreg}
          >
            {'Register'}
          </text>
        )
    } else
      return (
        <text
          transform='translate(60.59 606.58)'
          fill='#120A5A'
          style={{ fontSize: '34px', cursor: 'pointer' }}
          fontFamily='AvenirLT-Heavy,"Avenir LT 55 Roman"'
          fontWeight={700}
          onClick={() => this.redirectToSignIn()}
        >
          {'Register'}
        </text>
      )
  }

  render() {
    const { title, prize_money, problem_statement_link, content, imageUrl } =
      this.state.competition
    console.log('reredneer', title)
    return (
      <div>
        <div className='eventinfo1'>
          <Navigation Bgcolor={true} />
          <div className='icc_event'>
            <img
              src={`http://localhost:5000/${imageUrl}`}
              alt='loading'
              width='300px'
              height='410px'
            />
            <div
              style={{
                position: 'absolute',
                top: '0px',
                left: '300px',
                width: '63vw',
                height: '410px',
                color: '#120A5A',
                fontFamily: 'AvenirLT-Heavy,Avenir LT 55 Roman',
                paddingLeft: '4%',
                paddingtop: '2%',
              }}
              className='mocard'
            >
              <div style={{ paddingtop: '2%' }}>
                <br />
                <div id='rectangleicc'>
                  {/* <img src={spons} alt="loading" height="80px" /> */}
                </div>
              </div>
              <h1>{title}</h1>
              <h2 style={{ fontWeight: '900', fontSize: '20px' }}>
                Prize money {this.state.competition} : INR {prize_money}
                {console.log('prize', this.state.competition)}
              </h2>
              <br />
              <h2 style={{ fontWeight: '800', fontSize: '20px' }}>
                Description:
              </h2>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '14px',
                  paddingBottom: '2%',
                  width: '59vw',
                }}
              >
                {content}
              </div>
              <a
                smooth
                class='buttonicc'
                target='_blank'
                style={{ textDecoration: 'none' }}
              >
                <h2>
                  <span
                    style={{
                      fontWeight: '700',
                      color: '#120A5A',
                      fontSize: '33px',
                      border: '2px solid #120A5A',
                      borderRadius: '20px',
                      paddingLeft: '2%',
                      paddingRight: '2%',
                    }}
                  >
                    {' '}
                    {this.renderRegister()}
                  </span>
                  &nbsp;
                  <span
                    style={{
                      fontWeight: '700',

                      fontSize: '33px',
                      border: '2px solid #120A5A',
                      borderRadius: '20px',
                      paddingLeft: '2%',
                      paddingRight: '2%',
                    }}
                  >
                    <a
                      href={
                        problem_statement_link != ''
                          ? problem_statement_link
                          : 'https://drive.google.com/file/d/1Goi2Lco0XJGH_Iovz5mSFfdUkB3hNf6R/view?usp=sharing'
                      }
                      target='_blank'
                      smooth
                      style={{ textDecoration: 'none', color: '#120A5A' }}
                      onClick={() => {
                        ReactGa.event({
                          category: 'Click',
                          action:
                            'Clicked Problem Statement of ' +
                            this.state.eventTitle,
                        })
                      }}
                    >
                      {' '}
                      Problem Statement
                    </a>
                  </span>
                </h2>
              </a>
              <div
                style={{
                  fontWeight: '700',
                  color: '#b9b0d7',

                  position: 'absolute',
                  top: '18vh',
                  left: '47vw',
                  width: '25vw',
                }}
              >
                <h2>Contact Us</h2>
                <h5 style={{ fontSize: '15px', padding: '1%' }}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      marginLeft: '5px',
                    }}
                  />
                  &nbsp;Pranay Raj
                </h5>
                <h5 style={{ fontSize: '15px', padding: '1%' }}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{
                      marginLeft: '5px',
                    }}
                    className='fa-rotate-90'
                  />
                  &nbsp;99514117112
                </h5>
                <h5 style={{ fontSize: '13px', padding: '1%' }}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{
                      fontSize: '15px',
                      marginLeft: '5px',
                    }}
                  />
                  &nbsp; pranay.raj@ktj.in
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div id='reg'>{this.renderContent()}</div>
      </div>
    )
  }
}

Agri.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, {})(withRouter(Agri))

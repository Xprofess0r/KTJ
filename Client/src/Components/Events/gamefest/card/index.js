import React from 'react'
import { Link } from 'react-router-dom'
import ReactGa from 'react-ga'

// CSS import
import './index.css'

function Card(props) {
  const closefooter = () => {
    ReactGa.event({
      category: 'Click',
      action: 'Clicked Explore button of ' + props.title,
    })
    window.scroll({ left: 0, top: 0, behavior: 'smooth' })
  }
  return (
    <div id='evt_card'>
      <img
        src={`http://localhost:5000/${props.imageUrl}`}
        id='background_img'
      />
      <div id='card_details'>
        <div id='margins'>
          <div id='content_head'>{props.title}</div>
          <div id='prize'>Prize Money: INR {props.prize} </div>
          <div id='card_content'>{props.content}</div>
        </div>

        <div id='twobtns'>
          <Link onClick={closefooter} to={props.redirectPage}>
            <button id='firstbtn'>Explore Now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card

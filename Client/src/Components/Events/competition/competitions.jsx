import React, { useState, useEffect } from 'react'
import comp from './competition.png'
import compmobile from './Competition-mobile-robot.png'
// import Card from '../../Card/card'
import './competitions.css'
import axios from '../../../api'
export default function Event(props) {
  const [compdata, setcompdata] = useState([])
  useEffect(() => {
    axios
      .get('/competitions')
      .then((res) => {
        // console.log(res.data.competitions)
        //let loading = Array.from({length:res.data.competitions.length},(v,i)=>true);
        setcompdata(res.data.competitions)
      })
      .catch((error) => {
        console.log('err', error)
      })
  }, [])
  return (
    <div style={{ height: '100%' }} className='comp_page'>
      <div className='image_comp'>
        <img className='image_competition' src={comp} />
      </div>
      <div className='image_mobile_comp'>
        <img className='image_competition' src={compmobile} />
      </div>
      <div id='all_cards_mobile'>
        <h1 className='Heading_competition_mobile'>COMPETITIONS</h1>

        <div
          className='section' /* style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "column", flexWrap: "wrap", height: "500px" }} */
        >
          <Card
            title='Indian Case Challenge'
            key='2022'
            id='2022'
            prize='1,50,000'
            content='Indian Case Challenge, is an international case study competition. The competition is organised by Business Club, IIT Kharagpur. The 2022 Edition will be conducted in association with Kshitij, the annual Techno-management fest of IIT Kharagpur'
            redirectPage='/event/icc'
            imageUrl='https://raw.githubusercontent.com/KSHITIJ-2022/media/master/Events/IndianCaseChallenge.jpeg'
          />
          {compdata.map((comp, index) => {
            return (
              <Card
                title={comp.title}
                key={comp._id}
                id={comp._id}
                prize={comp.prize_money}
                content={comp.content}
                redirectPage={'/event/' + comp.competitionUrl}
                imageUrl={comp.posterUrl}
              />
            )
          })}
        </div>
      </div>
      <div style={{ height: '100%', position: 'relative' }}>
        <div style={{ height: '100%' }} className='competitionbg'>
          <div style={{ height: '100%' }} id='competition_contents'>
            <div id='all_cards'>
              <h1 className='Heading_competition'>COMPETITIONS</h1>
              <div
                className='section'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  height: '100%',
                }}
              >
                <Card
                  title='Indian Case Challenge'
                  key='2022'
                  id='2022'
                  prize='1,50,000'
                  content='Indian Case Challenge, is an international case study competition. The competition is organised by Business Club, IIT Kharagpur. The 2022 Edition will be conducted in association with Kshitij, the annual Techno-management fest of IIT Kharagpur'
                  redirectPage='/event/icc'
                  imageUrl='https://raw.githubusercontent.com/KSHITIJ-2022/media/master/Events/IndianCaseChallenge.jpeg'
                />
                {compdata.map((comp, index) => {
                  return (
                    <Card
                      title={comp.title}
                      key={comp._id}
                      id={comp._id}
                      prize={comp.prize_money}
                      content={comp.content}
                      redirectPage={'/event/' + comp.competitionUrl}
                      imageUrl={comp.posterUrl}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

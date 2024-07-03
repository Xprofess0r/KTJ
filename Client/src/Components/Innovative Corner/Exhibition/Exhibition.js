import React from 'react'
import classes from './Exhibition.module.css'
import { Link } from 'react-router-dom'

function Exhibition() {

  const data = [
    {
      "conducted": "Tech Mahindra",
      "name": "Exhibition by Tech Mahindra",
      "image": "https://i.imgur.com/9FP5Ppb.jpg",
      "topic": "Exhibition of the six-legged Hextorq, a flexible human arm, and a people proactive robot",
      "date": "21st January 2024",
      "details": `Kshitij 2024 is pleased to introduce our exhibition #5  by Tech-Mahindra. Get ready to witness the six-legged Hextorq, a flexible human arm, and a people proactive robot. Hextorq, an exceptional robot that imitates the moment of insects and adheres to the laws of low center of gravity. This incredible thing has a built-in camera and is extremely agile and responsive. Crushgaunt is a light compact glove created based on biomimicry. A highly responsive compact glove having minimal response time. Wellness Robot is designed to gauge people’s emotions and converse with them dynamically. This small thing has the capability to guide people around offices and other indoor areas. It can also measure heart rate, oxygen level and temperature. Hurry up and get registered to witness these fascinating robots by Tech-Mahindra on January 21 at 4PM at the IIT Kharagpur campus.`,
      "Registration": "https://forms.gle/rsc5XVk3uhy9eVkt9",
    
    },
    {
      "conducted": "Indian Space Research Organization",
      "name": "Exhibition Of Chandrayan , Mangalyan & PSLV Rocket",
      "image": "https://i.imgur.com/kg35A5D.jpg",
      "topic": "Exhibition Of Chandrayan , Mangalyan & PSLV Rocket",
      "date": "20th to 22nd January 2024",
      "details": `ISRO. People's dream come true. Kshitij brings to you with the first lecture of its guest lecture series an Indian space scientist, an Ex-Chairman-ISRO, a technocrat, MR. K. Radhakrishnan. Padma Bhushan Award recipient for his contribution to Science and Engineering, especially in Space Science and Technology. Gather round and get ready for the guest lecture by this great personality on ‘date’ at ‘time’`,
      "Registration": "https://forms.gle/U8DDhdr15z8QTMQZ6",
    
    },
    {
      "conducted": "Log9 Materials",
      "name": "Aluminium Fuel Cells",
      "image": "https://i.imgur.com/3552XQX.jpg",
      "topic": "Aluminium Fuel Cells",
      "date": "28/12/2022",
      "details": "Kshitij 2024 presents its second virtual exhibition for the 20th edition of our festival.On our way towards a renewable energy source, we should become less dependent on conventional fossil fuels. This needs a proper storage and transportation facility for electricity, where batteries come into play.Log9 is an indigenous deep-tech and advanced battery-tech startup that is redefining the EV industry's standards in the fight against climate change, by offering batteries that can be charged 9x faster, can last 9x longer, and offer 9x higher performance and safety.",
      "watch": "https://youtu.be/fHJBMoMSHho",
      "Registration": "",
    },
    {
      "conducted": "Tvasta Manufacturing Solutions",
      "name": "3D Printing Construction",
      "image": "https://i.imgur.com/e6ZnzgY.jpg",
      "topic": "3D Printing Construction",
      "date": "16/12/2022",
      "details": "Kshitij is here with an exciting Virtual Exhibition. In this modern day where automation is getting integrated with our daily life, and every labor work done is slowly replaced by robots and machineries. We are here to witness yet another work getting automated, making our lives multiple times better. Building a house requires multiple things to be done, especially the manual labor needed is tiring. So join us to view 3D Printing Construction by @tvasta Manufacturing Solutions, where a whole house is constructed by the process of additive manufacturing, better known as 3D printing.",
      "watch": "https://youtu.be/lfyHjV4d2uQ",
      "Registration": "",
    },
  ]

  return (
    <>
      <div className={classes.outerbox}>

        <div className={classes.box}>
          <div className={classes.extitle}>
            EXHIBITIONS
          </div>

          <div className={classes.exhibition}>
            {data.map((e, id) => {
              return (
                <div className={classes.avatarbox}>
                  <div className={classes.avatarleft}>
                    <div className={e.name.length>40? `${classes.name} ${classes.makesmall}` : classes.name}>
                      {e.name}
                    </div>
                    <div className={classes.avatarphoto}>
                      <img src={e.image} width="100%" height="100%" />
                    </div>
                  </div>
                  <div className={classes.avatarright}>
                    <div className={classes.about}>
                      Conducted by: <span> {e.conducted}</span> <br />
                      Topic: <span>{e.topic}</span> <br />
                      Date: <span>{e.date}</span>
                    </div>
                    <div className={classes.details}>
                      <p>
                        {e.details}
                      </p>
                    </div>
                    {console.log("++", e.watch)}
                    <button className={classes.btnthird}>{e.Registration!==""? <div onClick={e=>{ window.open(data[id].Registration, '_blank'); }} >Register now</div> : <div onClick={e=>{ window.open(data[id].watch, '_blank'); }} >Watch</div>}</button>
                  </div>
                </div>
              )
            })}

          </div>


        </div>
      </div>
    </>
  )
}

export default Exhibition
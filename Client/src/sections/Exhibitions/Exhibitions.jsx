import React from 'react'
import classes from './Exhibitions.module.css'
import { Link } from 'react-router-dom'

function Exhibition() {

  const data = [
    {
      "conducted": "DRDO",
      "name": "Exhibition by DRDO",
      "image": "https://i.postimg.cc/ncWQNGB4/exhibition2-1.png",
      "topic": "Missile prototypes of Agni, Prithvi, Bhrahmos, Nag, Samho, MRSAM",
      "date": "20th January 2024",
      "details": `Discover the forefront of defense innovation at the DRDO Exhibition, KTJ 2024. Encounter groundbreaking technologies and dive into the future of national security.`,
    },
    {
      "conducted": "Bidyut Robotics",
      "name": "Bidyut Exhibition",
      "image": "https://i.postimg.cc/28yZHKbj/exhibition-2.png",
      "topic": "Go1 Dog Robot, Kebbi robot, Moon rover",
      "date": "19th to 21st January 2024",
      "details": `Explore the forefront of robotics at this international exhibition at Kshitij 2024! Join us as Bidyut Robotics reshapes the landscape of technology, offering a glimpse into the futuristic realm dominated by technology.`,
    },
    {
      "conducted": "Indian Navy",
      "name": "Exhibition by Indian Navy",
      "image": "https://i.postimg.cc/CKTnxMvd/exhibition-3-Copy.png",
      "topic": "",
      "date": "19th to 21st January 2024",
      "details": `Witness the might and valor of our Indian Navy at this patriotic and exclusive exhibition at Kshitij 2024! Feel the electricity running through your veins as you Awaken the navy brat within you and take a peek within the technical aspect of our defense mechanism.`,
    },
    {
      "conducted": "Dhaksha Unmanned Systems",
      "name": "Dhaksha Drone Expo",
      "image": "https://i.postimg.cc/fbctt4FC/Dhaksha.png",
      "topic": "Drone models of DH-Q4, DH-ALTIGATOR and DH-AGRIGATOR-E10 PLUS",
      "date": "19th - 21st January 2024",
      "details": `Dhaksha Unmanned Systems Drone Exhibition showcases cutting-edge drone technology, featuring a diverse range of unmanned systems for various applications. Explore innovations, capabilities, and advancements in the field of aerial robotics.`,
    },
    {
      "conducted": "Drone Light Show Canada",
      "name": "Drone Light Expo",
      "image": "https://i.postimg.cc/dVTTFZjz/drone-light-show.png",
      "topic": "Drone models used for Drone Shows",
      "date": "19th - 21st January 2024",
      "details": `Experience the mesmerizing Drone Light Show Canada Exhibition, where synchronized drones create breathtaking aerial displays. Witness a dazzling fusion of technology and artistry, illuminating the night sky with dynamic formations and colors.`,
    }
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
                <div className={classes.avatarbox} key={id}>
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
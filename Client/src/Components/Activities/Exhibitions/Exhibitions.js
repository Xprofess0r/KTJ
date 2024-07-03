import {React, useState} from 'react'
import ReactGa from "react-ga";
import { useHistory } from "react-router-dom";
import classes from "./Exhibitions.module.css"
import ExhibitionCards from './ExhibitionCards/ExhibitionCards.js'

function Exhibitions() {

    const [CNumber, setCNumber] = useState(0)
    //Fatch data and put here
    const CNames = ["#1 PROSTHETIC LEG", "#2 DRONE AUTOMATION", "#3 BIONICSWIFT","#4 AVATAR-1"]
    const Cdata = [
        {
            "conducted_by": "Rise Legs",
            "topic":"PROSTHETIC LEG",
            "p":"Kshitij IIT Kharagpur brings forward to you our first virtual exhibition. An exhibition by Rise Legs, a Bengaluru based startup, we are overwhelmed to introduce our exhibitor Arun Cherian, founder of Rise Legs. Mr. Arun presented new and interesting technologies in developing prosthetic legs.",
            "ImageLink":"https://github.com/KSHITIJ-2022/media/blob/master/Exhibitions/VirtualExhibition/VE1.jpeg?raw=true",
            "date":"21/11/2021",
            "cLink":"#",
            "YTlink":"https://youtu.be/jaOV42dSwgU"
        },
        {
            "conducted_by": "PDRL",
            "topic":"DRONE AUTOMATION",
            "p":`Kshitij IIT Kharagpur has launched its second virtual exhibition on Drone Automation by Passenger Drone Research Private Limited (PDRL).
            PDRL is a drone technology research and development firm that creates a variety of products, solutions, and services for the industry's autonomous demands.
            AeroGCS (Drone Management Software) and AeroMegh (Drone Automation and Data Analytics) are two of PDRL's best projects. Ms. Kanchan Borade, PDRL's "enthusiast", and Mr. Dhananjay Khairnar, a Senior Software Engineer, discussed on Aeromegh and AeroGCS.`,
            "ImageLink":"https://github.com/KSHITIJ-2022/media/blob/master/Exhibitions/VirtualExhibition/VE2.jpeg?raw=true",
            "date":"11/12/2021",
            "cLink":"#",
            "YTlink":"https://youtu.be/Gx1QeKBYz5c"
        },
        {
            "conducted_by": "Festo",
            "topic":"BIONICSWIFT",
            "p":`Kshitij IIT Kharagpur presents to you our third virtual exhibition, brought to you by Festo, prime movers in the field of industrial automation and technical education with headquarters in Esslingen am Neckar, Germany, on their project ‘BionicSwift’, an advanced robotic bird clone that utilises radio-based indoor GPS with ultra-wideband technology (UWB).

            The exhibition is presented to the audience by Karoline von Häfen, designer and Head of Corporate Bionic Projects at Festo AG & Co. KG.`,
            "ImageLink":"https://github.com/KSHITIJ-2022/media/blob/master/Exhibitions/VirtualExhibition/VE3.jpeg?raw=true",
            "date":"17/12/2021",
            "cLink":"#",
            "YTlink":"https://youtu.be/E6XEDyCOePE"
        },
        {
            "conducted_by": "Avant Garde Innovations",
            "topic":"AVATAR-1",
            "p":`Kshitij, IIT Kharagpur is delighted to share its fourth virtual exhibition on Avant Garde Innovations' AVATAR-1, a highly affordable Small Wind Turbine suitable for Residential, Commercial, Agricultural, Rural Electrification and many other sectors.

            The Exhibition is presented to the audience by Mr. Arun George, Founder & CEO of Avant Garde Innovations– a Cleantech Start up.`,
            "ImageLink":"https://github.com/KSHITIJ-2022/media/blob/master/Exhibitions/VirtualExhibition/VE4.jpeg?raw=true",
            "date":"26/12/2021",
            "cLink":"#",
            "YTlink":"https://youtu.be/HSl9C6ocrgw"
        }
    ]

    // MAP THE NAMES 
    const MappedNames = CNames.map((item, i) => {return <div className={CNumber === i?`${classes.AName} ${classes.TextSelected}`:`${classes.AName}`} onClick={(e)=>{
        // console.log(CNames.indexOf(e.target.innerText))
        setCNumber(CNames.indexOf(e.target.innerText))
    }
    } key={i}>{item}</div>})

    return (
        <div className={classes.OuterPart}>
        <div className={classes.exhHeading}>
            <h2>EXHIBITIONS</h2></div>
            <div className={classes.BorderCard}>
                <div className={classes.NameArea}>
                {MappedNames}
                </div>

                <div className={classes.MobileNameArea}>
                {MappedNames}
                </div>

                <div className={classes.CardArea}>
                <ExhibitionCards className={classes.InCardArea} ImageLink={Cdata[CNumber].ImageLink} conducted_by={Cdata[CNumber].conducted_by} topic={Cdata[CNumber].topic} p={Cdata[CNumber].p} cLink={Cdata[CNumber].cLink} date={Cdata[CNumber].date} YTlink = {Cdata[CNumber].YTlink}/>
                </div>
            </div>
        </div>
    )
}

export default Exhibitions

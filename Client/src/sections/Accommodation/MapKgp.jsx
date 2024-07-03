import React from "react";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const Mapk = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
      navigate(-1); 
    };
  return (
    <div className={classes.containerk}>
      <div className={classes.container1}>
        <div className={classes.headerA}>Reaching IIT KGP
</div>
<div className={classes.backBtn} onClick= {handleBackButtonClick}>
          <span>{"<"}</span>
          <span>BACK</span>
        </div>
        <div className={classes.matter}>
            <div> 
            Kharagpur is about 140 kilometres west of Kolkata and is well connected to the city by road and rail. Kharagpur can be reached in about 2 hours by train or 3 hours by car from Kolkata's Howrah railway station. Kharagpur is also linked by direct train services to the majority of the country's major cities. The Institute is about a 10-minute drive (5 km) from the Kharagpur railway station. To get to the Institute, you can hire a private taxi, autorickshaw, or cycle-rickshaw.
            </div><br/>
            <div> 
            **Buses will be provided by Kshitij, IIT Kharagpur at Kharagpur railway station for the guests to reach IIT Kharagpur campus.
            </div><br/>
            <div> 
            You can reach IIT Kharagpur in two ways:
            </div><br/>
            <div> 
            <span style={{color:"#ADD8E6",fontWeight:"bold"}}>By Air: </span>
The nearest airport to Kharagpur is Kolkata's Netaji Subhas Chandra Bose International Airport (CCU). You can get a flight to Kolkata airport on a regular basis. It is well connected to almost all of the country's major destinations.
From Kolkata Airport, take a taxi to Kharagpur from the airport taxi stand. The distance is close to 140 Kilometres. The journey takes about 2.30 hours. Take a taxi to Howrah railway station . Regular express and local trains run to Kharagpur. An express train takes approximately 2 hours, depending on class and train type. The Institute is located 5 Kilometres from Kharagpur Railway Station.

            </div><br/>
            <div> 
            <span style={{color:"#ADD8E6",fontWeight:"bold"}}>By train: </span>
            
Kharagpur is well connected to most major cities of India by rail. There are frequent trains to Kharagpur. Alternatively, you can reach the Howrah Railway station and take a local or express train to Kharagpur or Book a cab to reach Kharagpur via road. The distance is almost 140KM. The travel time is approximately 2.30 hrs. 
            </div><br/>
            <div> 
            A Team ID will be allocated to the team on registration which shall be used for future references.
            </div><br/>
            <div> 
            1. No responsibility will be held by Kshitij, IIT Kharagpur for any late, lost or misdirected entries.
            </div><br/>
            <div> 
            2. All modes of official communication will be through the Kshitij e-mail. Participants are advised to keep track of all folders in their email accounts.
            </div><br/>
            <div> 
            3. Note that at any point of time the latest information will be the one mentioned on the website. However, registered participants will be informed through mail about any changes.
            </div><br/>
            <div> 
            4. The decision of the organizers or judges shall be treated as final and binding on all.
            </div><br/>
        </div>

      </div>
    </div>
  )

}

export default Mapk
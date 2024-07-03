import React, { useState, useCallback, useEffect } from "react";
import classes from "./Register.module.css";
import axios from "axios"
import { useSelector } from 'react-redux';

const Reg = () => {
  const auth = useSelector((state) => state.auth);
  const [start, setStart] = useState(false)
  const [error, setError] = useState(false)
  const hldr = (e)=>{
    e.preventDefault();
    setStart(true);
}

  const [ktjId, setKtjId] = useState([{ KtjId: "" }]);
  console.log(ktjId);
  
  useEffect(() => {
    // console.log("auth = ====" + auth.user);
    console.log("auth = ====" + auth.user.ktjID);
    const id = auth.user.ktjID;

    axios
    .post('/getPay', {ktjid : id } )
    .then((response) => {
      const data = response.data;
      // console.log(data.paid,"++")
      if(data.paid == "yes" )
      {
        setError(true)
        localStorage.setItem("pkey","yes");
      }
      else{
        localStorage.setItem("pkey","no");
      }
    })
    .catch((error) => console.log('err', error))
  }, [])
  

  /* const receiveId = (e,index) => {
   setKtjId({...ktjId,[e.target.name]:e.target.value})
   } */
  return (
    <>
      {
        start === true ?
            // <iframe src="https://bharatversity.com/events/eventdetails/df53a2b4-0014-4603-9915-5f82c4fb7888" width="100%" height="600px" frameBorder="0px" className={classes.container0}></iframe>
            // <iframe src="https://www.meraevents.com/ticketWidget?eventId=258920&ucode=organizer&wcode=9063CD-9063CD-333333-9063CD-&theme=1" width="100%" height="600px" frameBorder="0px" className={classes.container0}></iframe>
            <iframe src="https://www.meraevents.com/ticketWidget?eventId=258675&ucode=organizer&wcode=9063CD-9063CD-333333-9063CD-&theme=1" width="100%" height="600px" frameborder="0px" className={classes.container0}></iframe>
             :
           <div className={classes.container}>
            <div className={classes.container1}>
              <div className={classes.headerA}>
                BOOK YOUR ACCOMMODATION
                <div>
                <span style={{color:"white",fontWeight:"bold", fontSize:"1rem"}}>Keep Your KTJ Id with you before payment
                </span>
                </div>
                </div>
              
              {!error? <button className={classes.buttonA2} onClick={e=>hldr(e)} >PROCEED</button> : ""}
              {error? <div className={classes.headerC}>You have already booked your accomodation</div> : ""}
              <div className={classes.headerB}>( It might take upto 24hrs to get your profile updated. Incase not, contact us at  accomodation@ktj.in )</div>
            </div>
            </div>
      }
    </>
  )

}

export default Reg;
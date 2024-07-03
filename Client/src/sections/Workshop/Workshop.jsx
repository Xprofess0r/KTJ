import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Assuming you are using Redux

import { message } from "antd";
import axios from "../../api";
import classes from './Workshop.module.css';
import { updateUserInfo } from "../../actions/authActions";

function Workshop() {

  const auth = useSelector((state) => state.auth.user);
  const [isRegistered, setisRegistered] = useState(false);
  // console.log(auth);
  const [user, setUser] = useState(auth)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [eventData, seteventData] = useState([]);
  const [dloading, setdloading] = useState(false);

  const fetchEventData = () => {
    setdloading(true);
    axios
      .get("/workshops/getOnlyWorkshops")
      .then((result) => {
        let data = result.data.workshops.map((workshop, index) => {
          return {
            title: workshop.title,
            description: workshop.description,
            imageUrl: workshop.imageUrl,
            company: workshop.company,
            joining_link: workshop.joining_link,
            actions: workshop,
            key: index
          };
        });

        // message.success("Data Fetched Successfully");
        seteventData(data);
        setdloading(false);
      })
      .catch((error) => {
        setdloading(false);
        console.log(error);
        // message.error(
        //   error.response.data.message
        //     ? error.response.data.message
        //     : error.response
        // );
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);

  const handleRegister = (eventID) => {

    // console.log(eventID);

    const isAlreadyRegistered = user.workshops?.includes(eventID);
  
    if (isAlreadyRegistered) {
      message.success("Already registered for the session");
      // alert("Already registered for the session")
      return;
    }


    axios.post("/workshops/userwsReg", {ktjID: auth.ktjID, wsId: eventID})
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user)
        message.success(res.data.message);
        // alert(res.data.message);
        updateUserInfo(auth._id)
        setisRegistered(true);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        message.error(err.response.data.message);
        setisRegistered(false);
      });
  };

  return (
    <>
      <div className={classes.container}>
        <img src="https://i.postimg.cc/NMX2pK28/bg-1.png" alt="" />
        <img className={classes.robot} src="https://i.postimg.cc/W4Fd1d8R/robot-1.png" alt="" />
        <div className={classes.heading}>WORKSHOP</div>
        <div className={classes.Outerbox}>
          <div className={classes.left}></div>
          <div className={classes.right}>
            {eventData.map((event, index) => (
              <>
                <div className={classes.box} key={index}>
                  <img className={classes.eventPoster} src={event.imageUrl}/>
                  <div className={classes.eventDetails}>
                    <span className={classes.eventCompany}>By {event.company}</span>
  
                    <div className={classes.eventButtons}>
                      <input type="button" value="Register" onClick={() => { handleRegister(event.actions._id) }}/>
                      { event.joining_link &&
                        <a target="_blank" href={event.joining_link} className={classes.eventLink}>Click to Join</a>
                      }

                    </div>

                    <br/>
                    <span className={classes.eventDescription}>{event.description}</span>
                  </div>
                </div>
                <span className={classes.eventTitle}>{event.title}</span>
              </>

            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default Workshop;
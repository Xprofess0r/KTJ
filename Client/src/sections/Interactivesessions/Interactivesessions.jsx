import React, { useState, useEffect } from "react";
import {message} from "antd";
import { useSelector } from "react-redux"; // Assuming you are using Redux
import classes from "./Interactivesessions.module.css";
import Slider from "react-slick";
import axios from "../../api";
import { Link, useNavigate } from "react-router-dom";
// import { google_analy } from "./your-google-analy-function";
import { updateUserInfo } from "../../actions/authActions";


function Interactivesessions() {
  const [sessions, setSessions] = useState([]);
  const [isRegistered, setisRegistered] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.user);
  // console.log(auth);
  const [user, setUser] = useState(auth)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Fetch data from your backend API
    axios.get("/interactive/")
      .then((res) => {
        // console.log(res);
        setSessions(res.data.iu);
      })
      .catch(error => console.error("Error fetching data:", error));
    axios.get(`/interactive/getIUpdatedUser/${auth._id}`)
    .then((res)=>{
      // console.log(res);
      setUser(res.data.user);
    })
  }, []);

  useEffect(() => {
    // Check if any session number is included in the user's interactive array
    if (sessions) {
      const foundRegisteredSession = sessions.find(session => auth.interactive?.includes(session.number));

      if (foundRegisteredSession) {
        setisRegistered(true);
      }
    }

  }, [auth.interactive, sessions]);

  const register = (number) => {
    // Check if the user is already registered for the session
    console.log(auth.interactive.length);
    const isAlreadyRegistered = user.interactive?.includes(number);
  
    if (isAlreadyRegistered) {
      message.success("Already registered for the session");
      navigate('/Accommodation');
      // alert("Already registered for the session")
      return;
    }
  
    console.log(number);
    axios.post("/interactive/register", { number: number, id:auth._id })
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user)
        message.success(res.data.message);
        // alert(res.data.message);
        updateUserInfo(auth._id)
        setisRegistered(true);
        navigate('/Accommodation');
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
        setisRegistered(false);
      });
  };

  const handleClick = (session) => {
    if (!isAuthenticated) {
      // Use Link for navigation
      return (
        <Link to="/signin" style={{ fontWeight: 400, paddingRight: "2rem" }}>
          REGISTER
        </Link>
      );
    }

    // google_analy(session.yourPropertyContainingY);
    register(session.number);
  };

  const settings = {
    rows: 1,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: classes.carousel,
    speed: 500,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.dabba}>
          <div className={classes.heading}>INTERACTIVE SESSIONS</div>

          <div className={classes.bigbox}>
            <div className={classes.bigCard}>
              <Slider {...settings}>
                {!sessions && <span>No Workshops Yet</span>}
                {!(auth._id) && <span>Login to see workshops</span>}
                {sessions && sessions.map((session, index) => (
                  <div className={classes.card} key={index}>
                    <div className={classes.title_event}>{session.title}</div>
                    <div className={classes.img}>
                      <img src={session.imageUrl} alt={`Image ${index + 1}`} />
                    </div>
                    <button
                      className={classes.button}
                      onClick={() => handleClick(session)}
                    >
                      Register
                    </button>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Interactivesessions;

import React, { Component } from "react";
import Navbar from "../../NavBarCopy/Navbar";
import classes from "./Gamefest.module.css";
import TataProject from "../../../images/Tata.png";
import ScheduleCard from "../../ScheduleCard/ScheduleCard1";
import ImageGLecture from "../../../images/guestLectureCardjpg.jpg";
import SideDrawer from "../../../mobile/src/Components/SideDrawer/SideDrawer";

// Importing images
import CSGO from "./images/CSGO.jpg";
import Valorant from "./images/Valorant.jpg";
import DOTA2 from "./images/DOTA2.jpg";
import CODM from "./images/CODM.jpg";
import MURDER from "./images/MURDER.jpg";
import CIA from "./images/CIA.jpg";
import Cat from "./images/Cat.jpg";
import Goose from "./images/Goose.jpg";


import ReactGa from "react-ga";
import axios from "../../../api";
const breakingpoint = 876;

class Gamefest extends Component {
  state = {
    CurrentDate: "Cataclysm",
    EventDates: ["Cataclysm", "Goosebumps",],
    
    MajorCardData: {
      title: "CATACLYSM",
      deadline: "",
      content:
        "The 3rd edition of Gamefest conducted by Kshitij, IIT Kharagpur. Total cash prize pool of INR 1,00,000.",
      imageUrl: Cat,
      registration_link: "",
    },
    MajorCardData2: {
        title: "GOOSEBUMPS INDIA",
        deadline: "11:00am - 12:30pm",
        content:
          "Goosebumps India is bringing the thrilling experience of a physical escape room to your computer screens. Come and play with your friends and family and make new memories in a game of problem solving & teamwork, making new high scores and breaking records.",
        imageUrl: Goose,
        registration_link: "",
      },
    Games: {
      Cataclysm: [
        {
          event: "CS GO",
          title: "Registration deadline: 5th February",
          deadline: "Top 8 teams will win cash prizes",
          content: "Prize money - INR 35,000",
          imageUrl: CSGO,
          registration_link:
            "https://docs.google.com/forms/d/e/1FAIpQLSdBco0_zc9EzGFloFvrklTjR36dnRTtb5q_dDCgmpFV7YgMzw/viewform?usp=sf_link",
        },
        {
            event: "Valorant",
            title: "Registration deadline: 5th February",
            deadline: "Top 8 teams will win cash prizes",
            content: "Prize money - INR 25,000",
            imageUrl: Valorant,
            registration_link:
              "https://docs.google.com/forms/d/e/1FAIpQLSdBco0_zc9EzGFloFvrklTjR36dnRTtb5q_dDCgmpFV7YgMzw/viewform?usp=sf_link",
        },
        {
            event: "DOTA 2",
            title: "Registration deadline: 5th February",
            deadline: "Top 8 teams will win cash prizes",
            content: "Prize money - INR 20,000",
            imageUrl: DOTA2,
            registration_link:
              "https://docs.google.com/forms/d/e/1FAIpQLSdBco0_zc9EzGFloFvrklTjR36dnRTtb5q_dDCgmpFV7YgMzw/viewform?usp=sf_link",
        },
        {
            event: "Call of Duty: Mobile",
            title: "Registration deadline: 5th February",
            deadline: "Top 8 teams will win cash prizes",
            content: "Prize money - INR 20,000",
            imageUrl: CODM,
            registration_link:
              "https://docs.google.com/forms/d/e/1FAIpQLSdBco0_zc9EzGFloFvrklTjR36dnRTtb5q_dDCgmpFV7YgMzw/viewform?usp=sf_link",
        },
      ],
      Goosebumps: [
        {
            event: "CIA TASK FORCE",
            title: "Registration deadline: 15th February",
            deadline: "",
            content: "360º VIRTUAL ESCAPE ROOM GAMING EXPERIENCE",
            imageUrl: CIA,
            registration_link:
              "https://docs.google.com/forms/d/e/1FAIpQLScDTkTcPYqPeebswTryR5GnTBWVGoBxcwPNbJu_tmDv1YDf4Q/viewform?usp=sf_link",
        },
        {
            event: "MURDER ON DELIVERY",
            title: "Registration deadline: 15th February",
            deadline: "",
            content: "360º VIRTUAL ESCAPE ROOM GAMING EXPERIENCE",
            imageUrl: MURDER,
            registration_link:
              "https://docs.google.com/forms/d/e/1FAIpQLScw2fVVbjdA2rQGZ-ja2jbThWhD3BDzlPyXs-BK7skYts4MfA/viewform?usp=sf_link",
        },
      ],
    },
    windowwidth: window.innerWidth,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    console.log('cdm');
    axios.get("/games/").then(res=>{
      let OldGames = JSON.parse(JSON.stringify(this.state.Games));
      OldGames['Cataclysm'] = res.data.games;
      this.setState({Games:OldGames})
    }).catch((error)=>{
      console.log('err',error);
    })
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }
  handleWindowSizeChange = () => {
    if (
      (window.innerWidth - breakingpoint) *
        (this.state.windowwidth - breakingpoint) <
      0
    )
      this.setState({ windowwidth: window.innerWidth });
  };
  render() {
    let Navigation = <Navbar Bgcolor={true} />;
    let isMobile = false;
    if (this.state.windowwidth < breakingpoint) {
      Navigation = <SideDrawer />;
      isMobile = true;
    }
    const { Games, CurrentDate } = this.state;
    return (
      <div className={classes.Schedule}>
        {Navigation}
        <div className={classes.Schedule_Body}>
          <div className={classes.Schedule_Heading}>Gamefest</div>
          <div className={classes.presented}>Presented By</div>
          <div className={classes.Schedule_TitleImage}>
            <img src={TataProject} alt="tataproject" />
          </div>
          <div className={classes.Schedule_DateTry}>
            {this.state.EventDates.map((date) => {
              return (
                <div
                  className={`${classes.Schedule_DateTry_DateTab}`}
                  style={
                    CurrentDate === date
                      ? { backgroundColor: " #474072", border: "none" }
                      : {}
                  }
                  onClick={() => {
                    ReactGa.event({
                      category: "Click",
                      action:
                        "Clicked the " + date + " date tab in Schedule page",
                    });
                    this.setState({ CurrentDate: date });
                  }}
                >
                  {date}
                </div>
              );
            })}
          </div>
          
          <div className={classes.Schedule_CardsContainer}>
            <div className={classes.Schedule_CardsContainer_left}>
                {   (isMobile)? 
                        (this.state.CurrentDate == "Cataclysm")?
                            <ScheduleCard {...this.state.MajorCardData} />
                        :
                        <ScheduleCard {...this.state.MajorCardData2} />
                    :
                        null
                }

              {Games[CurrentDate].map((Lecture) => {
                return <ScheduleCard {...Lecture} />;
              })}
            </div>
            {!isMobile ?
            (
                <div className={classes.Schedule_MainTataProjectCardCnt}>
                    <div className={classes.Schedule_majorCard}>
                        <div className={classes.Schedule_majorCardImageCnt}>
                            {
                                (this.state.CurrentDate == "Cataclysm")?
                                <img className={classes.Schedule_majorCardImageCnt} src={Cat} />
                                :
                                <img className={classes.Schedule_majorCardImageCnt} src={Goose} />
                            }
                        </div>
                        <div>
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "1.4rem",
                                    textAlign: "center",
                                    transform: "translateY(-50%)",
                                    }}
                            >
                                {
                                    (this.state.CurrentDate == "Cataclysm")?
                                    "CATACLYSM"
                                    :
                                    "GOOSEBUMPS INDIA"
                                }
                                        
                            </div>
                            
                            <div style={{ textAlign: "justify" }}>
                                {
                                    (this.state.CurrentDate == "Cataclysm")?
                                    "The 3rd edition of Gamefest conducted by Kshitij, IIT Kharagpur. Total cash prize pool of INR 1,00,000."
                                    :
                                    "Goosebumps India is bringing the thrilling experience of a physical escape room to your computer screens. Come and play with your friends and family and make new memories in a game of problem solving & teamwork, making new high scores and breaking records.  "
                                }

                            
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Gamefest;

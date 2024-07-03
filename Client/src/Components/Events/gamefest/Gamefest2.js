import React, { Component } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import classes from "./Schedule2.module.css";
import TataProject from "../../images/Tata.png";
import ScheduleCard from "../../Components/ScheduleCard/ScheduleCard";
import ImageGLecture from "../../images/guestLectureCardjpg.jpg";
import SideDrawer from "../../mobile/src/Components/SideDrawer/SideDrawer";

// Importing images
import ansys from "./images/ansys.jpg";
import anupSoni from "./images/anupSoni.webp";
import ashwiniNachappa from "./images/ashwiniNachappa.jpg";
import codechef from "./images/codechef.png";
import youTube from "./images/youtube-logo.png";
import dipa from "./images/dipa.jpg";
import eleation from "./images/eleation.png";
import google from "./images/google.png";
import ibmz from "./images/ibmz.png";
import marvell from "./images/marvell.jpg";
import mcafeee from "./images/mcaffee.png";
import niteshTiwari from "./images/niteshTiwari.webp";
import sap from "./images/sap.jpg";
import shreyasTalpade from "./images/shreyasTalpade.jpg";
import slayyPoint from "./images/slayy.jpg";
import line from "../../Components/Events/img/sponsors/line-80px.png";
import synopsys from "../Sponsors/Sponsors2020/Event Sponsors/Synopsys/synopsys.png";
import kla from "../Sponsors/Sponsors2020/Event Sponsors/KLA/kla.png";
import jsl from "../Sponsors/Sponsors2022/Event sponsor/jsl-logo-f (2).jpg";
import mouser from "../Sponsors/Sponsors2022/Event sponsor/m-mouserelectronics-horizontal-fullcolor-white.png";
import ReactGa from "react-ga";
const breakingpoint = 876;

class Schedule extends Component {
  state = {
    CurrentDate: "29",
    EventDates: ["29", "30"],
    MajorCardData: {
      Host: "Virtual Industrial Visit",
      Timing: "11:00am - 12:30pm",
      About:
        "The iconic Mumbai Trans Harbour Link Projects (MTHL) is a  22km long sea bridge project that will provide a critical link between Mumbai and Navi Mumbai.Tata Projects Limited will provide a virtual tour of this project",
      Image: TataProject,
      link: "https://www.airmeet.com/e/71019630-550c-11eb-ad6c-d9d92f03cf8c",
    },
    GuestLectures: {
      29: [
        {
          event: "Virtual Technology Summit Session 1",
          Host: "",
          Timing: "5:30pm - 7:30pm ",
          About: "",
          Image: ImageGLecture,
          link:
            "https://www.airmeet.com/e/0a2b12e0-55c7-11eb-944c-7bde83562d21",
        },
        {
          event: "Workshop",
          Host: "Enterprize Computing Jam",
          company: " By IBM",
          Timing: "6:15pm - 8:30pm ",
          About:
            "You will learn about the collection of big business software solutions to common problems such as resource management and streamlining processes",
          Image: ibmz,
          link:
            "https://www.airmeet.com/e/ac69f100-5579-11eb-ad6c-d9d92f03cf8c",
        },
      ],
      30: [
        {
          event: "Workshop",
          Host: "Computer Aided Engineering",
          company: "By Eleation",
          Timing: "9:00am - 10:00am ",
          About:
            "you will learn to improve product designs and assist in the resolution of engineering problems for a wide range of industries from exceptionally motivated, skilled, and committed professionals",
          Image: eleation,
          link:
            "https://www.airmeet.com/e/327606f0-54e2-11eb-8497-5553e7235276",
        },
        {
          event: "Workshop",
          Host: "Malware Trends And Analysis",
          company: "McAfee",
          Timing: "2:00pm - 4:00pm ",
          About:
            '"Malware Trends & Analysis", by McAfee, where participants will be introduced to different types of malware, the current threat landscapes and the basics of how researchers analyze a malware',
          Image: mcafeee,
          link:
            "https://www.airmeet.com/e/a1c1f040-5592-11eb-ad6c-d9d92f03cf8c",
        },
        {
          event: "Virtual Technology Summit Session 2",
          Host: "",
          Timing: "4:00pm - 5:30pm ",
          About: "",
          Image: ImageGLecture,
          link:
            "https://www.airmeet.com/e/f1c56610-572e-11eb-944c-7bde83562d21",
        },
        {
          event: " Youtubers roundtable",
          Host: "The rakwnee show, maxtern, satish ray",
          Timing: "4:00pm - 5:30pm",
          About: "",
          Image: youTube,
          link:
            "https://www.airmeet.com/e/97466be0-54e9-11eb-ad6c-d9d92f03cf8c",
        },
        {
          event: "Interactive Session",
          Host: "Nitesh Tiwari,Ashwini Iyer Tiwari",
          Timing: "5:30pm - 7:00pm ",
          About: "",
          Image: niteshTiwari,
          link:
            "https://www.airmeet.com/e/d9bf5600-54d3-11eb-ab74-0d8e4c467e01",
        },
        {
          event: "Interactive Session",
          Host: "Anup Soni",
          Timing: "6:30pm - 7:30pm ",
          About: "",
          Image: anupSoni,
          link:
            "https://www.airmeet.com/e/228fc420-54f5-11eb-adcc-412ac7b3a968",
        },
        {
          event: "Interactive Session",
          Host: "Ashwini Nachappa",
          Timing: "7:15pm - 8:00pm ",
          About: "",
          Image: ashwiniNachappa,
          link:
            "https://www.airmeet.com/e/acea2980-54f5-11eb-ab74-0d8e4c467e01",
        },

        {
          event: "Workshop",
          Host: "Headstart to Competitive Programming",
          company: "Access Code : HEADSTART",
          Timing: "8:30pm - 10:30pm ",
          About: "",
          Image: codechef,
          link:
            "https://unacademy.com/class/headstart-to-competitive-programming/EXBBCUXR",
        },
      ],
      /*
      17: [
        {
          event: "Workshop",
          Host: "Enabling Technology Revolutions",
          company: "By Marvell",
          Timing: "9:00am - 10:30am ",
          About: "",
          Image: marvell,
          link:
            "https://www.airmeet.com/e/4c4feb30-5551-11eb-adcc-412ac7b3a968",
        },
        {
          event: "Workshop",
          Host: "Design and Development of EV",
          company: "By Ansys",
          Timing: "11:00am - 12:30pm ",
          About: "",
          Image: ansys,
          link:
            "https://www.airmeet.com/e/f806aa10-5590-11eb-ab74-0d8e4c467e01",
        },
        {
          event: "Workshop",
          Host: "Intelligent Supply Chain",
          company: "By SAP",
          Timing: "11:30am - 1:15pm ",
          About: "",
          Image: sap,
          link:
            "https://www.airmeet.com/e/90e0bb30-556f-11eb-ab74-0d8e4c467e01",
        },
        {
          event: "Workshop",
          Host: "Adversarial Robustness in Deep Learning",
          company: "By Google Developers Experts",
          Timing: "2:00pm - 5:00pm ",
          About: "",
          Image: google,
          link:
            "https://www.airmeet.com/e/24881050-54b6-11eb-8497-5553e7235276",
        },
        {
          event: "Interactive Session",
          Host: "Shreyas Talpade",
          Timing: "5:00pm - 6:00pm ",
          About: "",
          Image: shreyasTalpade,
          link:
            "https://www.airmeet.com/e/66f03b50-54d1-11eb-ad6c-d9d92f03cf8c",
        },
        {
          event: "Interactive Session",
          Host: "Slayy Point (Youtuber) ",
          Timing: "6:00pm - 7:00pm ",
          About: "",
          Image: slayyPoint,
          link:
            "https://www.airmeet.com/e/2dbc3850-54f6-11eb-adcc-412ac7b3a968",
        },
        {
          event: "Interactive Session",
          Host: "Dipa Karmakar",
          Timing: "7:00pm - 8:00pm ",
          About: "",
          Image: dipa,
          link:
            "https://www.airmeet.com/e/07edcdf0-54d3-11eb-8497-5553e7235276",
        },
      ],
      */
    },
    windowwidth: window.innerWidth,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
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
    const { GuestLectures, CurrentDate } = this.state;
    return (
      <div className={classes.Schedule}>
        {Navigation}
        <div className={classes.Schedule_Body}>
          <div className={classes.Schedule_Heading}>Schedule Phase 2 </div>
          <div className={classes.presented}>Presented By</div>
          <div className={classes.Schedule_TitleImage}>
            <img src={TataProject} alt="tataproject" />
          </div>

          <div className={classes.Schedule_Divider}>
            <img className={classes.imagecnt} src={line} />
            <img className={classes.imagecnt} src={synopsys} />
            <img className={classes.imagecnt} src={kla} />
            <img className={classes.imagecnt} src={mouser} />
            <img className={classes.imagecnt} src={jsl} />
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
                  {date}th
                </div>
              );
            })}
          </div>
          <div
            className={classes.HowToUseAirmeet}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action:
                  "Clicked the How to use airmeet button in schedule page ",
              });
            }}
          >
            <a
              href="https://www.youtube.com/watch?v=Z7IiXgiVLXg"
              target="_blank"
            >
              How to Use Airmeet{" "}
            </a>
          </div>
          <div className={classes.workshops}>
            <div className={classes.workshops_row}>Workshops</div>
            <div className={classes.workshops_images}>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
            </div>
          </div>
          <div className={classes.workshops}>
            <div className={classes.workshops_row}>Events</div>
            <div className={classes.workshops_images}>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
              <div className={classes.workshops_image}>
                <a>
                  <img src={line} />
                </a>
              </div>
            </div>
          </div>

          <div className={classes.Schedule_CardsContainer}>
            {!isMobile ? (
              <div className={classes.Schedule_MainTataProjectCardCnt}>
                <div className={classes.Schedule_majorCard}>
                  <div className={classes.Schedule_majorCardImageCnt}>
                    <img
                      className={classes.Schedule_majorCardImageCnt}
                      src={TataProject}
                    />
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
                      TED TALK
                    </div>
                    <div className={classes.majorCardDate}> 16th Jan</div>
                    <div className={classes.majorCardTime}>
                      11:00am - 12:30pm
                    </div>
                    <div style={{ textAlign: "justify" }}>
                      The iconic Mumbai Trans Harbour Link Projects (MTHL) is a
                      22km long sea bridge project that will provide a critical
                      link between Mumbai and Navi Mumbai.Tata Projects Limited
                      will provide a virtual tour of this project
                    </div>
                    <a
                      onClick={() => {
                        ReactGa.event({
                          category: "Click",
                          action:
                            "Clicked the Join here in the Tata project in schedule",
                        });
                      }}
                      href="https://www.airmeet.com/e/71019630-550c-11eb-ad6c-d9d92f03cf8c"
                      target="_blank"
                      className={classes.joinbtn}
                    >
                      Join Here
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
            <div className={classes.Schedule_CardsContainer_left}>
              {isMobile ? <ScheduleCard {...this.state.MajorCardData} /> : null}

              {GuestLectures[CurrentDate].map((Lecture) => {
                return <ScheduleCard {...Lecture} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;

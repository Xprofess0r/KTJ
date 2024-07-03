import { useEffect, useState } from "react";
import classes from "./Events.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponsiveCarousel from "./Carousel/Carousel.jsx";
// import styled from "styled-components";
import API from "../../api";



function Event_24() {
  const [events, setEvents] = useState([]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          vertical: true,
          verticalSwiping: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          // rows: 3,
        },
      },
    ],
  };

  // const ArrowBtn = styled.span`
  //   display: inline-block;
  //   position: absolute;
  //   top: 50%;
  //   right: ${({ type }) => (type === "right" ? "8px" : "unset")};
  //   left: ${({ type }) => (type === "left" ? "8px" : "unset")};
  //   transform: ${({ type }) =>
  //     `translateY(-50%) rotate(${type === "right" ? "45deg" : "-135deg"})`};
  //   width: 1.5rem;
  //   height: 1.5rem;
  //   cursor: pointer;
  //   border-top: 0.24rem solid #888;
  //   border-right: 0.24rem solid #888;
  //   border-color: white;
  //   font-weight: 1200;
  //   &:hover {
  //     border-color: #333;
  //   }
  // `;

  const loadEvents = () => {
    API.get("/competitions").then((res) => {
      setEvents(res.data.competitions);
    });
  };

  useEffect(() => {
    loadEvents();
  }, []);
  return (
    <>
      <div className={classes.bg}>
        <div className={classes.heading}>EVENTS</div>

        <div className={classes.container}>
          <div className={classes.human}>
            <img src="https://i.postimg.cc/RFD0w40r/girl-final-1.png"></img>
          </div>

          <div className={classes.robot}>
            <img src="https://i.postimg.cc/pT4FRDzn/event-robot-1.png"></img>
          </div>

          <div className={classes.carousel}>
            {/* <Slider {...settings}>
              {events &&
                events.map((events) => (
                  <div key={events.id}>
                    <div className={classes.Events_data}>
                      <div className={classes.Events_title}>{events.title}</div>
                      <input
                        className={classes.registerBTN}
                        type="button"
                        value="REGISTER"
                      />
                    </div>
                  </div>
                ))}
            </Slider> */}
            <ResponsiveCarousel/>
          </div>

          {/* <div className={classes.carouselTab}>
            <h2>tab</h2>
            <Slider {...settings}>
              {events &&
                events.map((events) => (
                  <div key={events.id}>
                    <div className={classes.Events_data}>
                      <div className={classes.Events_title}>{events.title}</div>
                      <input
                        className={classes.registerBTN}
                        type="button"
                        value="REGISTER"
                      />
                    </div>
                  </div>
                ))}
            </Slider>
          </div>

          <div className={classes.carouselMob}>
            <h2>mobile</h2>
            <Slider {...settings}>
              {events &&
                events.map((events) => (
                  <div key={events.id}>
                    <div className={classes.Events_data}>
                      <div className={classes.Events_title}>{events.title}</div>
                      <input
                        className={classes.registerBTN}
                        type="button"
                        value="REGISTER"
                      />
                    </div>
                  </div>
                ))} 
              
                </Slider>
                </div>*/}

          {/* <div className={classes.carousel}>
            <Carousel
              rows={2}
              cols={3}
              loop
              containerStyle={{
                width: "min-content",
                margin: "4rem auto 0 auto",
              }}
              arrowLeft={<ArrowBtn type="left" />}
              arrowRight={<ArrowBtn type="right" />}
            >
              {events.map((events) => (
                <Carousel.Item containerStyle={{}} key={events.id}>
                  <div className={classes.Events_data}>
                    <div className={classes.Events_title}>{events.title}</div>
                    <input
                      className={classes.registerBTN}
                      type="button"
                      value="REGISTER"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className={classes.carouselTab}>
            <Carousel
              rows={3}
              cols={2}
              loop
              containerStyle={{
                width: "min-content",
                margin: "1rem auto 0 auto",
              }}
              arrowLeft={<ArrowBtn type="left" />}
              arrowRight={<ArrowBtn type="right" />}
            >
              {events.map((events) => (
                <Carousel.Item containerStyle={{}} key={events.id}>
                  <div className={classes.Events_data}>
                    <div className={classes.Events_title}>{events.title}</div>
                    <input
                      className={classes.registerBTN}
                      type="button"
                      value="REGISTER"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className={classes.carouselMob}>
            <Carousel
              rows={3}
              cols={1}
              mobileBreakpoint={0}
              loop
              containerStyle={
                {
                  // width: "min-content",
                  // margin: "1rem auto 0 auto"
                }
              }
              arrowLeft={<ArrowBtn type="left" />}
              arrowRight={<ArrowBtn type="right" />}
            >
              {events.map((events, i) => (
                <Carousel.Item
                  containerStyle={{ width: "1rem !important" }}
                  key={i}
                >
                  <div className={classes.Events_data}>
                    <div className={classes.Events_title}>{events.title}</div>
                    <input
                      className={classes.registerBTN}
                      type="button"
                      value="REGISTER"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div> */}

          {/* <div className={classes.tablet_screen}>
            <Carousel
              rows={1}
              cols={2}
              loop
              containerStyle={{ width: "100%" }}
              arrowLeft={<ArrowBtn type="left" />}
              arrowRight={<ArrowBtn type="right" />}
            >
              {events.map((events) => (
                <Carousel.Item containerStyle={{}} key={events.id}>
                  <div className={classes.Events_data}>
                    <div className={classes.Events_title}>{events.title}</div>
                    <button className="register_btn">REGISTER</button>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className={classes.phone_screen}>
            <Carousel
              rows={1}
              cols={1}
              loop
              containerStyle={{ width: "100%" }}
              arrowLeft={<ArrowBtn type="left" />}
              arrowRight={<ArrowBtn type="right" />}
            >
              {events.map((events) => (
                <Carousel.Item containerStyle={{}} key={events.id}>
                  <div className={classes.Events_data}>
                    <div className={classes.Events_title}>{events.title}</div>
                    <button className="register_btn">REGISTER</button>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className={classes.phone_screen_vertical}>
            <div className={classes.heading_phone}>EVENTS</div>
            {events.map((events) => (
              <div className={classes.car_img} key={events.id}>
                <div className={classes.Events_title}>{events.title}</div>
                <button className="register_btn">REGISTER</button>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Event_24;

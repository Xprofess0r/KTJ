import React, { Component } from "react";
import Classes from "./Summit.module.css";
import mike from "../img/summit/mike-8.png";
import ReactGa from "react-ga";
class Summit_1 extends Component {
  render() {
    let window_height = window.innerHeight;
    console.log(this.props);
    return (
      <div>
        <div className={Classes.back}>
          <div className={Classes.box}>
            <h1 className={Classes.heading}>{this.props.heading}</h1>
            <div className={Classes.content_box}>
              {this.props.guests.map((guest, index) => (
                <div>
                  <img
                    src={`${this.props.guestProfilePhotos[index]}`}
                    className={Classes.img}
                  />
                  <div className={Classes.discription}>
                    <b className={Classes.color}>{guest.name}</b>
                    <br />
                    <p className={Classes.topic}>
                      <b>TOPIC:-</b>
                      {guest.topic}
                    </p>
                    <p className={Classes.position}>{guest.profession}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={this.props.meeting_link}
              target="_blank"
              onClick={() => {
                ReactGa.event({
                  category: "Click",
                  action: "joing" + this.props.heading,
                });
              }}
            >
              <button className={Classes.REGISTER}>JOIN</button>
            </a>
          </div>

          <div className={Classes.mike_pos}>
            <img src={mike} alt="MIKE" className={Classes.mike} />
          </div>
        </div>
      </div>
    );
  }
}

export default Summit_1;

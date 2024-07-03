import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactGa from "react-ga";

// CSS import
import "./index.css";

function Card(props) {
  const navigate = useNavigate();

  const closeFooter = () => {
    ReactGa.event({
      category: "Click",
      action: "Clicked Explore button of " + props.title,
    });
    window.scroll({ left: 0, top: 0, behavior: "smooth" });
  };

  let redirecturl = "/event/" + props.id;
  // "/event/" + props.title.trim().toLowerCase().replace(" ", "-");

  return (
    <div>
      <div
        id="evt_card"
        className="card_desk"
        onClick={() => navigate(redirecturl)}
      >
        <img src={`${props.imageUrl}`} id="background_img" />
        <div id="card_details">
          <div id="margins">
            <div
              id="card_content"
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></div>
          </div>
          <Link onClick={closeFooter} to={redirecturl}>
            <button id="firstbtn">Click to know more</button>
          </Link>
        </div>
      </div>
      <h1
        className="Title_comp"
        onClick={() => navigate(redirecturl)}
      >
        {props.title}
      </h1>
      <div id="card_content" className="card_mobile">
        <img src={`${props.imageUrl}`} id="background_img2" />
        <div className="lower_part_card">
          <div id="margins">
            <span className="title_mobile">{props.title}</span>
            <h6 id="prize_h6">
              <i>Prize Money : INR {props.prize}</i>
            </h6>
            <div>Description:</div>
            <div
              className="des"
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></div>
          </div>
          <Link onClick={closeFooter} to={redirecturl}>
            <button id="firstbtn">Click to know more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;

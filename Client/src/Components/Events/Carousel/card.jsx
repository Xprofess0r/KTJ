/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import classes from "./Carousel.module.css";

const Card = (props) => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.evt_card}>
        <img
          draggable={false}
          src={props.imageUrl}
          className={classes.background_img}
        />
        <div className={classes.card_details}>
          <div className={classes.margins}>
            <div className={classes.card_content}>{props.content}</div>
          </div>
          <button
            className={classes.firstbtn}
            onClick={() => navigate(`/event/${props.id}`)}
          >
            Click To Know More
          </button>
        </div>
      </div>
      <div className={classes.content_head}>{props.title}</div>
    </div>
  );
};

export default Card;

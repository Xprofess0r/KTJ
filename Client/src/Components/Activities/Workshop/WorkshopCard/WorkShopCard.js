import React from "react";
import classes from "./WorkShopCard.module.css";
import { Link, withRouter } from "react-router-dom";
import ReactGa from "react-ga";

function WorkShopCard(props) {
  return (
    <div className={classes.WorkShopCard}>
      <div className={classes.WorkShopCardInner}>
        <div className={classes.WorkShopCardFront}>
          <img
            className={classes.imagelogo}
            src={`http://localhost:5000/${props.imageUrl}`}
            alt={props.title}
          />
        </div>
        <div className={classes.WorkShopCardBack}>
          <div className={classes.WorkshopName}>{props.title}</div>
          <div className={classes.WorkshopHost}>By {props.host}</div>
          <Link
            to={`${props.match.path}/${props.title}`}
            onClick={(event) => {
              ReactGa.event({
                category: "Click",
                action: "Clicked the header learn more button in workshop card",
              });
            }}
          >
            <div className={classes.KnowMoreBtn}>Click to learn More </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(WorkShopCard);

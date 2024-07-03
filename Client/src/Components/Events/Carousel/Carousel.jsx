import React, { useEffect, useState } from "react";
import axios from "../../../api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { StackedCarousel } from "react-stacked-center-carousel";
import ReactGa from "react-ga";
// import Card from "../../Card/card";
import Card from "./card"
import classes from "./Carousel.module.css";

const ResponsiveCarousel = (props) => {
  const [compdata, setCompData] = useState([]);
  const { compId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/competitions")
      .then((res) => {
        setCompData(res.data.competitions.reverse());
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  return (
    <div style={{ width: "100%", position: "absolute" }}>
      <>
        {compdata.length > 0 ? (
          <div className={classes.scroll}>
            
            <div className={classes.eveCard}>
              {compdata.map((e,i) =>{
                // console.log(e._id);
                return (
                    <Card
                    key={i}
                    id={e._id}
                    imageUrl={e.imageUrl}
                    title={e.title}
                    prize_money={e.prize_money}
                    content={e.content}
                    competitionUrl={e.competitionUrl}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
};


export default ResponsiveCarousel;

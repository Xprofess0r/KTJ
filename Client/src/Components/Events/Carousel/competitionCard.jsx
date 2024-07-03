import React, { useEffect, useState } from "react";
import classes from "./compcard.module.css";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BackBtn from "./BackBtn";
import axios from "../../../api";

const Info = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();  // Replace useHistory with useNavigate
  const [compData, setCompData] = useState({});
  const [compOrgData, setCompOrgData] = useState({});
  const { compId } = useParams();
  // console.log(compId)

  let registerCheck = () => {
    if (!auth.isAuthenticated) {
      localStorage.setItem("PreviousPath", window.location.pathname);
      navigate("/signin");
    } else {
      navigate(`/register/${compId}`);
    }
  };

  let handleViewTeam = () => {
    if (!auth.isAuthenticated) {
      localStorage.setItem("PreviousPath", window.location.pathname);
      navigate("/signin");
    } else {
      navigate(`/register/${compId}`);
    }
  };

  let problemStatement = () => {
    window.open(compData.problem_statement_link, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (compId == null) {
      navigate("/events");
    }
    document
      .getElementsByClassName(classes.heading)[0]
      .addEventListener("hover", () => {
        this.childNode.style.color = "black !important";
      });


    axios
      .get("/competitions")
      .then((res) => {
        if (res.data?.competitions?.length) {
          // console.log("res ",res.data)
          let k = 0;
          Array.from(res.data?.competitions).forEach((element) => {
            if (element._id === compId) {
              setCompData(element);
              // console.log(element)
              axios
                .get(`/findUser?ktjid=${element.headKtjId}`)
                .then((res) => {
                  if (res.data) {
                    if (res.data?.payLoad) setCompOrgData(res.data?.payLoad);
                  }
                })
                .catch((error) => {
                  console.log("err", error);
                });
              k = 1;
            }
          });
          if (k === 0) navigate("/events");
        } else {
          navigate("/events");
        }
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, [compId, navigate]);

  return (
    <div className={classes.outbox}>
      <div className={classes.innerbox}>
        <div className={classes.leftbox}>
          <div className={classes.imgbox}>
            <>
              <img className={classes.imagetags} src={compData.imageUrl} alt="" />
            </>
          </div>
          <div className={classes.buttonbox}>
            {!compData.registration && (
              <div className={classes.regdown}>Registration Closed </div>
            )}
            <div className={classes.heading}>
              {compData.registration ? (
                <a
                  onClick={registerCheck}
                  id="regbutton"
                  target="_blank"
                  className={classes.anchortag}
                >
                  Registration
                </a>
              ) : (
                <a
                  onClick={handleViewTeam}
                  id="regbutton"
                  target="_blank"
                  className={classes.anchortag}
                >
                  View Team
                </a>
              )}
            </div>
            <div className={classes.heading}>
              <a
                onClick={problemStatement}
                id="regbutton"
                target=""
                className={classes.anchortag}
              >
                Problem Statement
              </a>
            </div>
          </div>
        </div>
        <div className={classes.rightbox}>
          <div className={classes.subheading}>{compData.title}</div>
          <div className={classes.prizemoney}>
            Prize Money: {compData.prize_money != undefined ? `INR ${compData.prize_money}` : "--"}
          </div>
          <br />
          <div className={classes.description}>Description :</div>
          <div className={classes.about}>
            {compData.content != undefined ? compData.content : "--"}
          </div>
          <div className={classes.contactus}>
            <div className={classes.contactitem}>Contact Us:</div>
            <div className={classes.subcontactitem}>
              {" "}
              <i className="fas fa-user-alt"></i> &nbsp;
              {compOrgData.username ? compOrgData.username : ""}{" "}
            </div>
            <div className={classes.subcontactitem}>
              <i className="fas fa-phone-alt"></i>&nbsp;
              {compOrgData.number ? compOrgData.number : " "}
            </div>
          </div>
        </div>
      </div>
      <BackBtn position="right-bottom" />
    </div>
  );
};

export default Info;

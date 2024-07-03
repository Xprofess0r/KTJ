import React,{useState,useEffect} from "react";
import { withRouter } from "react-router-dom";
import classes from "./WorkshopDetail.module.css";
import ReactGa from "react-ga";
import axios from "../../../../../api"

function WorkshopDetail(props) {

  const [WorkshopData, setWorkshopData] = useState({title:"",host:"",description:'',delivered_by:[],joining_link:"",imageUrl:""})
  useEffect(() => {
    axios.get('/workshops/').then(res=>{
      let workshops = res.data.workshops;
      let workshop = workshops.find((wrksp)=>{
        return wrksp.title===props.match.params.WorkshopName});
      setWorkshopData(workshop);
    }).catch((error)=>{
      console.log('err',error);
    })
  }, [])

  console.log(WorkshopData);
  return (
    <div className={classes.WorkshopDetail}>
      {/* <Navbar /> */}
      <div className={classes.WorkshopDetailCnt}>
        <div className={classes.ImageCnt}>
          <img
             src={`http://localhost:5000/${WorkshopData.imageUrl}`}
             alt={props.title}
          />
        </div>
        <div className={classes.InfoCnt}>
          <div className={classes.WorkshopName}>
            {WorkshopData.title}
          </div>
          <div className={classes.WorkshopHost}>
            By {WorkshopData.host}
          </div>
          <div className={classes.WorkshopDesc}>Delivery By</div>

          {WorkshopData.delivered_by?.map((db)=>{
            return (<div className={classes.WorkshopDesc}>
              {db.name } {db.profession}
            </div>)
          })}
          {/* {WorkshopData.DeliveryBy1 != "" ? (
            <>
              <div className={classes.WorkshopDesc}>
                {WorkshopData.DeliveryBy1}
              </div>
              <div className={classes.WorkshopDesc}>
                {WorkshopData.DeliveryBy2}
              </div>
            </>
          ) : null} */}

          <div className={classes.WorkshopDesc}>{WorkshopData.description}</div>
          <div className={classes.Registercontainer}>
            <div
              className={classes.register}
              onClick={() => {
                ReactGa.event({
                  category: "Click",
                  action:
                    "Clicked the Register  button in workshop detail of  " +
                    WorkshopData.title,
                });
                props.register(WorkshopData.title);
              }}
            >
              {props.error == "" ? "Register" : `${props.error}`}
            </div>
            <div
              className={classes.register}
              onClick={(event) => {
                ReactGa.event({
                  category: "Click",
                  action:
                    "Clicked the join button in workshop detail of " +
                    WorkshopData.title,
                });
              }}
            >
              <a
                href={WorkshopData.joining_link}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                Join Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(WorkshopDetail);

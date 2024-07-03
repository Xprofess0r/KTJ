import React from "react";
import Poster from "./Poster/Poster";
import classes from "./Workshop.module.css";
import { useState, useEffect } from 'react'
import ReactGa from "react-ga";
import API from '../../../api'
import { useParams } from "react-router-dom";
import Snowfall from 'react-snowfall'
import data from "../../../contactus/data";
import { useSelector, useDispatch } from "react-redux";
import { message } from 'antd'
import { useHistory } from "react-router-dom";


const Workshop = () => {
    const [CNumber, setCNumber] = useState(0)
    const [CNames, setCNames] = useState([""])
    const [wsdata, setwsdata] = useState([])
    const history = useHistory();
    let { title } = useParams();
    const workshops = useSelector((state) => state.auth.user.workshops);
    const is_auth = useSelector((state) => state.auth.isAuthenticated);
    const fetchWorkshops = () => {

        // setdloading(true);
        API.get("/workshops/getOnlyWorkshops")
            .then((result) => {
                let data = result.data.workshops.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).filter((e)=>{return !e.active}).map((workshop, index) => {
                    return {
                        id: workshop._id,
                        title: workshop.title,
                        description: workshop.description,
                        ImageLink: workshop.imageUrl,
                        conducted_by: workshop.company,
                        joining_link: workshop.joining_link,
                        key: index,
                    };
                });
                setwsdata(data);
                console.log(data)
                if (title != undefined) {
                    let n;
                    for (let index = 0; index < result.data.workshops.length; index++) {
                        if (result.data.workshops[index].title === title)
                            n = index;
                    }
                    console.log(title, '===til')
                    console.log(result.data.workshops[0].title, "oooppp n==", n)
                    setCNumber(n);
                } else { changeRoute(0); }
                console.log("params", title != undefined);

                // message.success("Data Fetched Successfully");
                // setdloading(false);
            })
            .catch((error) => {
                // setdloading(false);
                // message.error(
                //   error.response.data.message
                //     ? error.response.data.message
                //     : error.response
                // );
            });
    };

    const WorkshopRegister = (ktjID, wsId) => {
        if (is_auth === false) {
            history.push('/signin')
        }
        else {
            API.post("/workshops/userwsReg", { ktjID, wsId }).then((result) => {
                console.log(result);
                // message.success(result.data.message);
                message.success("Registered Successfully");
                fetchWorkshops();

            }
            ).catch((error) => {
                console.log(error.response.data.message);
                if (error.response.data.already_present == true) {
                    message.success("Already Registered");
                }
                else
                    message.error("Some error Occured");

            });
        }


    }


    useEffect(() => {
        console.log("fetching workshops")
        fetchWorkshops();
        console.log(workshops)
    }, [])

    return (
        <div className={classes.workshopPage}>
            <Snowfall snowflakeCount={120} wind={[.5, 3]} />
            <ul className={classes.contests}>
                <div className={classes.headings}>
                    <h1 className={classes.workshopHeading}>WORKSHOPS</h1>
                    {/* <h3 className={classes.workshopSubHeading}>XYZ</h3> */}
                </div>
                {wsdata.map((ele, idx) => { return <Poster name={ele.title} id={ele.id} desc={ele.description} img={ele.ImageLink} join={ele.joining_link} conducted={ele.conducted_by} key={idx} on_reg={WorkshopRegister} /> })}
            </ul>
        </div>
    );
}

export default Workshop;
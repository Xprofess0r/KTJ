import { React, useState, useEffect } from 'react'
import ReactGa from "react-ga";
import { useParams } from "react-router-dom";
import classes from "./Workshop.module.css"
import Cards from './Cards/Cards.js'
import API from '../../../api'

function Workshop(props) {
    const [CNumber, setCNumber] = useState(0)
    const [CNames, setCNames] = useState([""])
    const [wsdata, setwsdata] = useState([])
    
    let {title} = useParams();

    const fetchWorkshops = () => {
        
        // setdloading(true);
        API.get("/workshops/getOnlyWorkshops")
            .then((result) => {
                let data = result.data.workshops.map((workshop, index) => {
                    return {
                        title: workshop.title,
                        description: workshop.description,
                        ImageLink: workshop.imageUrl,
                        conducted_by: workshop.company,
                        joining_link: workshop.joining_link,
                        key: index,
                    };
                });

                setwsdata(data);
                console.log(result.data.workshops.length,"yaaaay")
                if(title != undefined){
                    let n;
                    for (let index = 0; index < result.data.workshops.length; index++) {
                        if(result.data.workshops[index].title === title)
                        n = index;
                    }
                    console.log(title,'===til')
                    console.log(result.data.workshops[0].title,"oooppp n==",n)
                    setCNumber(n);
                }else{ changeRoute(0); }
                console.log("params",title!=undefined);

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

    
    useEffect(() => {
        console.log("fetching workshops")
        fetchWorkshops();
    }, [])

    function changeRoute(x) {
        console.log("Change route called", x);
        props.history.push(`/activities/workshops/${wsdata[x].title}`);
    }

    return (
        <div className={classes.OuterPart}>
            <div className={classes.exhHeading}>
                <h2>WORKSHOPS</h2></div>
            <div className={classes.BorderCard}>
                <div className={classes.NameArea}>
                    {
                        wsdata.map((item, i) => {
                            return <div className={CNumber === i ? `${classes.AName} ${classes.TextSelected}` : `${classes.AName}`} onClick={(e) => {
                                console.log(CNames.indexOf(e.target.innerText));
                                setCNumber(i);
                                // console.log(i);
                                changeRoute(i);
                            }
                            } key={i}>{item.title}</div>
                        })

                    }
                </div>

                <div className={classes.MobileNameArea}>
                    {
                        wsdata.map((item, i) => {
                            return <div className={CNumber === i ? `${classes.AName} ${classes.TextSelected}` : `${classes.AName}`} onClick={(e) => {
                                console.log(CNames.indexOf(e.target.innerText))
                                setCNumber(i)
                                changeRoute(i);
                            }
                            } key={i}>{item.title}</div>
                        })
                    }
                </div>

                {
                    wsdata.length > 0 ?
                        (<div className={classes.CardArea}>
                            <Cards joinLink={wsdata[CNumber].joining_link} isWorkshop={true} className={classes.InCardArea} ImageLink={wsdata[CNumber].ImageLink} conducted_by={wsdata[CNumber].conducted_by} topic={wsdata[CNumber].title} p={wsdata[CNumber].description} cLink="" date="10/12/2022" YTlink={"../workshop/register/" + wsdata[CNumber].title} />
                        </div>) : ""
                }

            </div>
        </div>
    )
}

export default Workshop

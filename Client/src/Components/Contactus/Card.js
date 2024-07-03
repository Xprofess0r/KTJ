import React, {useEffect, useState} from 'react'
import classes from './contactus.module.css';
import phone from './Images/phone.png';
import mail from './Images/mail.png';
import linkedin from './Images/linkedin.png';
import fb from './Images/fb.png';
import loader from './Images/loader.gif';
export default function Card(props) {
    var arr = props.data.post.split(" ");
    const [loading, setLoading] = useState(false);
    const [test, setTest] = useState(0);
    useEffect(() => {
        setLoading(true);
    }, [])
    return (
        <>
            <div className={classes.card}>
                <div className={classes.cardimage}>
                    {/* <div className={classes.dummyimg}></div> */}
                    {/* <img onLoad={()=>{
                        setLoading(false);
                        console.log("Img loaded for ", props.data.name, loading);
                    }} src={props.data.image} style={{maxwidth: '100%', visibility: loading ? "hidden":"visible"}} className={classes.img} alt="" /> */}
                    
                    {!test && <svg style={{width: '10vw'}} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
                            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                            <animateTransform 
                                attributeName="transform" 
                                attributeType="XML" 
                                type="rotate"
                                dur="1s" 
                                from="0 50 50"
                                to="360 50 50" 
                                repeatCount="indefinite" />
                        </path>
                        </svg>}
                    <img onLoad={()=>{
                        setLoading(false);
                        setTest(1);
                        // console.log("Img loaded for ", props.data.name, loading);
                    }} src={props.data.image} style={{maxwidth: '100%', visibility: test==0 ? "hidden":"visible"}} className={classes.img} alt="" />
                    {/* {loading && <div>Loading</div>} */}
                </div>
                    <div className={classes.social}>
                       <div className={classes.iconlinkw}><a  href={props.data.linkedin} target="_blank"><img className={classes.socialicon} src={linkedin} alt="" /></a> </div>
                       <div className={classes.iconlinkw}><a  href={props.data.facebook} target="_blank"><img className={classes.socialicon} src={fb} alt="" /> </a> </div>
                       <div className={classes.iconlinkw}><a  href={"mailto: " +props.data.email} target="_blank"><img className={classes.socialicon} src={mail} alt="" />  </a> </div>
                    </div>
                <div className={classes.name} style={test==0?{position: "unset"}:{}}>
                    {props.data.name}
                    {/* {loading} */}
                    {/* {test} */}
                    <div className={classes.post}>
                        {arr.map((word, index)=>(<div key={index} className={classes.headingWord}>{word} &nbsp;</div>))}
                    </div>
                </div>
            </div>
        </>
    )
}

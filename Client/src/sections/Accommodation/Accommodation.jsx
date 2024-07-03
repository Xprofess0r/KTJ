// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import classes from './Accommodation.module.css';
import { Link } from "react-router-dom";



const Accommodation = () => {

    const [width, setWidth] = useState(0);

    // const scrollup=()=>{
    //     window.scrollTo(0, 0);
    // }

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth);
            //   console.log("updating Widht"+newWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);

        return () => window.removeEventListener("resize", updateWindowDimensions)

    }, []);

    if (window.innerWidth > 1100) {
        return (
            <>
                <div className={classes.container}>

                    <div className={classes.heading}>
                        ACCOMMODATION AT KSHITIJ</div>
                    <Link to="/Accommodation/Register" className={classes.register}>REGISTER</Link>
                    <div className={classes.para}>KSHITIJ, IIT KHARAGPUR, HAS BEEN HOSTING PARTICIPANTS FROM ALL ACROSS INDIA SINCE ITS INCEPTION IN 2004. THE FEST HAS COME A LONG WAY SINCE THEN IN BOTH VOLUME OF PARTICIPANTS AND THE TECHNOLOGICAL DEPTH OF EVENT, HOSTING AS MANY AS 70,000 PARTICIPANTS IN OVER 37 EVENTS. BUT STILL, AS EVERY YEAR PASSES, WE HAVE FELT MORE EFFORTLESS AND EASIER TO ACCOMMODATE ALL THE PARTICIPANTS HERE, THANKS TO THE ENERGY WE GET BY SEEING SUCH A HUGE CROWD GATHERED ON THE CAMPUS OF IIT KHARAGPUR, WHICH IS THE OLDEST AND THE LARGEST OF ALL IITS.</div>
                    <div className={classes.footer}>
                        <li><Link to="/Accommodation/FAQ" className={classes.link}>FAQ</Link></li>
                        <li><Link to="/Accommodation/About" className={classes.link}>ABOUT</Link></li>
                        <li><Link to="/Accommodation/ContactUs" className={classes.link}>CONTACT US</Link></li>
                        <li><Link to="/Accommodation/Instructions" className={classes.link}>INSTRUCTIONS</Link></li>
                        <li><Link to="/Accommodation/MapKgp" className={classes.link}>MAP TO REACH IIT KGP</Link></li>
                        <li><Link to="/Accommodation/AccoGuide" className={classes.link}>ACCOMMODATION GUIDELINES</Link></li>
                    </div>

                </div>
            </>
        );
    }

    if (window.innerWidth <= 1100 && window.innerWidth > 580) {
        return (
            <div className={classes.container}>

                <div className={classes.heading}>
                    ACCOMMODATION AT KSHITIJ</div>
                <Link to="/Accommodation/Register" className={classes.register}>REGISTER</Link>
                <div className={classes.para}><p>KSHITIJ, IIT KHARAGPUR, HAS BEEN HOSTING PARTICIPANTS FROM ALL ACROSS INDIA SINCE ITS INCEPTION IN 2004. THE FEST HAS COME A LONG WAY SINCE THEN IN BOTH VOLUME OF PARTICIPANTS AND THE TECHNOLOGICAL DEPTH OF EVENT, HOSTING AS MANY AS 70,000 PARTICIPANTS IN OVER 37 EVENTS. BUT STILL, AS EVERY YEAR PASSES, WE HAVE FELT MORE EFFORTLESS AND EASIER TO ACCOMMODATE ALL THE PARTICIPANTS HERE, THANKS TO THE ENERGY WE GET BY SEEING SUCH A HUGE CROWD GATHERED ON THE CAMPUS OF IIT KHARAGPUR, WHICH IS THE OLDEST AND THE LARGEST OF ALL IITS.</p></div>
                <div className={classes.footer}>
                    <div className={classes.end}>
                        <li><Link to="/Accommodation/FAQ" className={classes.link}>FAQ</Link></li>
                        <li><Link to="/Accommodation/About" className={classes.link}>ABOUT</Link></li>
                        <li><Link to="/Accommodation/ContactUs" className={classes.link}>CONTACT US</Link></li>
                        <li><Link to="/Accommodation/Instructions" className={classes.link}>INSTRUCTIONS</Link></li>
                        <li><Link to="/Accommodation/MapKgp" className={classes.link}>MAP TO REACH IIT KGP</Link></li>
                        <li><Link to="/Accommodation/AccoGuide" className={classes.link}>ACCOMMODATION GUIDELINES</Link></li>
                    </div>
                </div>

            </div>
        );
    }
    if (window.innerWidth <= 580) {
        return (
            <div className={classes.container}>

                <div className={classes.heading}>
                    ACCOMMODATION AT KSHITIJ</div>
                    <Link to="/Accommodation/Register" className={classes.register}>REGISTER</Link>
                <div className={classes.para}><p>KSHITIJ, IIT KHARAGPUR, HAS BEEN HOSTING PARTICIPANTS FROM ALL ACROSS INDIA SINCE ITS INCEPTION IN 2004. THE FEST HAS COME A LONG WAY SINCE THEN IN BOTH VOLUME OF PARTICIPANTS AND THE TECHNOLOGICAL DEPTH OF EVENT, HOSTING AS MANY AS 70,000 PARTICIPANTS IN OVER 37 EVENTS. BUT STILL, AS EVERY YEAR PASSES, WE HAVE FELT MORE EFFORTLESS AND EASIER TO ACCOMMODATE ALL THE PARTICIPANTS HERE, THANKS TO THE ENERGY WE GET BY SEEING SUCH A HUGE CROWD GATHERED ON THE CAMPUS OF IIT KHARAGPUR, WHICH IS THE OLDEST AND THE LARGEST OF ALL IITS.</p></div>
                <div className={classes.footer}>
                    <div className={classes.end}>
                        <li><Link to="/Accommodation/FAQ" className={classes.link}>FAQ</Link></li>
                        <li><Link to="/Accommodation/About" className={classes.link}>ABOUT</Link></li>
                    </div>
                    <div className={classes.end}>
                        <li><Link to="/Accommodation/ContactUs" className={classes.link}>CONTACT US</Link></li>
                        <li><Link to="/Accommodation/Instructions" className={classes.link}>INSTRUCTIONS</Link></li>
                    </div>
                    <div className={classes.end}>
                        <li><Link to="/Accommodation/MapKgp" className={classes.link}>MAP TO REACH IIT KGP</Link></li>
                        <li><Link to="/Accommodation/AccoGuide" className={classes.link}>ACCOMMODATION GUIDELINES</Link></li>
                    </div>
                </div>
            </div>
        );
    }
}

export default Accommodation;
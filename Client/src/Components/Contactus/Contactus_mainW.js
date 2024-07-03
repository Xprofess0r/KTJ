import React from "react";
import classes from './contactus.module.css';
import Topnav from "./Topnav";
import Card from "./Card";

function ContactusmainW(props) {
	var activedata = props.data;
	// {console.log("Contactusmain", activedata, props)}
		return (
			// <div className={classes.navspace}>
				<div className={classes.Nscroll}>
				<div className={classes.spacer}></div>
				<Topnav active={props.active}/>
				<div className={classes.spacer}></div>
				<div className={classes.cardwrappperouter}>
					<div className={classes.cardwrappper}>
						{activedata.map((data, index) => (
							<Card key={index} data={data} />))}
					</div>
				</div>
				</div>
			// </div>s
		);
	}

export default ContactusmainW;

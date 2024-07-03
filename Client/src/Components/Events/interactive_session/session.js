import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Classes from "./interactiveSession.module.css";

import camera from "../img/interactiveSession/Cam.png";
import table from "../img/interactiveSession/Ta-ble.png";
import classes from "./interactiveSession.module.css";

class Session extends Component {
	constructor() {
		super();
		this.state = {
			eventTitle: "InteractiveSession1",
		};
	}

	gotoreg = () => {
		this.props.click("Clicked Register InteractiveSession 1");
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push("/signin");
		} else {
			this.props.registerUser(this.state.eventTitle);
		}
	};

	redirectToSignIn = () => {
		this.props.click("Clicked Register InteractiveSession 1");
		window.scroll({ left: 0, top: 0, behavior: "smooth" });
		window.location.href = "/#/signin";
	};

	renderRegister() {
		if (this.props.auth.isAuthenticated) {
			if (this.props.auth.user.events.indexOf(this.state.eventTitle) >= 0) {
				this.props.click("Clicked Already Registered InteractiveSession 1");
				return <text>{"Already Registered"}</text>;
			} else return <text onClick={this.gotoreg}>{" Register"}</text>;
		} else
			return <text onClick={() => this.redirectToSignIn()}>{" Register"}</text>;
	}

	render() {
		const {title,guests,meeting_link,sessionCount} = this.props;
		console.log(guests)
		return (
			<div>
				<div className={Classes.back}>
					<h1 className={Classes.heading_1}> </h1>
					<div className={Classes.box}>
						<h1 className={Classes.heading}>Interactive Session {sessionCount}</h1>
						<p className={Classes.summit_detail}>
							{title}
						</p>
						<div className={classes.content_box}>
							{guests.map((guest,index)=>{
								return(<div >
									<img src={this.props.image[index]} className={classes.img} />
									<div className={classes.discription}>
										<b>{guest.name}</b>
										<br />
										{guest.profession}
									</div>
								</div>)
							})}
						</div>
						<div className={classes.ButtonTray}>
							<div className={classes.REGISTER}>{this.renderRegister()}</div>
							<div className={classes.REGISTER}>
								<a
									style={{ textDecoration: "none" }}
									target="_blank"
									href={meeting_link}
									onClick={() => this.props.click("joing interactiveSession 1")}
								>
									Join Here
								</a>
							</div>
						</div>
					</div>
					<div className={Classes.table_pos}>
						<img src={table} alt="TABLE" className={Classes.table} />
					</div>
					<div className={Classes.camera_pos}>
						<img src={camera} alt="CAMERA" className={Classes.camera} />
					</div>
				</div>
			</div>
		);
	}
}

Session.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, {})(withRouter(Session));

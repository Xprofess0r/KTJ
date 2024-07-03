import React, { Component } from "react";
import Navbar from "../../NavBarCopy/Navbar";

import API from "../../../api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { registerISession } from "../../../actions/eventActions";
import ReactGa from "react-ga";
//session import
import Session from "./session";
//image import
import RonyDasgupta from "../img/interactiveSession/rony-dasgupta-4.jpg";
import SagarThakur from "../img/interactiveSession/sagar thakur.jpg";
import SatishRoy from "../img/interactiveSession/satish ray.png";
import AshwinyIyerTiwari from "../img/interactiveSession/ashwini iyer tripathi.png";
import NiteshTiwari from "../img/interactiveSession/nitesh tiwari.png";
import DipaKarmakar from "../img/interactiveSession/037 - Dipa Karmakar.jpg";
import ShreyasTalpade from "../img/interactiveSession/shreyas-talpade.jpg";
import SlayyPoint from "../img/interactiveSession/slayy point-8.png";
import AnupSoni from "../img/interactiveSession/anup soni-8.png";
import AshwiniNachappa from "../img/interactiveSession/ashwini nachappa-8.png";
import { parseQueryString } from "../../../Utils/utils";
import axios from "../../../api";
class InteractiveSession extends Component {
	state = {
		sessions:[]
	};

	registerUser = (Roundtable) => {
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push("/signin");
		} else {
			const membersList = [this.props.auth.user.ktjID];
			const userData = {
				ktjID: this.props.auth.user.ktjID,
				members: membersList,
				title: Roundtable,
			};
			this.props.registerISession(userData, this.props.history);
		}
	};
	Clicked = (user_action) => {
		ReactGa.event({
			category: "Click",
			action: user_action,
		});
	};

	componentDidMount () {
		let query =  parseQueryString(this.props.location.search);
		let eventCategory = query.get('category');
		
		console.log(eventCategory);
			 axios.get(`/events/?category=${eventCategory}`).then((res)=>{
				 
				this.setState({sessions:res.data.events})
			}).catch(error=>{
				console.log('error',error);
			})
			
	}
	render() {
		const {sessions} = this.state;
		console.log(sessions,'sessions');
		return (
			<div style={{ backgroundColor: "#1e1762" }}>
				<Navbar Bgcolor={true} />
				{sessions.map((session,index)=>{
					return(<Session
						{...session}
						sessionCount = {index+1}
						registerUser={this.registerUser}
						image={[RonyDasgupta,SagarThakur,SatishRoy]}
						error={this.state.errorgen}
						click={this.Clicked}
					/>)
				})}
			</div>
		);
	}
}

InteractiveSession.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerISession })(
	withRouter(InteractiveSession)
);

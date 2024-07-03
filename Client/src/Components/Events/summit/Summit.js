import React, { Component } from "react";
import Navbar from "../../NavBarCopy/Navbar";
//import summit page
import Summit_page from "./Summit_page";
//import image
import PrithBanerjee from "../img/summit/PrithBanerjee.jpg";
import ArpanPal from "../img/summit/ArpanPal.jpg";
import ShobhanaLele from "../img/summit/Shobhana lele.jpg";
import PhalgunKompalli from "../img/summit/Phalgun Kompalli.png";
import axios from "../../../api";
import {withRouter} from 'react-router-dom';
import { parseQueryString } from "../../../Utils/utils";
import Spinner from "../Spinner.js/Spinner";

class Summit extends Component {
	state = {

		isLoading:true,
		image_1: [ArpanPal, PrithBanerjee, PhalgunKompalli, ShobhanaLele],
	};
	componentDidMount () {
		let query =  parseQueryString(this.props.location.search);
		let eventCategory = query.get('category');
		
		console.log(eventCategory);
			 axios.get(`/events/?category=${eventCategory}`).then((res)=>{
				this.setState({events:res.data.events,isLoading:false})
			}).catch(error=>{
				this.setState({isLoading:false})
				console.log('error',error);
			})
			
	}
	render() {
		const {isLoading,events} = this.state;
		return (
			isLoading?<Spinner/>:<div style={{ backgroundColor: "#1e1762" }}>
			<Navbar Bgcolor={true} />
			{events?.length?events.map((event)=>{
				return (<Summit_page
					heading={event.title}
					image={this.state.image_1}
					guests={event.guests}
					guestProfilePhotos = {event.guestProfilePhotos}
					meeting_link={event.meeting_link}
				/>)
			}):<div>No Ongoing or upcoming  Event </div>}
			
		
		</div>
		);
	}
}

export default withRouter(Summit);

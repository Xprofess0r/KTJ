import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Events from "./events";
import competitions from "./competition/competitions";
import InteractiveSession from "./interactive_session/interactiveSession";
import GameFest from "./gamefest/Gamefest";
import Summit from "./summit/Summit";
import Single_competition from "./event_page/single_competition";
class eventmain extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/events" component={Events} />
					<Route
						path="/events/interactiveSession"
						component={InteractiveSession}
					/>
                    <Route
						path="/events/gamefest"
						component={GameFest}
					/>
					<Route path="/events/summit" component={Summit} />
					<Route exact path="/events/competitions" component={competitions} />
					<Route  path="/events/competitions/:competitionId" component={Single_competition} />
					
				</Switch>
			</div>
		);
	}
}

export default eventmain;

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import API from "./../../../../api";
import ReactGa from "react-ga";
// CSS Imports
import "./index.css";
import List from "./List.js";

// Component/Function Imports
import { deRegisterEvent } from "../../../../actions/eventActions";
import { logoutUser } from "../../../../actions/authActions";

class Details extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
      members: [],
      teamID: "",
      teamCaptainID: "",
    };
  }

  componentDidMount() {
    var eventName = this.props.eventTitle;
    var place = 0;
    for (var j = 0; j < this.props.auth.user.events.length; j++) {
      if (this.props.auth.user.events[j].match(eventName)) {
        place = j;
      }
    }
    const teamID = this.props.auth.user.teams[place];
    const payload = {
      ktjID: this.props.auth.user.ktjID,
      teamID: teamID,
    };

    API.post("/team/teamDetails", payload)
      .then((res) => {
        this.setState({
          members: res.data.payLoad.members,
          teamID: res.data.payLoad.teamID,
          teamCaptainID: res.data.payLoad.teamCaptainID,
        });
      })
      .catch((err) => {
        if (err.response.data.name == "JsonWebTokenError") {
          this.props.logoutUser(payload, this.props.history.push("/signin"));
        } else if (err.response.data.name == "TokenExpiredError") {
          this.props.logoutUser(payload, this.props.history.push("/signin"));
        } else console.log(err);
      });
  }

  deRegisterTeam = () => {
    //google analytics
    ReactGa.event({
      category: "Click",
      action: "Clicked DeRegister of" + this.props.eventTitle,
    });
    //
    const teamData = {
      teamID: this.state.teamID,
      ktjID: this.state.teamCaptainID,
    };
    this.props.deRegisterEvent(
      teamData,
      this.props.history,
      this.props.eventTitle
    );
  };

  render() {
    return (
      <div id="teamDetails">
        <h1>Team Details</h1>
        <br />
        <h2>
          You have already registered for {this.props.eventTitle}. Your team
          details are:{" "}
        </h2>
        <br />
        <br />
        <h2>Team KTJID - {this.state.teamID} </h2>
        <List teamID={this.state.teamID} membersList={this.state.members} />
        <br />
        {this.state.teamCaptainID == this.props.auth.user.ktjID ? (
          <button className="deRegisterButton" onClick={this.deRegisterTeam}>
            Deregister
          </button>
        ) : (
          <h2>CONTACT YOUR TEAM CAPTAIN TO DEREGISTER THE TEAM</h2>
        )}
      </div>
    );
  }
}

Details.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { deRegisterEvent, logoutUser })(
  withRouter(Details)
);

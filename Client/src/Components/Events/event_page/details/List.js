import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./List.css";

class Input extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {}

  render() {
    return this.props.membersList.map((val, index, arr) => (
      <div className="lbox">
        <li key={index}>
          <label className="ktjIDLabel" style={{ fontSize: "18px" }}>
            Participant-{index + 1} KTJID:{" "}
          </label>
          <input
            type="text"
            name="ktjIDField"
            className="ktjIDField"
            value={this.props.membersList[index]}
            style={{ borderBottom: "none" }}
            disabled
          />
        </li>
      </div>
    ));
  }
}

Input.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(withRouter(Input));

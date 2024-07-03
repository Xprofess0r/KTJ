import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./Input.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

class Input extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
      alert: { show: false, msg: "", type: "" },
    };
  }
  setAlert(newAlert) {
    alert: newAlert;
  }
  //
  // Getting errors from backend and updating when new errors arrive
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.teamList !== prevState.teamList) {
      return { teamList: nextProps.teamList };
    } else if (nextProps.error !== prevState.error) {
      return { error: nextProps.error };
    } else return null;
  }
  render() {
    return (
      <div className={classes.uldiv}>
        <li key={0}>
          <div className={classes.box}>
            <label className={classes.ktjIDLabel}>Team Captain: </label>
            <input
              type="text"
              name="ktjIDField"
              className={classes.ktjIDField}
              placeholder="KTJ-ID:"
              value={this.props.teamList[0].eventKTJID}
              disabled
            />
            <input
              type="text"
              name="namefield"
              className={classes.ktjIDField}
              placeholder="Name"
              value={this.props.teamList[0].Name}
              disabled
            />
          </div>
        </li>
        {this.props.teamList.map((val, index, arr) =>
          index != 0 ? (
            <li key={index}>
              <form className={classes.box}>
                {index === 0 ? (
                  <label className={classes.ktjIDLabel}>Captain's KTJ-ID</label>
                ) : (
                  <label className={classes.ktjIDLabel}>
                    Team Member {index + 1}:
                  </label>
                )}
                {index == 0 ? (
                  <input
                    type="text"
                    name="ktjIDField"
                    className={classes.ktjIDField}
                    placeholder="Team's Captain Id:"
                    value={val.eventKTJID}
                    disabled
                  />
                ) : (
                  <input
                    type="text"
                    name="ktjIDField"
                    placeholder="KTJ-ID"
                    id={`eventKTJID${index}`}
                    value={val.eventKTJID}
                    className={classes.ktjIDField}
                    disabled={val.verified}
                    required
                  />
                )}

                {index != 0 && !this.props.teamList[index].verified ? (
                  <div className={classes.verifyButtonOuter}>
                    <div className={classes.verifyButton}>
                      <button
                        type="submit"
                        className={classes.verifyButtonInner}
                        onClick={(e) => {
                          e.preventDefault();
                          this.props.findMember(val.eventKTJID, index);
                        }}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    name="namefield"
                    className={classes.ktjIDField}
                    placeholder="Name"
                    value={val.Name}
                    disabled
                  />
                )}

                {this.props.editing &&
                !index == 0 &&
                // (this.props.teamList.filter((team) => {
                //   return team.verified;
                // }).length > this.props.minCount ||
                //   (!this.props.teamList[index].verified &&
                //     index + 1 > this.props.minCount)) &&
                this.props.isCaptain ? (
                  <div
                    className={classes.deleteButton}
                    onClick={() => this.props.deleteMember(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                ) : null}
              </form>

              {/* {index < this.props.maxCount - 1 && index + 1 == arr.length ? ( */}

              {/* ) : null} */}
            </li>
          ) : null
        )}
        {this.props.editing &&
        this.props.teamList.length < this.props.maxCount &&
        this.props.isCaptain ? (
          <button
            className={classes.addMember}
            onClick={() => this.props.addMember()}
            type="button"
          >
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: "60%" }} />
            &nbsp;Add a Teammate
          </button>
        ) : null}
      </div>
    );
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

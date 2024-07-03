import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Vdo from "../../Components/vdoplayer/Vdo";
// import bgvdo from "./Video/Profile.mp4";
// import Navigation from "../Navbar/Navbar";
import NavBar from "../Navbar/Navbar";
import Table from "./Table";
import PageWrapper from "../PageWrapper/PageWrapper";
class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
      redirectToSignIn: this.redirectToSignIn.bind(this),
    };
  }

  redirectToSignIn = () => {
    this.props.history.push("/signin");
  };

  // Getting errors from backend and updating when new errors arrive
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.auth.isAuthenticated) {
      return {
        model: prevState.redirectToSignIn(nextProps.model),
      };
    }
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }
  render() {
    return (
      <PageWrapper>
        <Table />
      </PageWrapper>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(withRouter(Profile));

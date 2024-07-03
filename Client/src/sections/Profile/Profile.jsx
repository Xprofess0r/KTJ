import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
      redirectToSignIn: this.redirectToSignIn.bind(this),
    };
  }

  redirectToSignIn = () => {
    const navigate = useNavigate();
    navigate("/signin");
  };

  // Getting errors from backend and updating when new errors arrive
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (!nextProps.auth.isAuthenticated) {
  //     const { history } = nextProps;
  //     history.push("/signin");
  //   }
  //   if (nextProps.errors !== prevState.errors) {
  //     return { errors: nextProps.errors };
  //   } else return null;
  // }

  render() {
    return <Table />;
  }
}

// Profile.propTypes = {
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired, // Make sure history is passed as a prop
// };

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(Profile);

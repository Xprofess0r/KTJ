import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./Navbar.module.css";
import { logoutUser } from "../../actions/authActions";
import ReactGa from "react-ga";
import axios from "../../api";
import { message } from "antd";
class Navbar extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
      data: [],
    };
  }

  componentDidMount() {
    this.fetchNavigationData();
  }
  fetchNavigationData = () => {
    axios
      .get("/navbar/")
      .then((result) => {
        // console.log(result);
        this.setState({ data: result.data.navbar });
      })
      .catch((error) => {
        message.error(error.response.data?.message);
      });
  };
  render() {
    let SideDrawerBtnClass = [classes.SideDrawerBtn, classes.Hide];

    if (!this.props.showSideDrawer) {
      SideDrawerBtnClass = [classes.SideDrawerBtn, classes.Show];
    }
    const { isAuthenticated, userInfo } = this.props.auth;

    const logoutUser = (e) => {
      e.preventDefault();
      this.props.logoutUser(userInfo, this.props.history.push("/signin"));
    };

    return (
      <div
        className={classes.Navbar}
        style={{
          backgroundImage: this.props.Bgcolor
            ? `linear-gradient(
        to right,
        #150f5d8f 15%,
    #2a236a8f 20%,
    #2a236a8f 75%,
    #150f5d8f 80%
      )`
            : null,
        }}
        onClick={(event) => {
          ReactGa.event({
            category: "Click",
            action:
              "Clicked the header " +
              (event.target.innerText ? event.target.innerText : ""),
          });
        }}
      >
        <div
          className={SideDrawerBtnClass.join(" ")}
          onClick={this.props.toggleSideDrawer}
        >
          <i className="fa fa-bars"></i>
        </div>
        <NavLink
          onClick={() => {
            window.scroll({ left: 0, top: 0, behavior: "smooth" });
          }}
          to="/"
          style={{ color: " #c4b9e2", textDecoration: "none" }}
        >
          {/* <img src={ktjlogo} height="120" width="180" alt="Kshitij" /> */}
        </NavLink>

        <ul
          className={classes.NavbarList}
          style={this.props.styles ? { ...this.props.styles } : null}
        >
          {this.props.auth?.user.userType == "superAdmin" ||
            this.props.auth?.user.userType == "admin" ? (
            <li>
              <NavLink
                activeClassName={classes.active}
                onClick={() => {
                  window.scroll({ left: 0, top: 0, behavior: "smooth" });
                }}
                to="/admin-panelktj2022"
                style={{ color: " #c4b9e2", textDecoration: "none" }}
                exact
              >
                Admin-Panel
              </NavLink>
            </li>
          ) : null}
          {this.state.data.slice(1).map((navbar) => {
            if (
              navbar.visiblity &&
              (this.props.auth?.user.userType == "superAdmin" ||
                this.props.auth.user.userType == "admin" ||
                !navbar.isAuthenticated)
            )
              return (
                <li>
                  <NavLink
                    activeClassName={classes.active}
                    onClick={() => {
                      window.scroll({ left: 0, top: 0, behavior: "smooth" });
                    }}
                    to={navbar.Status == "Working" ? navbar.navLink : "/coming"}
                    style={{ color: " #c4b9e2", textDecoration: "none" }}
                    exact
                  >
                    {navbar.navName}
                  </NavLink>
                </li>
              );
          })}

          <div>
            {!isAuthenticated ? (
              <li>
                <NavLink
                  activeClassName={classes.active}
                  onClick={() => {
                    window.scroll({ left: 0, top: 0, behavior: "smooth" });
                  }}
                  to="/signin"
                  style={{ color: " #c4b9e2", textDecoration: "none" }}
                  exact
                >
                  <button className={classes.SignInBtn}>Sign In</button>
                </NavLink>
              </li>
            ) : null}
            {!isAuthenticated ? (
              <li>
                <NavLink
                  activeClassName={classes.active}
                  onClick={() => {
                    window.scroll({ left: 0, top: 0, behavior: "smooth" });
                  }}
                  to="/signup"
                  style={{ color: " #c4b9e2", textDecoration: "none" }}
                  exact
                >
                  <button className={classes.SignUpBtn}>Sign Up</button>
                </NavLink>
              </li>
            ) : null}
            {isAuthenticated ? (
              <li>
                <NavLink
                  activeClassName={classes.active}
                  onClick={() => {
                    window.scroll({ left: 0, top: 0, behavior: "smooth" });
                  }}
                  to="/profile"
                  style={{ color: " #c4b9e2", textDecoration: "none" }}
                  exact
                >
                  <button className={classes.ProfileBtn}>Profile</button>
                </NavLink>
              </li>
            ) : null}
            {isAuthenticated ? (
              <li>
                <NavLink
                  activeClassName={classes.active}
                  onClick={logoutUser}
                  to="signin"
                  style={{ color: " #c4b9e2", textDecoration: "none" }}
                  exact
                >
                  <button>Logout</button>
                </NavLink>
              </li>
            ) : null}
          </div>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));

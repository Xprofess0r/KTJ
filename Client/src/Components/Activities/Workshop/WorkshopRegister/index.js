import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import API from "./../../../../api";
import ReactGa from "react-ga";
import BackBtn from "../../../BackButton/button";
import store from "../../../../store";


// CSS Imports
import classes from "./index.module.css";

// Component/Function Imports
import {
  findUser,
  registerEvent,
  setCurrentUser,
  logoutUser,
  editTeam,
  deleteTeam,
} from "../../../../actions/eventActions";
import { updateUserInfo } from "../../../../actions/authActions";
// import Input from "./Input";
import Loader from "../../../Loader";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      loading: true,
      regError: "",
      message: "",
      errors: {
        regError: null,
      },
      err: false,
      registerDone: false,
    };
  }

  // Getting errors from backend and updating when new errors arrive
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.errors !== prevState.errors) {
  //     return { errors: nextProps.errors };
  //   } else return null;
  // }

  // handleChange = (e) => {
  //   if (["ktjIDField"].includes(e.target.name)) {
  //     let teamList = [...this.state.teamList];
  //     teamList[e.target.id.slice(-1)].eventKTJID = e.target.value.trim();
  //     this.setState({ teamList: teamList });
  //   } else {
  //     this.setState({ [e.target.name]: e.target.value });
  //   }
  // };

  // fetchTeamDetails = () => {
  //   const user = this.props.auth.user;
  //   const eventId = this.state.eventId;
  //   let index = user.competitions.findIndex((comp) => {
  //     return comp._id === eventId;
  //   });
  //   let teamId = user.teams[index];
  //   this.setState({ teamId: teamId });
  //   let data = { eventId: this.state.eventId, teamId: teamId };
  //   this.setState({ loading: true });
  //   return API.post("/team/eventTeamDetails", data).then((res) => {
  //     const { team } = res.data;
  //     let teamList = res.data.team.members.map((member) => {
  //       return {
  //         verified: true,
  //         error: false,
  //         Name: member.username,
  //         eventKTJID: member.ktjID,
  //         _id: member._id,
  //       };
  //     });
  //     let isCaptain = team.captain === this.props.auth.user.ktjID;
  //     let newError = this.state.errors;
  //     newError.regError = null;
  //     this.setState({
  //       teamList: teamList,
  //       isCaptain,
  //       isRegistered: true,
  //       teamktjID: team.ktjID,
  //       errors: newError,
  //       loading: false,
  //       editing: false,
  //     });
  //   });
  // };

  // // if the user is removed from some team,or some team is deleted then after new user data update we need to fetch details again
  // // or user is added to some new team then we need to fetch that team
  // // info if user gets 422 while registering again for same event
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps?.auth?.user !== this.props?.auth?.user) {
  //     this.fetchTeamDetails();
  //   }
  // }
  // getEvent = (id) => {
  //   this.setState({ loading: true });

  //   API.get(`/competitions/${id}`)
  //     .then((res) => {
  //       this.setState({ event: res.data.competition[0] });
  //       let teamList = [...this.state.teamList];
  //       this.setState({
  //         ...this.state,
  //         maxCount: this.state.event.max,
  //         minCount: this.state.event.min,
  //         eventId: this.state.event._id,
  //       });
  //       for (let i = 0; i < this.state.minCount - 1; i++) {
  //         teamList.push({
  //           eventKTJID: "",
  //           Name: "",
  //           verified: false,
  //           error: false,
  //           _id: null,
  //         });
  //       }
  //       let newError = this.state.errors;
  //       newError.regError = null;
  //       this.setState({
  //         teamList: teamList,
  //         errors: newError,
  //       });
  //       let eventId = this.state.eventId;
  //       let user = this.props.auth.user;

  //       let isRegistered = user.competitions
  //         .map((comp) => comp._id)
  //         .includes(eventId);

  //       this.setState({ isRegistered: isRegistered, loading: false });

  //       if (isRegistered) {
  //         return this.fetchTeamDetails();
  //       } else if (this.state.minCount === 1 && this.state.maxCount === 1) {
  //         this.registerTeam();
  //       }
  //     })
  //     .catch((err) => {
  //       if (err?.response?.status === 404) {
  //         // this.setState({ isRegistered: false, teamId: null });
  //         // this.props.logoutUser();
  //         // this.props.history.push("/signin");
  //         this.props.updateUserInfo(this.props.auth.user._id).then((res) => {
  //           this.resetTeamList();
  //         });
  //       } else if (err?.response?.status === 422) {
  //         // team is there but user is not part of it anymore
  //         // this.setState({ isRegistered: false, teamId: null });
  //         // this.props.logoutUser();
  //         // this.props.history.push("/signin");
  //         this.props.updateUserInfo(this.props.auth.user._id).then((res) => {
  //           this.resetTeamList();
  //         });
  //       } else this.props.history.goBack();
  //     });
  // };

  // addMember = (e) => {
  //   //google analytics
  //   if (this.state.teamList.length == this.state.maxCount) {
  //     return;
  //   }
  //   ReactGa.event({
  //     category: "Click",
  //     action: "Clicked add teammate button of " + this.props.eventTitle,
  //   });
  //   //
  //   this.setState((prevState) => ({
  //     teamList: [
  //       ...prevState.teamList,
  //       {
  //         eventKTJID: "",
  //         Name: "",
  //         verified: false,
  //         error: false,
  //         _id: null,
  //       },
  //     ],
  //   }));
  // };

  // deleteMember = (index) => {
  //   //google analytics
  //   ReactGa.event({
  //     category: "Click",
  //     action: "Clicked delete teammate button of " + this.props.eventTitle,
  //   });
  //   //
  //   var newList = [...this.state.teamList];
  //   // if (this.state.isRegistered && newList[index].verified)
  //   //   this.deleteMemberFromteam(newList[index].eventKTJID);
  //   // else {
  //   newList = newList.filter((val, ind) => {
  //     return ind !== index;
  //   });

  //   if (newList.length < this.state.minCount)
  //     newList.push({
  //       eventKTJID: "",
  //       Name: "",
  //       verified: false,
  //       error: false,
  //       _id: null,
  //     });

  //   this.setState({
  //     teamList: newList,
  //   });
  //   // }
  // };

  // findMember = (value, index) => {
  //   //google analytics
  //   ReactGa.event({
  //     category: "Click",
  //     action: "Clicked Verify teammate button of " + this.props.eventTitle,
  //   });
  //   //
  //   const eventKTJID = value.trim();

  //   var flag = 0;
  //   this.state.teamList.forEach((member, indx, arr) => {
  //     if (indx != index && member.eventKTJID == eventKTJID) {
  //       var newErr = this.state.errors;
  //       newErr.regError = "This member is already in the team";
  //       this.setState({
  //         errors: newErr,
  //       });

  //       flag = 1;
  //       return;
  //     }
  //   });

  //   if (!flag) {
  //     const data = { eventKTJID: eventKTJID };

  //     // API.get("/team/addMember", eventKTJID)
  //     API.get("/findUser?ktjid=" + eventKTJID)
  //       .then((res) => {
  //         var username = res.data.payLoad.username;
  //         // document.getElementById(`name${index}`).value = username;
  //         var newList = [...this.state.teamList];
  //         newList[index].Name = username;
  //         newList[index].verified = true;
  //         newList[index].error = false;
  //         newList[index]._id = res.data.payLoad._id;
  //         let newError = this.state.errors;
  //         newError.regError = null;
  //         this.setState({
  //           teamList: newList,
  //           errors: newError,
  //         });
  //       })
  //       .catch((err) => {
  //         if (err.response.status == 404) {
  //           var newErr = this.state.errors;
  //           newErr.regError = "User not Found";
  //           this.setState({
  //             errors: newErr,
  //           });
  //         } else if (err.response.data.name == "JsonWebTokenError") {
  //           this.props.logoutUser(payload, this.props.history.push("/signin"));
  //         } else if (err.response.data.name == "TokenExpiredError") {
  //           this.props.logoutUser(payload, this.props.history.push("/signin"));
  //         } else {
  //           var newList = this.state.teamList;
  //           newList[index].error = err;
  //           this.setState({
  //             teamList: newList,
  //           });
  //         }
  //       });
  //   }
  // };

  // registerTeam = (e) => {
  //   if (e) e.preventDefault();
  //   var isVerified = this.state.teamList.length > 0 ? true : false;
  //   this.state.teamList.forEach((member) => {
  //     if (member.verified == false) {
  //       isVerified = false;
  //     }
  //   });
  //   if (isVerified == true) {
  //     var membersList = this.state.teamList.map((value) => {
  //       return value._id;
  //     });
  //     if (membersList.length == 0) {
  //       isVerified = false;
  //     }
  //     membersList[0] = this.props.auth.user._id;
  //     const userData = {
  //       ktjID: this.state.teamList[0].eventKTJID,
  //       members: membersList,
  //       title: this.state.event.title,
  //       eventId: this.state.eventId,
  //       ktjID: this.props.auth.user.ktjID,
  //       userId: this.props.auth.user._id,
  //     };
  //     if (this.state.isRegistered) {
  //       userData.teamId = this.state.teamId;
  //       this.setState({ loading: true });
  //       this.props
  //         .editTeam(userData, this.props.history)
  //         .then((res) => {
  //           let newError = this.state.errors;
  //           newError.regError = null;
  //           this.setState({
  //             registerDone: true,
  //             editDone: true,
  //             errors: newError,
  //             loading: false,
  //           });
  //         })
  //         .catch((err) => {
  //           var newErr = this.state.errors;
  //           newErr.regError = err?.response?.data?.message;
  //           this.setState({
  //             loading: false,
  //             errors: newErr,
  //           });
  //         });
  //     } else {
  //       this.setState({ loading: true });

  //       this.props
  //         .registerEvent(userData, this.props.history)
  //         .then((res) => {
  //           let teamktjID = res.data.team.ktjID;
  //           let newError = this.state.errors;
  //           newError.regError = null;
  //           return this.setState({
  //             registerDone: true,
  //             teamktjID: teamktjID,
  //             errors: newError,
  //             loading: false,
  //           });
  //         })
  //         .catch((err) => {
  //           if (err?.reset) {
  //             this.fetchTeamDetails();
  //           }
  //           var newErr = this.state.errors;
  //           newErr.regError = err?.response?.data?.message;
  //           this.setState({
  //             loading: false,
  //             errors: newErr,
  //           });
  //         });
  //     }
  //   } else {
  //     var newErr = this.state.errors;
  //     newErr.regError = "Verify all members to proceed";
  //     this.setState({
  //       errors: newErr,
  //     });
  //   }
  // };
  // deleteTeamHandler = (e) => {
  //   e.preventDefault();
  //   const { teamId, eventId } = this.state;
  //   let user = this.props.auth.user;
  //   this.setState({ loading: true });

  //   this.props
  //     .deleteTeam({ teamId, eventId }, this.props.history)
  //     .then((res) => {
  //       let newError = this.state.errors;
  //       newError.regError = null;
  //       this.setState({
  //         loading: false,
  //         teamktjID: null,
  //         errors: newError,
  //       });
  //       this.resetTeamList();
  //     })
  //     .catch((err) => {
  //       var newErr = this.state.errors;
  //       newErr.regError = err?.response?.data?.message;
  //       this.setState({
  //         loading: false,
  //         errors: newErr,
  //       });
  //     });
  // };


  // componentWillUnmount() {
  //   this.setState({ errors: null });
  // }

  // resetTeamList = () => {
  //   const user = this.props.auth.user;
  //   let teamList = [
  //     {
  //       eventKTJID: user.ktjID,
  //       Name: user.username,
  //       verified: true,
  //       error: false,
  //       _id: user._id,
  //     },
  //   ];
  //   for (let i = 0; i < this.state.minCount - 1; i++) {
  //     teamList.push({
  //       eventKTJID: "",
  //       Name: "",
  //       verified: false,
  //       error: false,
  //       _id: null,
  //     });
  //   }
  //   let newError = this.state.errors;
  //   newError.regError = null;
  //   this.setState({
  //     isRegistered: false,
  //     teamId: null,
  //     teamList,
  //     loading: false,
  //     errors: newError,
  //   });
  // };

  handleRegister = (title, ktjID) => {
    console.log("In handle register");
    API.post('/workshops/userwsReg', { title, ktjID })
      .then(res => {
        console.log(res.status)
        this.setState({
          isRegistered: true,
          loading: false,
          message: res.data
        })
        store.dispatch(updateUserInfo(this.props.auth.user._id));
      })
      .catch(err => {
        console.log("This is error")
        console.log(err)
        this.setState({
          isRegistered: false,
          loading: false,
          err: true,
          message: "Oops! Something went wrong. Please try again."
        })
      });
  }
  componentDidMount() {
    let title = this.props.match.params.id;
    this.handleRegister(title, this.props.auth.user.ktjID);
    // this.getEvent(eventUrl);
  }
  render() {
    var {
      isRegistered,
      message,
      loading,
      err
    } = this.state;
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className={classes.eventregistration}>
        Hii this is some text from my side
        {/* {!registerDone ? (
          <div className={classes.regForm}>
            {loading ? (
              <Loader />
            ) : (
              <>
                Oops! Something went wrong.
              </>
            )}
          </div>
        ) : (
          <div className={classes.RegDone}>
            <h1 className={classes.RegDoneh1}>{this.state.event.title}</h1>
            {registerDone && (
              <>
                <p className={classes.RegDoneP}>
                  You have successfully registered.
                </p>
                <div className={`${classes.joinLinkButton} ${classes.RegDoneP}`}>Join Now</div>
              </>
            )}
          </div>
        )} */}
        <div className={classes.regForm}>
          {loading ? (<Loader />) : (
            <>
              {!err && <p className={classes.RegDoneP}>{message}</p>}
              {err && <p className={classes.RegDoneP} style={{ color: 'red' }}>{message}</p>}
              {/* <div className={`${classes.joinLinkButton} ${classes.RegDoneP}`}>Join Now</div> */}
            </>)}
        </div>
        <BackBtn position="right-bottom" />
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  findUser,
  registerEvent,
  setCurrentUser,
  logoutUser,
  deleteTeam,
  updateUserInfo,
  editTeam,
})(withRouter(Register));

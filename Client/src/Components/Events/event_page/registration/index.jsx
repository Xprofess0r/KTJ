import { useEffect, useState } from "react";
import { message } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from './index.module.css'
import API from "../../../../api";
import ReactGa from "react-ga";
import BackBtn from "../../../BackButton/button";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  findUser,
  registerEvent,
  setCurrentUser,
  logoutUser,
  editTeam,
  deleteTeam,
} from "../../../../actions/eventActions";
import { updateUserInfo } from "../../../../actions/authActions";
import Input from "./Input";
import Loader from "../../../Loader";

// eslint-disable-next-line react-refresh/only-export-components
const Register = (props) => {
  const navigate=useNavigate();
  const { id } = useParams();
  const [state, setState] = useState({
    isRegistered: false,
    eventId: null,
    loading: true,
    teamId: null,
    teamktjID: null,
    isCaptain: true,
    regError: "",
    errors: {
      regError: null,
    },
    teamList: [
      {
        eventKTJID: props.auth.user.ktjID,
        Name: props.auth.user.username,
        verified: true,
        error: false,
        _id: props.auth.user._id,
      },
    ],
    minCount: 1,
    maxCount: 4,
    event: {},
    registerDone: false,
    editDone: false,
    editing: true,
    category: "8",
  });
  const [event,setEvent]=useState({});

  useEffect(() => {
    // console.log('state ',state);
    // componentDidMount logic
    // console.log("we are at useeffect ", id)
    getEvent(id);
    // eslint-disable-next-line react/prop-types
    props.updateUserInfo(props.auth.user._id);
    // console.log("useffstate ",state);

    // componentWillUnmount logic (cleanup)
    return () => {
      // Reset errors when component unmounts
      // Note: You might want to check if 'this.setState' is applicable here.
      // If 'errors' is managed by a state hook, update it accordingly.
      // Example: setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, props.auth.user._id]); // Dependency array ensures this effect runs on mount and when id or user ID changes
  // useEffect(() => {
  //   const eventUrl = props.match.params.id;
  //   getEvent(eventUrl);
  //   // Get the updated user info in any case if 
  //   // the user is removed or added to a new team for the same event, then 
  //   // we can show the team list or show the form 
  //   props.updateUserInfo(props.auth.user._id);
  // }, []);  // The empty dependency array ensures this runs only on mount

  // const getDerivedStateFromProps = (nextProps, prevState) => {
  //   if (nextProps.errors !== prevState.errors) {
  //     return { errors: nextProps.errors };
  //   } else return null;
  // };

  const handleChange = (e) => {
    if (["ktjIDField"].includes(e.target.name)) {
      let teamList = [...state.teamList];
      teamList[e.target.id.slice(-1)].eventKTJID = e.target.value.trim();
      setState({ ...state, teamList });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setState((prevState) => ({ ...prevState, category: val }));
  };


  const fetchTeamDetails = async () => {
    try {
      const user = props.auth.user;
      // console.log('state ',state);
      const eventId = id;
      let index = user.competitions.findIndex((comp) => comp._id === eventId);
      let teamId = user.teams[index];

      setState((prevState) => ({ ...prevState, teamId, loading: true }));

      let data = { eventId: eventId, teamId: teamId };
      const res = await API.post("/team/eventTeamDetails", data);
      const { team } = res.data;
      // console.log(team.category);

      setState((prevState) => ({
        ...prevState,
        category: team.category,
        teamList: team.members.map((member) => ({
          verified: true,
          error: false,
          Name: member.username,
          eventKTJID: member.ktjID,
          _id: member._id,
        })),
        isCaptain: team.captain === props.auth.user.ktjID,
        isRegistered: true,
        teamktjID: team.ktjID,
        errors: { regError: null },
        loading: false,
        editing: false,
      }));
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        isRegistered: false,
        loading: false,
      }));
    }
  };

  // if the user is removed from some team,or some team is deleted then after new user data update we need to fetch details again
  // or user is added to some new team then we need to fetch that team
  // info if user gets 422 while registering again for same event
  const getEvent = async (id) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    // console.log('geteven id ',id);

    try {
      const res = await API.get(`/competitions/${id}`);
      const event = res.data.competition[0];
      setEvent(event);
      // console.log("we are at", res.data.competition[0].registration)
      setState((prevState) => ({
        ...prevState,
        event,
        maxCount: event.max,
        minCount: event.min,
        eventId: event._id,
      }));

      let teamList = [...state.teamList];
      // console.log(state.event.registration);

      for (let i = 0; i < state.minCount - 1; i++) {
        teamList.push({
          eventKTJID: "",
          Name: "",
          verified: false,
          error: false,
          _id: null,
        });
      }

      setState((prevState) => ({
        ...prevState,
        teamList,
        errors: { regError: null },
      }));
      let eventId = event._id;
      let user = props.auth.user;
      // console.log('user ',user)

      let isRegistered = user.competitions.map((comp) => comp._id).includes(eventId);
      // console.log('isreg ',isRegistered)
      // console.log('user ',user.competitions.map((comp) => comp._id));
      // console.log('eve ',eventId);

      setState((prevState) => ({
        ...prevState,
        isRegistered,
        loading: false,
      }));
      
      if (isRegistered) {
        return fetchTeamDetails();
      } else if (state.minCount === 1 && state.maxCount === 1) {
        registerTeam();
      }
    } catch (err) {
      if (err?.response?.status === 404 || err?.response?.status === 422) {
        props.updateUserInfo(props.auth.user._id)
          .then(() => {
            resetTeamList();
          });
      } else {
        props.history.goBack();
      }
    }
  };

  // const resetTeamList = () => {
  //   const user = props.auth.user;
  //   let teamList = [
  //     {
  //       eventKTJID: user.ktjID,
  //       Name: user.username,
  //       verified: true,
  //       error: false,
  //       _id: user._id,
  //     },
  //   ];
  //   for (let i = 0; i < state.minCount - 1; i++) {
  //     teamList.push({
  //       eventKTJID: "",
  //       Name: "",
  //       verified: false,
  //       error: false,
  //       _id: null,
  //     });
  //   }
  //   setState((prevState) => ({
  //     ...prevState,
  //     isRegistered: false,
  //     teamId: null,
  //     teamList,
  //     loading: false,
  //     errors: { regError: null },
  //   }));
  // };

  const addMember = () => {
    // Google analytics
    if (state.teamList.length === state.maxCount) {
      return;
    }

    ReactGa.event({
      category: "Click",
      action: "Clicked add teammate button of " + props.eventTitle,
    });

    setState((prevState) => ({
      ...prevState,
      teamList: [
        ...prevState.teamList,
        {
          eventKTJID: "",
          Name: "",
          verified: false,
          error: false,
          _id: null,
        },
      ],
    }));
  };

  const deleteMember = (index) => {
    // Google analytics
    ReactGa.event({
      category: "Click",
      action: "Clicked delete teammate button of " + props.eventTitle,
    });

    let newList = [...state.teamList];

    // if (props.isRegistered && newList[index].verified)
    //   deleteMemberFromteam(newList[index].eventKTJID);
    // else {
    newList = newList.filter((val, ind) => ind !== index);

    if (newList.length < state.minCount) {
      const newTeammate = {
        eventKTJID: "",
        Name: "",
        verified: false,
        error: false,
        _id: null,
      };

      newList.push(newTeammate);
    }

    setState({
      ...state,
      teamList: newList,
    })
  };

  const findMember = (value, index) => {
    // Google analytics
    ReactGa.event({
      category: "Click",
      action: "Clicked Verify teammate button of " + props.eventTitle,
    });

    const eventKTJID = value.trim();
    let flag = 0;

    state.teamList.forEach((member, indx) => {
      if (indx !== index && member.eventKTJID === eventKTJID) {
        const newErr = { ...state.errors };
        newErr.regError = "This member is already in the team";
        setState((prevState) => ({
          ...prevState,
          errors: newErr,
        }));

        flag = 1;
        return;
      }
    });

    if (!flag) {
      const data = { eventKTJID: eventKTJID };

      API.get("/findUser?ktjid=" + eventKTJID)
        .then((res) => {
          const username = res.data.payLoad.username;
          const newList = [...state.teamList];
          newList[index].Name = username;
          newList[index].verified = true;
          newList[index].error = false;
          newList[index]._id = res.data.payLoad._id;
          const newError = { ...state.errors };
          newError.regError = null;

          setState((prevState) => ({
            ...prevState,
            teamList: newList,
            errors: newError,
          }));
        })
        .catch((err) => {
          if (err.response.status === 404) {
            const newErr = { ...state.errors };
            newErr.regError = "User not Found";

            setState((prevState) => ({
              ...prevState,
              errors: newErr,
            }));
          } else if (err.response.data.name === "JsonWebTokenError") {
            props.logoutUser(payload, props.history.push("/signin"));
          } else if (err.response.data.name === "TokenExpiredError") {
            props.logoutUser(payload, props.history.push("/signin"));
          } else {
            const newList = state.teamList;
            newList[index].error = err;

            setState((prevState) => ({
              ...prevState,
              teamList: newList,
            }));
          }
        });
    }
  };

  const registerTeam = (e, category) => {
    if (e) e.preventDefault();
    var isVerified = state.teamList.length > 0 ? true : false;
    state.teamList.forEach((member) => {
      if (member.verified == false) {
        isVerified = false;
      }
    });
    if (isVerified) {
      var membersList = state.teamList.map((value) => {
        return value._id;
      });
      if (membersList.length == 0) {
        isVerified = false;
      }
      membersList[0] = props.auth.user._id;
      const userData = {
        ktjID: props.auth.user.ktjID,
        members: membersList,
        title: state.event.title,
        eventId: state.eventId,
        userId: props.auth.user._id,
        category: category
      };
      if (state.isRegistered) {
        userData.teamId = state.teamId;
        setState({ loading: true });

        props.editTeam(userData, props.history)
          .then((res) => {
            let newError = state.errors;
            newError.regError = null;
            setState({
              registerDone: true,
              editDone: true,
              errors: newError,
              loading: false,
            });
            handleClick();
          })
          .catch((err) => {
            // console.log('1 ',err);
            handleError(err.response.data.message);
            let newErr = state.errors;
            newErr.regError = err?.response?.data?.message;
            setState({
              loading: false,
              errors: newErr,
            });
          });
      } else {
        setState({ loading: true });

        props.registerEvent(userData, props.history)
          .then((res) => {
            let teamktjID = res.data.team.ktjID;
            let newError = state.errors;
            newError.regError = null;

            setState({
              registerDone: true,
              teamktjID: teamktjID,
              errors: newError,
              loading: false,
            });
            handleClick();
          })
          .catch((err) => {
            // console.log('2 ',err);
            handleError(err.response.data.message);
            if (err?.reset) {
              fetchTeamDetails();
            }

            let newErr = state.errors;
            newErr.regError = err?.response?.data?.message;

            setState({
              loading: false,
              errors: newErr,
            });
          });
      }
    } else {
      let newErr = state.errors;
      newErr.regError = "Verify all members to proceed";

      setState({
        errors: newErr,
      });
    }
  };

  const deleteTeamHandler = (e) => {
    e.preventDefault();
    const { teamId, eventId } = state;
    let user = props.auth.user;
    setState({ ...state, loading: true });

    props
      .deleteTeam({ teamId, eventId }, props.history)
      .then((res) => {
        let newError = { ...state.errors };
        newError.regError = null;

        setState({
          ...state,
          loading: false,
          teamktjID: null,
          errors: newError,
        });

        resetTeamList();
      })
      .catch((err) => {
        // console.log('3 ',err);
        let newErr = { ...state.errors };
        newErr.regError = err?.response?.data?.message;

        setState({
          ...state,
          loading: false,
          errors: newErr,
        });
      });
  };


  // componentDidMount() {
  //   let eventUrl = this.props.match.params.id;
  //   this.getEvent(eventUrl);
  //   // get the updated user info in any case if 
  //   // the user is removed or added to new team for the same event then 
  //   // we can show team list or show the form 
  //   this.props.updateUserInfo(this.props.auth.user._id);
  // }

  // componentWillUnmount() {
  //   this.setState({ errors: null });
  // }

  const resetTeamList = () => {
    const user = props.auth.user;
    let teamList = [
      {
        eventKTJID: user.ktjID,
        Name: user.username,
        verified: true,
        error: false,
        _id: user._id,
      },
    ];
    for (let i = 0; i < state.minCount - 1; i++) {
      teamList.push({
        eventKTJID: "",
        Name: "",
        verified: false,
        error: false,
        _id: null,
      });
    }
    setState((prevState) => ({
      ...prevState,
      isRegistered: false,
      teamId: null,
      teamList,
      loading: false,
      errors: { regError: null },
    }));
  };

  const handleClick = () => {
    // You can perform any additional actions here before navigating
    message.success("Registered Successfully");
    navigate('/profile');
  };

  const handleError=(err)=>{
    console.log('error')
    message.error(`${err}`);
    navigate(`/event/${id}`);
  }
  return (
    <div className={classes.eventregistration}>
      {/* {!state.registerDone ? ( */}
        <div className={classes.regForm}>
          {state.loading ? (
            <Loader />
          ) : (
            <>
              <form className={classes.form1} onChange={handleChange}>
                <h1 className={classes.h1}>{state.event.title}</h1>
                {state.maxCount > 1 && (
                  <h2 className={classes.h2}>
                    Team Details
                    {(state.minCount !== state.maxCount &&
                      !state.isRegistered) ||
                      state.editing ? (
                      <span className={classes.teamsize}>
                        &nbsp;(Size: {state.minCount + '-' + state.maxCount})
                      </span>
                    ) : null}
                  </h2>
                )}
                {state.isRegistered && (
                  <h3 className={classes.h2}>
                    {state.maxCount > 1 ? 'Team' : 'Participation'}-ID:{' '}
                    {state.teamktjID}
                  </h3>
                )}
                {state.maxCount > 1&&event.registration && (
                  <ul className={classes.ul}>
                    <Input
                      eventName={state.event.title}
                      addMember={addMember}
                      deleteMember={deleteMember}
                      teamList={state.teamList}
                      findMember={findMember}
                      maxCount={state.maxCount}
                      minCount={state.minCount}
                      isCaptain={state.isCaptain}
                      userktjId={props.auth.user.ktjID}
                      isRegistered={state.isRegistered}
                      editing={state.editing}
                      handleCategoryChange={handleCategoryChange}
                      category={state.category}
                    />
                  </ul>
                )}
                {state.errors.regError !== null ? (
                  <div
                    style={{
                      color: 'red',
                      fontSize: '1rem',
                      padding: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    {state.errors.regError}
                  </div>
                ) : null}
                <div className={classes.submitButtons}>
                  {!state.isRegistered&&event.registration && (
                    <div
                      type="submit"
                      className={classes.registerButton}
                      onClick={(e) => {
                        ReactGa.event({
                          category: 'Click',
                          action:
                            'Clicked FinalRegister button of ' +
                            props.eventTitle,
                        });
                        registerTeam(e,state.category);
                      }}
                    >
                        <div className={classes.registerButtonInner}>
                          Register Now
                        </div>
                    </div>
                  )}
                  {event.registration &&
                    state.isRegistered &&
                    state.isCaptain &&
                    state.maxCount > 1 && (
                      <div
                        className={classes.registerButton}
                        onClick={(e) => {
                          if (state.editing) {
                            ReactGa.event({
                              category: 'Click',
                              action:
                                'Clicked Save Team button of ' +
                                props.eventTitle,
                            });
                            registerTeam(e,state.category);
                          } else {
                            ReactGa.event({
                              category: 'Click',
                              action:
                                'Clicked Edit Team button of ' +
                                props.eventTitle,
                            });
                            setState({ ...state, editing: true });
                          }
                        }}
                      >
                        <div className={classes.registerButtonInner}>
                          {state.editing ? 'Save' : 'Edit Team'}
                        </div>
                      </div>
                    )}
                  {(!state.maxCount || state.editing) &&
                    state.isCaptain &&
                    state.isRegistered ? (
                    <div
                      className={classes.registerButton}
                      onClick={(e) => {
                        ReactGa.event({
                          category: 'Click',
                          action:
                            'Clicked delete team button of ' + props.eventTitle,
                        });
                        deleteTeamHandler(e);
                        if (state.maxCount === 1) {
                          props.history.goBack();
                        }
                      }}
                    >
                      <div className={classes.registerButtonInner}>
                        {state.maxCount > 1 ? 'Delete Team' : 'Deregister'}
                      </div>
                    </div>
                  ) : null}
                </div>
              </form>
            </>
          )}
        </div>
      ) 
      
      {/* : (
        <div className={classes.RegDone}>
          <h1 className={classes.RegDoneh1}>{state.event.title}</h1>
          {state.registerDone && !state.editDone && (
            <p className={classes.RegDoneP}>
              You have successfully registered.
            </p>
          )}
          {state.isRegistered && state.editDone && (
            <p className={classes.RegDoneP}>Team Updated Successfully</p>
          )}
          <p className={classes.RegDoneP}>
            {state.maxCount > 1 ? 'Team' : 'Participation'}-ID:{' '}
            {state.teamktjID}
          </p>
        </div>
      )} */}
      <BackBtn position="right-bottom" />
    </div>
  );
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
})(Register);
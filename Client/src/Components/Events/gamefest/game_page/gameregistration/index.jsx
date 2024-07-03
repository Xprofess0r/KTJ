import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import API from '../../../../../api';
import ReactGa from 'react-ga';
import { message } from "antd";
import BackBtn from '../../../../BackButton/button';
import classes from './index.module.css';
import { findUser, registerGame as registerEvent, setCurrentUser, logoutUser, editGameTeam as editTeam, deleteGameTeam as deleteTeam } from '../../../../../actions/eventActions';
import { updateUserInfo } from '../../../../../actions/authActions';
import Input from './Input';
import Loader from '../../../../Loader';

const Register = ({ auth, errors, findUser, registerEvent, setCurrentUser, logoutUser, editTeam, deleteTeam, updateUserInfo }) => {
  const [state, setState] = useState({
    isRegistered: false,
    eventId: null,
    loading: true,
    teamId: null,
    teamktjID: null,
    teamGameID: null,
    isCaptain: true,
    regError: '',
    errors: {
      regError: null,
    },
    teamList: [
      {
        eventKTJID: auth.user.ktjID,
        in_game_id: null,
        ign: null,
        Name: auth.user.username,
        verified: true,
        error: false,
        _id: auth.user._id,
      },
    ],
    minCount: 1,
    maxCount: 4,
    event: {},
    registerDone: false,
    editDone: false,
    editing: true,
    teamName: null,
  });

  useEffect(()=>{
    if(!(auth.isAuthenticated)){
      navigate('/signin');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },auth);
  const [event, setEvent] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value.trim();
    const targetId = e.target.id?.slice(-1);

    if (["ktjIDField", "in_game_idField", "ignField"].includes(targetName)) {
      const updatedList = state.teamList.map((item, index) => {
        if (index === Number(targetId)) {
          return {
            ...item,
            [targetName === "ktjIDField" ? "eventKTJID" : targetName]: targetValue,
          };
        }
        return item;
      });

      setState((prevState) => ({ ...prevState, teamList: updatedList }));
    } else if (targetName === "teamName") {
      setState((prevState) => ({ ...prevState, teamName: targetValue }));
    } else {
      setState((prevState) => ({ ...prevState, [targetName]: targetValue }));
    }
  };

  const fetchTeamDetails = async () => {
    const user = auth.user;
    const eventId = id;

    try {
      let index = user.games.findIndex((comp) => comp._id === eventId);
      let teamId = user.gameteams[index];
      setState((prevState) => ({ ...prevState, teamId: teamId }));

      let data = { gameId:eventId, teamId: teamId };
      setState((prevState) => ({ ...prevState, loading: true }));

      const res = await API.post("/gameteam/eventTeamDetails", data);
      const { team } = res.data;

      let teamList = res.data.team.members.map((member, index) => ({
        verified: true,
        error: false,
        Name: member.username,
        eventKTJID: member.ktjID,
        in_game_id: team.in_game_id[index],
        ign: team.ign[index],
        _id: member._id,
      }));

      let isCaptain = team.captain === auth.user.ktjID;
      let newError = state.errors;
      newError.regError = null;

      var newState = {
        ...state,
        teamList: teamList,
        isCaptain,
        isRegistered: true,
        teamktjID: team.ktjID,
        errors: newError,
        loading: false,
        editing: false,
        teamName: team.teamName,
      };
      setState(newState);
    } catch (error) {
      console.error('Error fetching team details:', error);
    }
  };


  useEffect(() => {
    fetchTeamDetails();
  }, [auth.user._id]);


  const getEvent = async (id) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const res = await API.get(`/games/getgame`, { params: { gameId: id } });
      // console.log(res.data, "yipeeeeeeeeeeee");

      const event = res.data.game;
      let teamList = [...state.teamList];
      var newState = {
        ...state,
        event: event,
        maxCount: event.max,
        minCount: event.min,
        eventId: event._id,
      };
      // console.log('event: ',event);
      setEvent(event);
      setState(newState);

      for (let i = 0; i < state.minCount - 1; i++) {
        teamList.push({
          eventKTJID: "",
          in_game_id: "",
          ign: "",
          Name: "",
          verified: false,
          error: false,
          _id: null,
        });
      }

      const newError = { ...state.errors, regError: null };
      newState = {
        ...state,
        teamList: teamList,
        errors: newError,
      };
      // console.log('heyy ', newState);
      setState(newState);

      const eventId = id;
      const user = auth.user;
      // console.log(11);
      // console.log(user.games);

      const isRegistered = user.games.map((comp) => comp._id).includes(eventId);
      // console.log('isRegistered ', isRegistered);
      // console.log(22);
      newState = {
        ...state,
        isRegistered: isRegistered,
        loading: false,
      };
      // console.log('hyy11 ', newState);
      setState(newState);

      if (isRegistered) {
        return fetchTeamDetails();
      }
      // else if (state.minCount === 1 && state.maxCount === 1) {
      //   registerTeam();
      // }
    } catch (err) {
      if (err?.response?.status === 404 || err?.response?.status === 422) {
        updateUserInfo(auth.user._id)
          .then(() => {
            resetTeamList();
          });
      } else {
        history.goBack();
      }
    }
  };


  const addMember = () => {
    //google analytics
    // console.log(state.teamList);
    if (state.teamList.length === event.max) {
      return;
    }

    ReactGa.event({
      category: "Click",
      action: "Clicked add teammate button of " + 'eventTitle',
    });
    //
    var newList = {
      ...state,
      teamList: [
        ...state.teamList,
        {
          eventKTJID: "",
          in_game_id: "",
          ign: "",
          Name: "",
          verified: false,
          error: false,
          _id: null,
        },
      ],
    };
    setState(newList);
  };

  const deleteMember = (index) => {
    //google analytics
    ReactGa.event({
      category: "Click",
      action: "Clicked delete teammate button of " + 'eventTitle',
    });
    //
    var newList = [...state.teamList];

    newList = newList.filter((val, ind) => {
      return ind !== index;
    });

    if (newList.length < state.minCount)
      newList.push({
        eventKTJID: "",
        in_game_id: "",
        ign: "",
        Name: "",
        verified: false,
        error: false,
        _id: null,
      });

    setState({
      ...state,
      teamList: newList,
    });
  };

  const findMember = (value, index) => {
    // console.log('ind ', index)
    //google analytics
    // console.log('val ', value);
    // ReactGa.event({
    //   category: "Click",
    //   action: "Clicked Verify teammate button of " + 'eventTitle',
    // });
    //
    const eventKTJID = value.trim();
    // console.log('eventKTJID ', eventKTJID);

    var flag = 0;
    var newErr = {};
    // console.log('team ', state.teamList);
    state.teamList.forEach((member, indx) => {
      if (indx !== index && member.eventKTJID === eventKTJID) {
        newErr = { ...state.errors };
        newErr.regError = "This member is already in the team";
        setState({
          ...state,
          errors: newErr,
        });

        flag = 1;
        return;
      }
      // console.log('member ', member);
      if (indx === index && (!member.in_game_id || !member.ign)) {
        newErr = { ...state.errors };
        newErr.regError = "Empty Input Field(s)";
        setState({
          ...state,
          errors: newErr,
        });
        flag = 1;
        return;
      }
    });

    // console.log('flag ', flag);
    if (!flag) {
      const data = { eventKTJID: eventKTJID };

      // API.get("/team/addMember", eventKTJID)
      API.get("/findUser?ktjid=" + eventKTJID)
        .then((res) => {
          var username = res.data.payLoad.username;
          var newList = [...state.teamList];
          newList[index].Name = username;
          newList[index].verified = true;
          newList[index].error = false;
          newList[index]._id = res.data.payLoad._id;
          let newError = { ...state.errors };
          newError.regError = null;
          var newState = {
            ...state,
            teamList: newList,
            errors: newError,
          }
          setState(newState);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            var newErr = { ...state.errors };
            newErr.regError = "User not Found";
            var newState = {
              ...state,
              errors: newErr,
            }
            setState(newState);
          } else if (err.response.data.name === "JsonWebTokenError" || err.response.data.name === "TokenExpiredError") {
            logoutUser(payload, history.push("/signin"));
          } else {
            var newList = state.teamList;
            newState = {
              ...state,
              teamList: newList,
            }
            setState(newState);
          }
        });
    }
  };
  // useEffect(() => {
  //   console.log('here ',state.event);
  // }, [state]);

  const registerTeam = (e) => {
    // console.log('called');
    if (e) e.preventDefault();
    var isVerified = state.teamList.length > 0 ? true : false;
    let in_game_id_array = [];
    let ign_array = [];
    let isNull = false;
    let teamName = state.teamName;
    // console.log('teamName ', teamName);
    state.teamList.forEach((member) => {
      // console.log('member ', member)
      if (member.verified === false) {
        isVerified = false;
      }
      if (member.ign == null || member.in_game_id == null) {
        let newError = { ...state.errors };
        newError.regError = "Please fill all the fields";
        setState({ ...state, errors: newError });
        isNull = true;
      }
      in_game_id_array.push(member.in_game_id);
      ign_array.push(member.ign);
    });
    if (isNull) return;
    if (isVerified) {
      var membersList = state.teamList.map((value) => {
        // console.log('value ', value)
        return value._id;
      });
      if (membersList.length === 0) {
        isVerified = false;
      }
      membersList[0] = auth.user._id;
      // console.log(auth.user)
      // console.log('membersList ', membersList )
      // console.log('state ',state);
      const userData = {
        // ktjID: state.teamList[0].eventKTJID,
        in_game_id: in_game_id_array,
        ign: ign_array,
        members: membersList,
        title: event.title,
        gameId: id,
        ktjID: auth.user.ktjID,
        userId: auth.user._id,
        teamName: teamName,
      };
      // console.log('userData ', userData);
      var newState = {};
      if (state.isRegistered) {
        // console.log('edit')
        let index = auth.user.games.findIndex((comp) => comp._id === id);
        let teamId = auth.user.gameteams[index];
        newState = { ...state, loading: true };
        userData.teamId = teamId;
        setState(newState);
        editTeam(userData, history)
          .then((res) => {
            let newError = { ...state.errors };
            newError.regError = null;
            newState = {
              ...state,
              registerDone: true,
              editDone: true,
              errors: newError,
              loading: false,
            };
            setState(newState);
          })
          .catch((err) => {
            // console.log();
            message.error(`${err.response.data.message}`)
            var newErr = { ...state.errors };
            newErr.regError = err?.response?.data?.message;
            newState = {
              ...state,
              loading: false,
              errors: newErr,
            };
            setState(newState);
          });
      } else {
        newState = { ...state, loading: true };
        setState(newState);

        registerEvent(userData, history)
          .then((res) => {
            let teamktjID = res.data.team.ktjID;
            let newError = { ...state.errors };
            newError.regError = null;
            newState = {
              ...state,
              registerDone: true,
              teamktjID: teamktjID,
              errors: newError,
              loading: false,
            };
            return setState(newState);
          })
          .catch((err) => {
            message.error(`${err.response.data.message}`)
            if (err?.reset) {
              fetchTeamDetails();
            }
            var newErr = { ...state.errors };
            newErr.regError = err?.response?.data?.message;
            newState = {
              ...state,
              loading: false,
              errors: newErr,
            };
            setState(newState);
          });
      }
    } else {
      var newErr = { ...state.errors };
      newErr.regError = "Verify all members to proceed";
      setState({
        ...state,
        errors: newErr,
      });
    }
  };

  const deleteTeamHandler = (e) => {
    if(e){
      e.preventDefault();
    } 
    let index = auth.user.games.findIndex((comp) => comp._id === id);
    let teamId = auth.user.gameteams[index];
    let user = auth.user;
    var newState = {
      ...state,
      loading: true,
    };
    setState(newState);

    deleteTeam({ teamId, gameId: id, captain: user }, history)
      .then((res) => {
        let newError = { ...state.errors };
        newError.regError = null;
        newState = {
          ...state,
          registerDone: false,
          teamktjID: null,
          errors: newError,
          loading: false,
        };
        setState(newState);
        resetTeamList();
      })
      .catch((err) => {
        var newErr = { ...state.errors };
        newErr.regError = err?.response?.data?.message;
        newState = {
          ...state,
          loading: false,
          errors: newErr,
        };
        setState(newState);
      });
  };

  useEffect(() => {
    let eventUrl = id;
    // console.log(eventUrl);
    getEvent(eventUrl);
    // console.log('11event: ',event);

    // console.log(state.loading);
    // Cleanup function (equivalent to componentWillUnmount)
    return () => {
      setState({ ...state, errors: null });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(()=>{
    console.log('event ',event);
  },[event]);

  const resetTeamList = () => {
    const user = auth.user;
    let teamList = [
      {
        eventKTJID: user.ktjID,
        in_game_id: "",
        ign: "",
        Name: user.username,
        verified: true,
        error: false,
        _id: user._id,
        teamName: null,
      },
    ];
    for (let i = 0; i < state.minCount - 1; i++) {
      teamList.push({
        eventKTJID: "",
        Name: "",
        in_game_id: "",
        ign: "",
        verified: false,
        error: false,
        _id: null,
      });
    }
    let newError = { ...state.errors };
    newError.regError = null;
    var newState = {
      ...state,
      isRegistered: false,
      teamId: null,
      teamList,
      loading: false,
      errors: newError,
    }
    setState(newState);
  };


  return (
    <div className={classes.cont}>
      <div className={classes.eventregistration}>
        {!state.registerDone ? (
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
                      {(state.minCount !== state.maxCount && !state.isRegistered) || state.editing ? (
                        <span className={classes.teamsize}>
                          &nbsp;(Size: {state.minCount + "-" + state.maxCount})
                        </span>
                      ) : null}
                    </h2>
                  )}
                  {state.isRegistered && (
                    <h3 className={classes.h2}>
                      {state.maxCount > 1 ? 'Team' : 'Participation'}-ID: {state.teamktjID}
                    </h3>
                  )}
                  {event.max >= 1 && (
                    <ul className={classes.ul}>
                      <Input
                        addMember={addMember}
                        deleteMember={deleteMember}
                        teamList={state.teamList}
                        findMember={findMember}
                        maxCount={event.max}
                        minCount={event.min}
                        isCaptain={state.isCaptain}
                        userktjId={auth.user.ktjID}
                        title={event.title}
                        teamName={state.teamName}
                        isRegistered={state.isRegistered}
                        editing={state.editing}
                      />
                    </ul>
                  )}
                  {state.regError && (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '1rem',
                        padding: '8px',
                        marginBottom: '8px',
                      }}
                    >
                      {state.regError}
                    </div>
                  )}
                  <div className={classes.submitButtons}>
                    {!state.isRegistered && (
                      <div
                        type="submit"
                        className={classes.registerButton}
                        onClick={() => {
                          registerTeam();
                        }}
                      >
                        <div className={classes.registerButtonInner}>Register Now</div>
                      </div>
                    )}
                    {state.isRegistered && state.isCaptain && state.maxCount > 1 && (
                      <div
                        className={classes.registerButton}
                        onClick={() => {
                          // console.log('edit: ',state.editing);
                          if (state.editing) {
                            registerTeam();
                          } else {
                            var newState = { ...state, editing: true };
                            setState(newState);
                          }
                        }}
                      >
                    <div className={classes.registerButtonInner}>{state.editing ? 'Save' : 'Edit Team'}</div>
                  </div>
                    )}
                  {state.maxCount <= 1 || state.editing ? (
                    <div
                      className={classes.registerButton}
                      onClick={() => {
                        deleteTeamHandler();
                        if (state.maxCount === 1) {
                          navigate(-1);
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
      ) : (
      <div className={classes.RegDone}>
        <h1 className={classes.RegDoneh1}>{event.title}</h1>
        {state.registerDone && !state.editDone && (
          <p className={classes.RegDoneP}>You have successfully registered.</p>
        )}
        {state.isRegistered && state.editDone && (
          <p className={classes.RegDoneP}>Team Updated Successfully</p>
        )}
        <p className={classes.RegDoneP}>
          {state.maxCount > 1 ? 'Team' : 'Participation'}-ID: {state.teamktjID}
        </p>
      </div>
        )}
      <Link to="/">
        <BackBtn position="right-bottom" />
      </Link>
    </div>
    </div >
  );
};

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

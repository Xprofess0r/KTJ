import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import API from '../../../../../api';
import ReactGa from 'react-ga';

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
        const eventId = state.eventId;

        try {
            let index = user.games.findIndex((comp) => comp._id === eventId);
            let teamId = user.gameteams[index];
            setState((prevState) => ({ ...prevState, teamId: teamId }));

            let data = { gameId: state.eventId, teamId: teamId };
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

            setState((prevState) => ({
                ...prevState,
                teamList: teamList,
                isCaptain,
                isRegistered: true,
                teamktjID: team.ktjID,
                errors: newError,
                loading: false,
                editing: false,
                teamName: team.teamName,
            }));
        } catch (error) {
            console.error('Error fetching team details:', error);
        }
    };


    useEffect(() => {
        fetchTeamDetails();
    }, [auth.user]);


    const getEvent = async (id) => {
        try {
            setState((prevState) => ({ ...prevState, loading: true }));

            const res = await API.get(`/games/getgame`, { params: { gameId: id } });
            console.log(res.data, "yipeeeeeeeeeeee");

            const event = res.data.game;
            let teamList = [...state.teamList];

            setState((prevState) => ({
                ...prevState,
                event: event,
                maxCount: event.max,
                minCount: event.min,
                eventId: event._id,
            }));

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

            setState((prevState) => ({
                ...prevState,
                teamList: teamList,
                errors: newError,
            }));

            const eventId = state.eventId;
            const user = auth.user;
            const isRegistered = user.games.map((comp) => comp._id).includes(eventId);

            setState((prevState) => ({
                ...prevState,
                isRegistered: isRegistered,
                loading: false,
            }));

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
        console.log(state.teamList);
        if (state.teamList.length === state.maxCount) {
          return;
        }
      
        ReactGa.event({
          category: "Click",
          action: "Clicked add teammate button of " + 'eventTitle',
        });
        //
      
        setState((prevState) => ({
          ...prevState,
          teamList: [
            ...prevState.teamList,
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
        }));
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
        //google analytics
        ReactGa.event({
          category: "Click",
          action: "Clicked Verify teammate button of " + 'eventTitle',
        });
        //
        const eventKTJID = value.trim();
      
        var flag = 0;
        state.teamList.forEach((member, indx, arr) => {
          if (indx !== index && member.eventKTJID === eventKTJID) {
            var newErr = { ...state.errors };
            newErr.regError = "This member is already in the team";
            setState({
              ...state,
              errors: newErr,
            });
      
            flag = 1;
            return;
          }
          if (indx === index && (!member.in_game_id || !member.ign)) {
            var newErr = { ...state.errors };
            newErr.regError = "Empty Input Field(s)";
            setState({
              ...state,
              errors: newErr,
            });
            flag = 1;
            return;
          }
        });
      
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
              setState({
                ...state,
                teamList: newList,
                errors: newError,
              });
            })
            .catch((err) => {
              if (err.response.status === 404) {
                var newErr = { ...state.errors };
                newErr.regError = "User not Found";
                setState({
                  ...state,
                  errors: newErr,
                });
              } else if (err.response.data.name === "JsonWebTokenError" || err.response.data.name === "TokenExpiredError") {
                logoutUser(payload, history.push("/signin"));
              } else {
                var newList = state.teamList;
                newList[index].error = err;
                setState({
                  ...state,
                  teamList: newList,
                });
              }
            });
        }
      };
      

      const registerTeam = (e) => {
        if (e) e.preventDefault();
        var isVerified = state.teamList.length > 0 ? true : false;
        let in_game_id_array = [];
        let ign_array = [];
        let isNull = false;
        let teamName = state.teamName;
        state.teamList.forEach((member) => {
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
            return value._id;
          });
          if (membersList.length === 0) {
            isVerified = false;
          }
          membersList[0] = props.auth.user._id;
          const userData = {
            ktjID: state.teamList[0].eventKTJID,
            in_game_id: in_game_id_array,
            ign: ign_array,
            members: membersList,
            title: state.event.title,
            gameId: state.eventId,
            ktjID: props.auth.user.ktjID,
            userId: props.auth.user._id,
            teamName: teamName,
          };
          if (state.isRegistered) {
            userData.teamId = state.teamId;
            setState({ ...state, loading: true });
            props
              .editTeam(userData, props.history)
              .then((res) => {
                let newError = { ...state.errors };
                newError.regError = null;
                setState({
                  ...state,
                  registerDone: true,
                  editDone: true,
                  errors: newError,
                  loading: false,
                });
              })
              .catch((err) => {
                var newErr = { ...state.errors };
                newErr.regError = err?.response?.data?.message;
                setState({
                  ...state,
                  loading: false,
                  errors: newErr,
                });
              });
          } else {
            setState({ ...state, loading: true });
      
            props
              .registerEvent(userData, props.history)
              .then((res) => {
                let teamktjID = res.data.team.ktjID;
                let newError = { ...state.errors };
                newError.regError = null;
                return setState({
                  ...state,
                  registerDone: true,
                  teamktjID: teamktjID,
                  errors: newError,
                  loading: false,
                });
              })
              .catch((err) => {
                if (err?.reset) {
                  fetchTeamDetails();
                }
                var newErr = { ...state.errors };
                newErr.regError = err?.response?.data?.message;
                setState({
                  ...state,
                  loading: false,
                  errors: newErr,
                });
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
        e.preventDefault();
        const { teamId, eventId } = state;
        let user = props.auth.user;
        setState({ ...state, loading: true });
      
        props
          .deleteTeam({ teamId, gameId: eventId, captain: user }, props.history)
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
            var newErr = { ...state.errors };
            newErr.regError = err?.response?.data?.message;
            setState({
              ...state,
              loading: false,
              errors: newErr,
            });
          });
      };
      
      useEffect(() => {
        componentDidMount();
    
        // Cleanup function (equivalent to componentWillUnmount)
        return () => {
          componentWillUnmount();
        };
      }, []);

      const componentDidMount = () => {
        let eventUrl = match.params.id;
        console.log(eventUrl);
        getEvent(eventUrl);
      };
      
      const componentWillUnmount = () => {
        setState({ ...state, errors: null });
      };
      
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
        setState({
          ...state,
          isRegistered: false,
          teamId: null,
          teamList,
          loading: false,
          errors: newError,
        });
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
                                    <h1 className={classes.h1}>{event.title}</h1>
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
                                    {state.maxCount >= 1 && (
                                        <ul className={classes.ul}>
                                            <Input
                                                addMember={addMember}
                                                deleteMember={deleteMember}
                                                teamList={state.teamList}
                                                findMember={findMember}
                                                maxCount={state.maxCount}
                                                minCount={state.minCount}
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
                                                    ReactGa.event({
                                                        category: 'Click',
                                                        action: 'Clicked FinalRegister button of ' + 'this.eventTitle',
                                                    });
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
                                                    if (state.editing) {
                                                        ReactGa.event({
                                                            category: 'Click',
                                                            action: 'Clicked Save Team button of ' + 'this.eventTitle',
                                                        });
                                                        registerTeam();
                                                    } else {
                                                        ReactGa.event({
                                                            category: 'Click',
                                                            action: 'Clicked Edit Team button of ' + 'this.eventTitle',
                                                        });
                                                        state.setEditing(true);
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
                                                    ReactGa.event({
                                                        category: 'Click',
                                                        action: 'Clicked delete team button of ' + 'this.eventTitle',
                                                    });
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
        </div>
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


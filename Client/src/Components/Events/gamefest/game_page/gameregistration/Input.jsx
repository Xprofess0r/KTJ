import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const Input = (props) => {
  const navigate = useNavigate();

  const {
    teamName,
    teamList,
    editing,
    isCaptain,
    maxCount,
    title,
    findMember,
    deleteMember,
    addMember,
  } = props;

  return (
    <div className={classes.uldiv}>
      <li key={-1}>
        {maxCount > 1 && <label className={classes.ktjIDLabel}>Team Name: </label>}
        {maxCount > 1 && (
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            id="teamNameInput"
            value={teamName}
            className={classes.ktjIDField}
            required
            disabled={!editing}
          />
        )}
      </li>
      {teamList.map((val, index) => (
        <li key={index}>
          <form className={classes.box}>
            {index === 0 ? (
              <label className={classes.ktjIDLabel}>
                {maxCount > 1 ? 'Team Captain:' : 'Your details:'}{' '}
              </label>
            ) : (
              <label className={classes.ktjIDLabel}>
                Team Member {index + 1}:
              </label>
            )}
            <input
              type="text"
              name="ktjIDField"
              placeholder="KTJ-ID"
              id={`eventKTJID${index}`}
              value={val.eventKTJID}
              className={classes.ktjIDField}
              disabled={index === 0 || val.verified}
              required
            />

            <input
              type="text"
              name="ignField"
              placeholder={
                title === 'Valorant' ? 'Riot-ID' : 
                title === 'Call of Duty: Mobile' ? 'In-Game Name' : 
                title === 'Battlegrounds Mobile India' ? 'In-Game Name' : 
                'In-Game Name'
              }
              id={`eventign${index}`}
              onChange={(e)=>val.ign=e.target.value}
              value={val.ign}
              className={classes.ktjIDField}
              disabled={val.verified&&!editing}
              required
            />
            {title === 'Valorant' && '#'}
            <input
              type="text"
              name="in_game_idField"
              placeholder={
                title === 'Valorant' ? 'Tagline' : 
                title === 'Call of Duty: Mobile' ? 'UID' : 
                title === 'Battlegrounds Mobile India' ? 'BGMI ID' : 
                'In-Game ID'
              }
              id={`eventin_game_id${index}`}
              onChange={(e)=>val.in_game_id=e.target.value}
              value={val.in_game_id}
              className={classes.ktjIDField}
              disabled={index !== 0 ? val.verified : !editing}
              required
            />

            {!val.verified ? (
              <div className={classes.verifyButtonOuter}>
                <div className={classes.verifyButton}>
                  <button
                    type="submit"
                    className={classes.verifyButtonInner}
                    onClick={(e) => {
                      e.preventDefault();
                      findMember(val.eventKTJID, index);
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
            {editing && index !== 0 && isCaptain ? (
              <div
                className={classes.deleteButton}
                onClick={() => deleteMember(index)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            ) : null}
          </form>
        </li>
      ))}
      {editing && teamList.length < maxCount && isCaptain ? (
        <button
          className={classes.addMember}
          onClick={() => {
            addMember();
          }}
          type="button"
        >
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: '60%' }} />
          &nbsp;Add a Teammate
        </button>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  teamName: PropTypes.string,
  teamList: PropTypes.array,
  editing: PropTypes.bool,
  isCaptain: PropTypes.bool,
  maxCount: PropTypes.number,
  title: PropTypes.string,
  findMember: PropTypes.func,
  deleteMember: PropTypes.func,
  addMember: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(Input);

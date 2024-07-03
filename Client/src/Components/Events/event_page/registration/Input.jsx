import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import classes from './Input.module.css';

const Input = ({
  teamList,
  handleCategoryChange,
  eventName,
  findMember,
  deleteMember,
  addMember,
  editing,
  isCaptain,
  maxCount,
  minCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className={classes.uldiv}>
      <li key={0}>
        <div className={classes.box}>
          <label className={classes.ktjIDLabel}>Team Captain: </label>
          <input
            type='text'
            name='ktjIDField'
            className={classes.ktjIDField}
            placeholder='KTJ-ID:'
            value={teamList[0].eventKTJID}
            disabled
          />
          <input
            type='text'
            name='namefield'
            className={classes.ktjIDField}
            placeholder='Name'
            value={teamList[0].Name}
            disabled
          />
        </div>
      </li>
      {eventName === 'Robo Wars' && (
        <li key={1}>
          <div className={classes.box}>
            <label className={classes.ktjIDLabel}>Category: </label>
            <select
              className={classes.ktjIDField}
              value={category}
              name='category'
              onChange={handleCategoryChange}
            >
              <option value='8'>8 kg</option>
              <option value='15'>15 kg</option>
              <option value='30'>30 kg</option>
            </select>
          </div>
        </li>
      )}
      {teamList.map((val, index, arr) =>
        index !== 0 ? (
          <li key={index}>
            <form className={classes.box}>
              {index === 0 ? (
                <label className={classes.ktjIDLabel}>Captain's KTJ-ID</label>
              ) : (
                <label className={classes.ktjIDLabel}>
                  Team Member {index + 1}:
                </label>
              )}
              {index === 0 ? (
                <input
                  type='text'
                  name='ktjIDField'
                  className={classes.ktjIDField}
                  placeholder="Team's Captain Id:"
                  value={val.eventKTJID}
                  disabled
                />
              ) : (
                <input
                  type='text'
                  name='ktjIDField'
                  placeholder='KTJ-ID'
                  id={`eventKTJID${index}`}
                  value={val.eventKTJID}
                  className={classes.ktjIDField}
                  disabled={val.verified}
                  required
                />
              )}
              {index !== 0 && !teamList[index].verified ? (
                <div className={classes.verifyButtonOuter}>
                  <div className={classes.verifyButton}>
                    <button
                      type='submit'
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
                  type='text'
                  name='namefield'
                  className={classes.ktjIDField}
                  placeholder='Name'
                  value={val.Name}
                  disabled
                />
              )}
              {editing &&
                index !== 0 &&
                // (teamList.filter((team) => {
                //   return team.verified;
                // }).length > minCount ||
                //   (!teamList[index].verified &&
                //     index + 1 > minCount)) &&
                isCaptain ? (
                <div
                  className={classes.deleteButton}
                  onClick={() => deleteMember(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              ) : null}
            </form>
          </li>
        ) : null
      )}
      {editing &&
        teamList.length < maxCount &&
        isCaptain ? (
        <button
          className={classes.addMember}
          onClick={() => addMember()}
          type='button'
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(Input);

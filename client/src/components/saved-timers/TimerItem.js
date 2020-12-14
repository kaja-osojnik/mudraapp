import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTimer } from "../../actions/timer";
import { playSavedTimer} from "../../actions/maintime";
import cdIcon from "../../img/timericon2.svg"


const TimerItem = ({ playSavedTimer,deleteTimer, auth, timer: { _id, timer, countdown} }) => {
    const TimeToNumber = ( displayTime ) => {
        let minutes = parseInt(displayTime.slice(0,2))
        let seconds = parseInt(displayTime.slice(3,5))
        let totalTime = minutes * 60 + seconds;

        return totalTime;
    }

    const timerItemData = {
        time: TimeToNumber(timer),
        countdowncheck: countdown
    }

    return(
        <div className="li-timer-item">
            <button className="remove-btn" onClick={(e) => deleteTimer(_id)}>&#10005;</button>
            {countdown &&
                <span>
                    <img src={cdIcon} alt="cd-icon" />
                </span>
            }
            <div className="single-timer-value" onClick={(e) => playSavedTimer(timerItemData)}>
                {timer}
            </div>

        </div>
    )
}

TimerItem.propTypes = {
    timer: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteTimer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteTimer, playSavedTimer})(TimerItem);
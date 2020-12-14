import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTimer, alreadyExists } from "../../actions/timer";
import SaveTimerMsg from "./SaveTimerMsg";
import {CSSTransition} from "react-transition-group";


const SaveTimer = ({ alreadyExists, addTimer, maintime: { time, countdowncheck, playing }, timers, msg }) => {
    const TimeToString = (remainingTime) => {
        if (!remainingTime) {
            return '00:00'
        } else {
            let minutes = Math.floor(remainingTime / 60)
            let seconds = remainingTime - minutes * 60
            let secondsString = seconds.toString()
            let minutesString = minutes.toString()
            if (seconds < 10)
                secondsString = '0'+ seconds
            if (minutes < 10)
                minutesString = '0' + minutes

            return (minutesString + ':' + secondsString)
        }
    }

    const formData = {
        timer: TimeToString(time),
        countdown: countdowncheck
    }

    const appearHome = true;

    const { timer, countdown } = formData

    const onSubmit = e => {
        e.preventDefault()
        let checkTimers = false
        for (let i = 0; i < timers.length; i++){
            if (timers[i].timer === timer && timers[i].countdown === countdown)
                checkTimers = true
        }
        if (!checkTimers) {
            addTimer({timer, countdown});
        }
        else{
            alreadyExists();
        }
    }



    return (
        <Fragment>
            { !playing &&
                <Fragment>
                    <form className="save-timer-form" onSubmit={e => onSubmit(e)}>
                        <button type="submit" className="save-timer-btn"><span className="set-new">SAVE TIMER</span></button>
                    </form>
                    {msg.length ?
                        <CSSTransition
                            in={appearHome}
                            appear={true}
                            timeout={1000}
                            classNames="contentfade">
                            <SaveTimerMsg />
                        </CSSTransition>
                        :
                        ""
                    }
                </Fragment>

            }
        </Fragment>
    )
}

SaveTimer.propTypes = {
 addTimer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    maintime: state.maintime,
    timers: state.timer.timers,
    msg: state.timer.msg
})



export default connect(mapStateToProps, { addTimer, alreadyExists})(SaveTimer);
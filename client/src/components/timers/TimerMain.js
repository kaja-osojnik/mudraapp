import React, {Fragment } from 'react';
import { connect } from 'react-redux';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import buddha from "../../img/buddha.png";
import ReactPlayer from "react-player";
import {CSSTransition} from "react-transition-group";

const TimerMain = ({ mainTime }) => {
    const appearHome = true;
    const remainingTimeToString = (remainingTime) => {
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

    const renderTime = ({ remainingTime }) => {
            const bell = require("../../sounds/bell.wav")
            return (
                <Fragment>
                    <div className="timer timer-main">
                        <div className="value">{remainingTimeToString(remainingTime)}</div>
                    </div>
                    {remainingTime === 0 &&
                    <ReactPlayer url={bell} playing volume={0.5}/>
                    }
                </Fragment>
            )
    };

    return(
        <Fragment>
            <CountdownCircleTimer
                isPlaying
                duration={mainTime.time}
                colors={[["#efba96", 0.33], ["#efba96", 0.33], ["#efba96", 0.33]]}
                size={300}
                trailColor={" "}
                strokeWidth={9}
            >
                {renderTime}
            </CountdownCircleTimer>
            <CSSTransition
                in={appearHome}
                appear={true}
                timeout={1000}
                classNames="contentfade">
                    <img src={buddha} alt="Buddha" />
            </CSSTransition>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    mainTime: state.maintime
})

export default connect(mapStateToProps, null)(TimerMain);
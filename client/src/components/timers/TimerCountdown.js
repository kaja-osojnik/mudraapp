import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ReactPlayer from "react-player";

const TimerCountdown = () => {
    const renderTime = ({ remainingTime }) => {
        return (
            <div className="timer">
                <div className="value">{remainingTime}</div>
            </div>
        );
    };

    return(
        <div>
            <span className="timer-starting-in">TIMER STARTING IN</span>
            <CountdownCircleTimer
                isPlaying
                duration={10}
                colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
                size={300}
                trailColor={" "}
                strokeWidth={9}
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    )
}

const mapStateToProps = state => ({
    mainTime: state.maintime
})

export default connect(mapStateToProps, null)(TimerCountdown);
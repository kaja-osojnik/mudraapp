import React, {Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { setDelay } from "../../actions/maintime";
import TimerMain from "./TimerMain";
import TimerCountdown from "./TimerCountdown";
import ReactPlayer from "react-player";

const Timer = ({ mainTime, setDelay }) => {
    const { countdowncheck, delay } = mainTime

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelay();
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    if ((countdowncheck && delay) || !countdowncheck) {
        const bell = require("../../sounds/bell2.wav")
        return (
            <Fragment>
                <ReactPlayer url={bell} playing volume={0.5} width="0" height="0"/>
                <div className="timer-wrapper">
                    <TimerMain />
                </div>
            </Fragment>
        )
    }

    return(
        <Fragment>
                <div className="timer-wrapper">
                    { countdowncheck && !delay && <TimerCountdown />}
                </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    mainTime: state.maintime
})

export default connect(mapStateToProps, { setDelay })(Timer);
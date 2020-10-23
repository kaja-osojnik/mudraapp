import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { setDelay } from "../actions/maintime";
import TimerMain from "./TimerMain";
import TimerCountdown from "./TimerCountdown";

const Timer = ({ mainTime, setDelay }) => {
    const { countdown, delay } = mainTime

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelay();
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return(
        <Fragment>
                <div className="timer-wrapper">
                    { countdown && !delay && <TimerCountdown />}

                    { countdown && delay && <TimerMain /> }

                    { !countdown && <TimerMain /> }
                </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    mainTime: state.maintime
})

export default connect(mapStateToProps, { setDelay })(Timer);
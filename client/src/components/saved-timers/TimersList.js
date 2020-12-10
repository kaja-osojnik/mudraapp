import React, {useEffect, Fragment, useState} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimers } from "../../actions/timer";
import Spinner from "../layout/Spinner";
import TimerItem from "./TimerItem";
import ClickAwayListener from "react-click-away-listener";

const TimersList = ({getTimers, timer: { timers, loading}}) => {
    useEffect(() => {
        getTimers();
    }, [getTimers]);

    const [open, handleOpen] = useState(false);



    return (
        <Fragment>
            <ClickAwayListener onClickAway={() => handleOpen(false)}>
                <div className="show-saved-wrapper">
                    <div className="show-saved-btn" onClick={() => handleOpen(true)}>
                        +
                    </div>
                </div>
                <div className={`timers-list ${open && "open"}`}>
                    <div className="timer-type">
                        <p onClick={() => handleOpen(false)}>&#10005;</p>
                        <span>MY SAVED TIMERS</span>
                    </div>
                    {loading ? <Spinner/> :
                        <Fragment>
                            {timers.length ?
                                <ul className="saved-timers" onClick={() => handleOpen(false)}>
                                    {timers.map(timer => (
                                        <li>
                                            <TimerItem key={timer._id} timer={timer}/>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <div className="saved-timers-placeholder-txt">
                                    <p>Save your timers to find them here.</p>
                                </div>
                            }
                        </Fragment>
                    }
                </div>
            </ClickAwayListener>
        </Fragment>
    )
}

TimersList.propTypes = {
    getTimers: PropTypes.func.isRequired,
    timer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    timer: state.timer
})

export default connect(mapStateToProps, {getTimers})(TimersList);
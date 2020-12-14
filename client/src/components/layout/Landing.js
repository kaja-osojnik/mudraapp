import React, {Fragment} from 'react';
import TimeField from "../../controls/TimeField";
import { connect } from 'react-redux';
import {setTime, playTimer, resetTimer, shuffleCountdown, setNewTimer} from "../../actions/maintime";
import Timer from "../timers/Timer";
import {CSSTransition} from "react-transition-group";

const Landing = ({ mainTime, setTime, playTimer, resetTimer, shuffleCountdown, setNewTimer }) => {
    const { playing, displayTime } = mainTime
    const appearHome = true;
    const onTimeChange = (e) => {
        setTime(e.target.value)
    }

    return(
        <Fragment>
                {!playing ?
                    <div>
                        <span>SET TIME</span>
                        <TimeField
                            className="timer"
                            value={displayTime}
                            onChange={e=> onTimeChange(e)}
                        />
                        <div className="countdown-checkbox">
                            <input type="checkbox" id="countdowncheck" name="countdowncheck" value="countdowncheck" onChange={shuffleCountdown}/>
                            <label htmlFor="countdowncheck">
                                + 10 second countdown
                            </label>
                        </div>
                    </div>
                    :
                    <CSSTransition
                        in={appearHome}
                        appear={true}
                        timeout={1000}
                        classNames="contentfade">
                    <Timer />
                    </CSSTransition>
                }

            {!playing ?
                <div className="meditate-btn">
                    <button onClick={playTimer}>
                        meditate
                    </button>
                </div>

                :

                <div className="bottom-btns">
                    <button onClick={resetTimer}>reset</button>
                <span className="set-new" onClick={() => {setNewTimer(); setTime("20:00 ")}}>SET NEW TIMER</span>
                </div>
            }

        </Fragment>
    )
}

const mapStateToProps = state => ({
    mainTime: state.maintime
})

export default connect(mapStateToProps, { setTime, playTimer, resetTimer, shuffleCountdown, setNewTimer })(Landing);
import React, {Fragment} from 'react';
import TimeField from "react-simple-timefield";
import { connect } from 'react-redux';
import {setTime, playTimer, resetTimer, shuffleCountdown, setNewTimer} from "../../actions/maintime";
import Timer from "../timers/Timer";

const Landing = ({ mainTime, setTime, playTimer, resetTimer, shuffleCountdown, setNewTimer }) => {
    const { playing, displayTime } = mainTime

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
                            <label htmlFor="countdowncheck"> + 10 second countdown</label>
                        </div>
                    </div>
                    :
                    <Timer />
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
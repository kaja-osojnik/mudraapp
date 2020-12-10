import React, {Fragment, useState} from "react";
import Landing from "../layout/Landing";
import TimersList from "../saved-timers/TimersList";
import SaveTimer from "../saved-timers/SaveTimer";
import {CSSTransition} from "react-transition-group";

const Dashboard = () => {
    const appearHome = true;

    return(
        <div className="dashboard-wrap">
            <div className="dashboard">
                <CSSTransition
                    in={appearHome}
                    appear={true}
                    timeout={1000}
                    classNames="contentfade-long">
                    <Landing />
                </CSSTransition>
                <CSSTransition
                    in={appearHome}
                    appear={true}
                    timeout={1000}
                    classNames="contentfade-long">
                    <SaveTimer />
                </CSSTransition>
            </div>
            <CSSTransition
                in={appearHome}
                appear={true}
                timeout={1000}
                classNames="contentfade-long">
            <TimersList />
            </CSSTransition>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard;
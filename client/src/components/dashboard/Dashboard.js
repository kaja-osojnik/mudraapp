import React from "react";
import Landing from "../layout/Landing";
import TimersList from "../saved-timers/TimersList";
import SaveTimer from "../saved-timers/SaveTimer";

const Dashboard = () => {

    return(
        <div className="dashboard-wrap">
            <div className="dashboard">
                <Landing />
                <SaveTimer />
            </div>
                <TimersList />
            </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard;
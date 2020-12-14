import React, {Fragment, useLayoutEffect} from 'react';
import Navbar from "../layout/Navbar"
import Register from "../auth/Register";
import Login from "../auth/Login";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Redux
import { connect} from 'react-redux';
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import Home from "../layout/Home";
import {loginPage, notLoginPage} from "../../actions/auth";


const MainApp = () => {

    return(
            <Router>
                <Fragment>
                    <Navbar/>
                    <main>
                        <div className="main-first-wrap">
                            <div className="main-wrapper">
                                <Route exact path="/" component={Home} />
                                <Switch>
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                </Switch>
                            </div>
                        </div>
                    </main>
                </Fragment>
            </Router>
    )
}

export default connect(null, { loginPage, notLoginPage })(MainApp);

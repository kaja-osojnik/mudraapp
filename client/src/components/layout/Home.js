import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Landing from "./Landing";
import { CSSTransition } from 'react-transition-group';
import { notLoginPage } from '../../actions/auth';

const Home = ({ isAuthenticated, notLoginPage }) => {
    useEffect(() => {
        notLoginPage();
    }, [])
    const appearHome = true;

    if(isAuthenticated) {
        return (
            <Redirect to="/dashboard" />
        )
    }

    return(
        <Fragment>
            <CSSTransition
                in={appearHome}
                appear={true}
                timeout={1000}
                classNames="contentfade">
                <div className="landing">
                    <Landing />
                </div>
            </CSSTransition>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {notLoginPage})(Home);
import React, {useEffect, useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import {login, loginPage} from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTime } from "../../actions/maintime";
import {CSSTransition} from "react-transition-group";

const Login = ({ login, isAuthenticated, setTime, alert, loginPage }) => {
    useEffect(() => {
        loginPage()
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const appearHome = true;

    const { email, password } = formData

    const onChange = e =>  setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        console.log("success!");
        login(email, password);
        setTime("20:00");
    }

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return(
        <CSSTransition
            in={appearHome}
            appear={true}
            timeout={1000}
            classNames="contentfade">
            <div className="sign-in">
                <span>SIGN IN</span>
                <p>Sign into your account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value = {email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value = {password}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <small>{alert}</small>
                    <button type="submit" className="bottom-btns">Sign In</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </CSSTransition>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert: state.auth.alert
})

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, { login, setTime, loginPage })(Login);
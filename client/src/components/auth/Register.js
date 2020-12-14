import React, {useEffect, useState} from 'react';
import {Link, Redirect } from "react-router-dom"
import { connect } from 'react-redux';
import { register, loginPage } from  "../../actions/auth"
import PropTypes from 'prop-types';
import {CSSTransition} from "react-transition-group";

const Register = ({ register, isAuthenticated, loginPage }) => {
    useEffect(() => {
        loginPage()
    }, [])
    const appearHome = true;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [passMatch, setPassMatch] = useState(true);
    const [submitted, setSubmitted] = useState(false)

    const { name, email, password, password2 } = formData

    const onChange = e =>  setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        setSubmitted(true);
        if(password !== password2){
            setPassMatch(false);
        } else {
            register({ name, email, password})
            setPassMatch(true);
        }
    }

    // Redirect if registered
    if(isAuthenticated) {
        return <Redirect to ="/dashboard" />
    }

    return(
        <CSSTransition
            in={appearHome}
            appear={true}
            timeout={1000}
            classNames="contentfade">
            <div className="sign-in">
                <span>SIGN UP</span>
                <p>Create Your Account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value = {name}
                            onChange={e => onChange(e)}
                        />
                        { submitted && name.length === 0 && isAuthenticated === false &&
                        <small>*Name is required</small>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value = {email}
                            onChange={e => onChange(e)}
                        />
                        { submitted && email.length === 0 && isAuthenticated === false &&
                        <small>*Email is required</small>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value = {password}
                            onChange={e => onChange(e)}
                        />
                        {  submitted && password.length === 0 && isAuthenticated === false &&
                        <small>*Please enter a password</small>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            value = {password2}
                            onChange={e => onChange(e)}
                        />
                        {!passMatch &&
                        <small>*Passwords do not macth!</small>
                        }
                    </div>
                    <button type="submit" className="bottom-btns">Register</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </CSSTransition>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, loginPage })(Register);
import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { register } from  "../../actions/auth"
import PropTypes from 'prop-types';

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [passMatch, setPassMatch] = useState(true)

    const { name, email, password, password2 } = formData

    const onChange = e =>  setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        if(password !== password2){
            setPassMatch(false);
        } else {
            register({ name, email, password})
            setPassMatch(true);
        }
    }

    return(
        <Fragment>
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
                    { name.length === 0 && isAuthenticated === false &&
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
                    { email.length === 0 && isAuthenticated === false &&
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
                    { password.length === 0 && isAuthenticated === false &&
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
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register);
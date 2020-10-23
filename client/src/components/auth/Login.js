import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { email, password} = formData

    const onChange = e =>  setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        console.log("success!");
    }

    return(
        <Fragment>
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
                <button type="submit" className="bottom-btns">Sign In</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login;
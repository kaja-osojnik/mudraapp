import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, LOGIN_PAGE, NOT_LOGIN_PAGE } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try{
        const res = await axios.post('api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
    } catch (err) {
        console.log("err:", err)
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User
export const login = ( email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try{
        const res = await axios.post('api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
    } catch (err) {
        console.log("err:", err)
        dispatch({
            type: LOGIN_FAIL,
            payload: "*Invalid credentials, please check your login details"
        })
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}


// Login page
export const loginPage = () => dispatch => {
    dispatch({
        type: LOGIN_PAGE
    })
}

// Not login page
export const notLoginPage = () => dispatch => {
    dispatch({
        type: NOT_LOGIN_PAGE
    })
}


import axios from 'axios';
import {GET_TIMERS, TIMER_ERROR, DELETE_TIMER, ADD_TIMER, ALREADY_EXISTS, RESET_MSG} from "./types";

// Get Timers
export const getTimers = () => async dispatch => {
    try {
        const res = await axios.get('api/timers/me');

        dispatch({
            type: GET_TIMERS,
            payload: res.data
        })
    } catch (err) {
        console.log("err:", err);
    }
}


// Delete Timer
export const deleteTimer = id => async dispatch => {
    try{
       await axios.delete(`/api/timers/${id}`);

        dispatch({
            type: DELETE_TIMER,
            payload: id
        })
    } catch(err) {
        dispatch({
            type: TIMER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statue}
        })

    }
}

// Add Timer
export const addTimer = formData => async dispatch => {
    const config =  {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.post('/api/timers/', formData, config);

        await dispatch({
            type: ADD_TIMER,
            payload: res.data
        })

        setTimeout( () => {
                dispatch({
                    type: RESET_MSG,
                })
            }
            , 1500);
    } catch(err) {
        dispatch({
            type: TIMER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statue}
        })

    }
}

// Already Exists
export const alreadyExists = () => async dispatch => {
    await dispatch({
        type: ALREADY_EXISTS,
        payload: '*Psst, you already saved a timer with this value.'
    })

    setTimeout( () => {
            dispatch({
                type: RESET_MSG,
            })
    }
 , 2000);
}
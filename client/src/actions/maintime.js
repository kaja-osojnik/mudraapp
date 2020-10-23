import {SET_TIME, PLAY_TIMER, RESET_TIMER, SHUFFLE_COUNTDOWN, SET_NEW_TIMER, SET_DELAY, REGISTER_SUCCESS} from './types'
import axios from "axios";

export const setTime = ( displayTime ) => dispatch => {
    let minutes = parseInt(displayTime.slice(0,2))
    let seconds = parseInt(displayTime.slice(3,5))
    let totalTime = minutes * 60 + seconds;

    dispatch({
        type: SET_TIME,
        payload: totalTime
    })
}

export const playTimer = () => dispatch => {
    dispatch({
        type: PLAY_TIMER
    })
}

export const resetTimer = () => async dispatch => {
    await dispatch({
        type: RESET_TIMER
    })

    dispatch({
        type: PLAY_TIMER
    })
}

export const shuffleCountdown = () => dispatch => {
    dispatch({
        type: SHUFFLE_COUNTDOWN
    })
}

export const setNewTimer = () => dispatch => {
    dispatch({
        type: SET_NEW_TIMER
    })
}

export const setDelay = () => dispatch => {
    dispatch({
        type: SET_DELAY
    })
}
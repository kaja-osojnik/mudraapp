import {
    SET_TIME,
    PLAY_TIMER,
    RESET_TIMER,
    SHUFFLE_COUNTDOWN,
    SET_NEW_TIMER,
    SET_DELAY,
    PLAY_SAVED_TIMER,
    STOP_SAVED_TIMER
} from '../actions/types'

const initialState = {
    time: 1200,
    displayTime: '20:00',
    countdowncheck: false,
    playing: false,
    delay: false
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_TIME:
            return {
                ...state,
                time: payload
            }

        case PLAY_TIMER:
            return {
                ...state,
                playing: true
            }

        case RESET_TIMER:
            return {
                ...state,
                playing: false,
            }

        case SET_NEW_TIMER:
            return {
                ...state,
                playing: false,
                delay: false,
                countdowncheck: false
        }

        case SHUFFLE_COUNTDOWN:
            return {
                ...state,
                countdowncheck: !state.countdowncheck
        }

        case SET_DELAY:
            return {
                ...state,
                delay: true
            }

        case PLAY_SAVED_TIMER:
            return {
                ...state,
                countdowncheck: payload.countdowncheck,
                time: payload.time,
                playing: true
            }

        case STOP_SAVED_TIMER:
            return {
                ...state,
                playing: false,
                delay: false
            }

        default:
            return state;
    }
}
import { SET_TIME, PLAY_TIMER, RESET_TIMER, SHUFFLE_COUNTDOWN, SET_NEW_TIMER, SET_DELAY } from '../actions/types'

const initialState = {
    time: 1200,
    displayTime: '20:00',
    countdown: false,
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
                countdown: false
        }

        case SHUFFLE_COUNTDOWN:
            return {
                ...state,
                countdown: !state.countdown
        }

        case SET_DELAY:
            return {
                ...state,
                delay: true
            }

        default:
            return state;
    }
}
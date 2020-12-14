import {
    GET_TIMERS,
    TIMER_ERROR,
    DELETE_TIMER,
    ADD_TIMER,
    ALREADY_EXISTS, RESET_MSG
} from '../actions/types'

const initialState = {
    timers: [],
    timer: "20 minutes",
    countdown: false,
    loading: true,
    error: {},
    msg: ""
}

export default  function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TIMERS:
            return {
                ...state,
                timers: payload.reverse(),
                loading: false
            }

        case TIMER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        case DELETE_TIMER:
            return{
               ...state,
                timers: state.timers.filter(timer => timer._id !== payload),
                loading: false
            }

        case ADD_TIMER:
            return {
                ...state,
                timers: [payload, ...state.timers],
                loading: false,
                msg: "Timer saved!"
            }

        case ALREADY_EXISTS:
            return {
                ...state,
                msg: payload
            }

        case RESET_MSG:
            return {
                ...state,
                msg: ""
            }

        default:
            return state;
    }
}
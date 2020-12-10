import { combineReducers } from "redux";
import auth from './auth';
import maintime from './maintime';
import timer from './timer';

export default combineReducers({
    auth,
    maintime,
    timer
})
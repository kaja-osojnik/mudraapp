import { combineReducers } from "redux";
import auth from './auth';
import maintime from './maintime'

export default combineReducers({
    auth,
    maintime
})
import {combineReducers} from "redux";
import uiReducer from "./uiReducer.js";
import weatherReducer from "./weatherReducer.js";

export const rootReducer = combineReducers({
    ui : uiReducer,
    weather : weatherReducer
})
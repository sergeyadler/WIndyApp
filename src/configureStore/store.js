import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {rootReducer} from "../reducers/rootRedicer.js";
import {thunk} from "redux-thunk";
import {logger} from "redux-logger/src";

export const store = createStore(rootReducer,applyMiddleware(thunk,logger));
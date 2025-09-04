import {RESET_WEATHER, SET_CURRENT, SET_DAILY, SET_HOURLY} from "../actions/windyActions.js";

const initialState = {
    current: null,
    hourly: [],
    daily: [],
    updatedAt: null,
};


export default function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                updatedAt: Date.now()
            };
        case SET_HOURLY:
            return {
                ...state,
                hourly: action.payload,
                updatedAt: Date.now()
            }
        case SET_DAILY:
            return {
                ...state,
                daily: action.payload,
                updatedAt: Date.now()
            }
        case  RESET_WEATHER :{
                return {initialState}
        }
        default : return state;
    }
}
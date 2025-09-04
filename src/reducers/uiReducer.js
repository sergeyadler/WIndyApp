import {SET_CITY, SET_ERROR, SET_LOADING} from "../actions/windyActions.js";


const initialState = {
    city: 'Berlin',
    loading: false,
    error: null
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CITY:
            return {
                ...state,
                city: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default : return state;
    }
}
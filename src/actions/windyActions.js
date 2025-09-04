
//uiActions
export const SET_CITY = 'SET_CITY';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

//weatherActions
export const SET_CURRENT = "weather/SET_CURRENT";
export const SET_HOURLY = "weather/SET_HOURLY";
export const SET_DAILY = "weather/SET_DAILY";
export const RESET_WEATHER = "weather/RESET_WEATHER";






export const setCity = (city) => ({ type: SET_CITY, payload: city });
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });
export const setError = (err) => ({ type: SET_ERROR, payload: err });




export const setCurrent = (payload) => ({ type: SET_CURRENT, payload });
export const setHourly = (payload) => ({ type: SET_HOURLY, payload });
export const setDaily = (payload) => ({ type: SET_DAILY, payload });
export const resetWeather = () => ({ type: RESET_WEATHER });
import React, { useEffect, useRef} from 'react';

import Weather from "./Weather.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import {useI18n} from "../utils/I18nProvider.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchWeather} from "../actions/weatherThunks.js";

const Data = () => {
    const dispatch = useDispatch();
    const {owmLang} = useI18n();

    // читаем из Redux
    const city = useSelector((s) => s.ui.city);
    const error = useSelector((s) => s.ui.error);
    const current = useSelector((s) => s.weather.current);
    const lastUpdated = useSelector((s) => s.weather.updatedAt);
    const timerRef = useRef(null);

    useEffect(() => {
        dispatch(fetchWeather(city, owmLang));
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            dispatch(fetchWeather(city, owmLang));
        }, 1000 * 60 * 5);

        return () => clearInterval(timerRef.current);

    }, [city, owmLang, dispatch]);

    return (
        <div>
            {/*<CityInput onSubmit={setCity} loading={loading}/>*/}
            <Weather data={current} lastUpdated={lastUpdated} error={error}/>
            <HourlyForecast city={city} take={6} lang="en"/>
        </div>
    );
};

export default Data;

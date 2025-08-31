import React, {useCallback, useEffect, useRef, useState} from 'react';
import {apiKey, baseUrl} from "../utils/constants.jsx";
import CityInput from "./CityInput.jsx";
import Weather from "./Weather.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import {useI18n} from "../utils/I18nProvider.jsx";

const Data = ({city, setLoading}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);
    const timerRef = useRef(null);
    const {owmLang} = useI18n();
    const fetchData = useCallback(async (q) => {
        if (!q) return;
        setLoading(true);
        setError('');

        try {

            const url = `${baseUrl}weather?q=${encodeURIComponent(q)}&appid=${apiKey}&units=metric&lang=${owmLang}`;
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLastUpdated(Date.now());
        } catch (e) {
            setError(e.message || 'Unknown error');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [owmLang, setLoading]);


    useEffect(() => {
        fetchData(city);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => fetchData(city), 1000 * 60 * 5);

        return () => clearInterval(timerRef.current);
    }, [city, fetchData]);

    return (
        <div>
            {/*<CityInput onSubmit={setCity} loading={loading}/>*/}
            <Weather data={data} lastUpdated={lastUpdated} error={error}/>
            <HourlyForecast city={city} take={6} lang="en" />
        </div>
    );
};

export default Data;

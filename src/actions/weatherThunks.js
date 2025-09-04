import { baseUrl, apiKey } from "../utils/constants.jsx";
import { setCurrent, setDaily, setHourly, setError, setLoading } from "./windyActions.js";

// группировка 3h-срезов по YYYY-MM-DD
function groupByDate(list) {
    const map = new Map();
    list.forEach((item) => {
        const day = item.dt_txt.split(" ")[0];
        if (!map.has(day)) map.set(day, []);
        map.get(day).push(item);
    });
    return Array.from(map.entries()).map(([date, slices]) => ({ date, slices }));
}

export const fetchWeather = (city, owmLang = "en") => async (dispatch) => {
    if (!city) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
        const currentRes = await fetch(
            `${baseUrl}weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${owmLang}`
        );
        if (!currentRes.ok) throw new Error("Failed to fetch current weather");
        const current = await currentRes.json();

        const forecastRes = await fetch(
            `${baseUrl}forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${owmLang}`
        );
        if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
        const forecast = await forecastRes.json();
        const list = forecast.list || [];

        dispatch(setCurrent(current));
        dispatch(setHourly(list));
        dispatch(setDaily(groupByDate(list)));
    } catch (e) {
        dispatch(setError(e.message || "Unknown error"));
    } finally {
        dispatch(setLoading(false));
    }
};

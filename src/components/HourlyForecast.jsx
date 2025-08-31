import React, { useEffect, useState } from "react";
import { baseUrl, apiKey } from "../utils/constants.jsx";
import WeatherIcon from "./WeatherIcon.jsx";
import Card from "./Card.jsx";
import HourlyItem from "./HourlyItem.jsx";
import {useI18n} from "../utils/I18nProvider.jsx";


const HourlyForecast = ({ city }) => {
    const { t, owmLang, dateLocale } = useI18n();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${owmLang}`)
            .then((res) => res.json())
            .then((data) => setItems((data.list || []).slice(0, 4)));
    }, [city, owmLang]);

    return (
        <div className="owm-card-h mt-1">
            <h4 style={{ margin: "40px 0 12px", color: "white" }}>{t('nextHours')}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {items.map((it, idx) => {
                    const time = new Date(it.dt * 1000).toLocaleTimeString(
                         dateLocale,
                        { hour: "2-digit", minute: "2-digit" }
                    );
                    return (
                        <HourlyItem
                            key={idx}
                            iconCode={it.weather?.[0]?.icon}
                            temp={`${Math.round(it.main?.temp)}°C`}
                            desc={it.weather?.[0]?.description || "—"}
                            time={time}
                        />
                    );
                })}
            </ul>
        </div>
        // <div className="owm-card">
        //     <h4 style={{ margin: "50px 0 8px", color: "white"}}>Ближайшие часы</h4>
        //     <div className="weather-cards" style={{ display: "flex", gap: 25, overflowX: "auto" }}>
        //         {items.map((it, idx) => {
        //             const time = new Date(it.dt * 1000).toLocaleTimeString("ru-RU", {
        //                 hour: "2-digit",
        //                 minute: "2-digit",
        //             });
        //             return (
        //                 <Card
        //                     key={idx}
        //                     icon={<WeatherIcon iconCode={it.weather?.[0]?.icon} size={42} />}
        //                     value={`${Math.round(it.main?.temp)}°C`}
        //                     label={`${time}`}
        //                     description={`${it.weather?.[0]?.description || "—"}`}
        //                 />
        //             );
        //         })}
        //     </div>
        // </div>
    );
};

export default HourlyForecast;

import React, { useEffect, useState } from "react";
import {apiKey, baseUrl} from "../utils/constants.jsx";
import HourlyItem from "./HourlyItem.jsx";
import {useI18n} from "../utils/I18nProvider.jsx"; // используем ту же карточку

function groupByDate(list) {
    const map = new Map();
    list.forEach((item) => {
        const day = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
        if (!map.has(day)) map.set(day, []);
        map.get(day).push(item);
    });
    return Array.from(map.entries()).map(([date, slices]) => ({ date, slices }));
}

const DailyForecast = ({ city, days}) => {
    const { t, owmLang, dateLocale } = useI18n();
    const [daily, setDaily] = useState([]);

    useEffect(() => {
        fetch(
            `${baseUrl}forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${owmLang}`
        )
            .then((res) => res.json())
            .then((data) => {
                const groups = groupByDate(data.list || []);
                const prepared = groups.slice(0, days).map(({ date, slices }) => {
                    const tmin = Math.min(...slices.map((s) => s.main.temp_min));
                    const tmax = Math.max(...slices.map((s) => s.main.temp_max));
                    const chosen = slices.find((s) =>
                        s.dt_txt.includes("12:00:00")
                    ) || slices[0];
                    return {
                        date,
                        tmin: Math.round(tmin),
                        tmax: Math.round(tmax),
                        icon: chosen.weather[0].icon,
                        desc: chosen.weather[0].description,
                    };
                });
                setDaily(prepared);
            });
    }, [city, days, owmLang, dateLocale]);

    return (
        <div className="owm-card">
            <h4 style={{ margin: "20px 0 12px", color: "white" }}>{t("dailyForecast")}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {daily.map((d, idx) => {
                    const dateObj = new Date(d.date + "T00:00:00");
                    const weekday = dateObj.toLocaleDateString(dateLocale, { weekday: "long" });
                    const dayMonth = dateObj.toLocaleDateString(dateLocale, { day: "2-digit", month: "2-digit" });

                    return (
                        <HourlyItem
                            key={idx}
                            iconCode={d.icon}
                            temp={`${d.tmax}° / ${d.tmin}°`}
                            desc={d.desc}
                            time={`${weekday}, ${dayMonth}`}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default DailyForecast;

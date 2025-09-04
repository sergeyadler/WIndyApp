import React from "react";

import HourlyItem from "./HourlyItem.jsx";
import {useI18n} from "../utils/I18nProvider.jsx";
import {useSelector} from "react-redux"; // используем ту же карточку

const pickRepresentative = (slices) => {
    const noon = slices.find((s) => s.dt_txt?.includes("12:00:00"));
    return noon ?? slices[Math.floor(slices.length / 2)] ?? slices[0];
};

const summarizeDay = ({ date, slices }) => {
    let tmax = -Infinity;
    let tmin = Infinity;

    for (const s of slices) {
        const mx = s.main?.temp_max ?? s.main?.temp ?? -Infinity;
        const mn = s.main?.temp_min ?? s.main?.temp ?? Infinity;
        if (mx > tmax) tmax = mx;
        if (mn < tmin) tmin = mn;
    }

    const rep = pickRepresentative(slices);
    const icon = rep?.weather?.[0]?.icon;
    const desc = rep?.weather?.[0]?.description ?? "—";

    return {
        date,
        tmin: Number.isFinite(tmin) ? Math.round(tmin) : null,
        tmax: Number.isFinite(tmax) ? Math.round(tmax) : null,
        icon,
        desc,
    };
};


const DailyForecast = ({ days = 6 }) => {
    const { t, dateLocale } = useI18n();
    const loading = useSelector((s) => s.ui.loading);
    const dailyGroups = useSelector((s) => s.weather.daily) || [];

    if (!dailyGroups.length && loading) {
        return (
            <div className="owm-card">
                <h4 style={{ margin: "20px 0 12px", color: "white" }}>{t("dailyForecast")}</h4>
                <div>Loading…</div>
            </div>
        );
    }

    if (!dailyGroups.length) return null;

    const prepared = dailyGroups.slice(0, days).map(summarizeDay);

    return (
        <div className="owm-card">
            <h4 style={{ margin: "20px 0 12px", color: "white" }}>{t("dailyForecast")}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {prepared.map((d, idx) => {
                    const dateObj = new Date(`${d.date}T00:00:00`);
                    const weekday = dateObj.toLocaleDateString(dateLocale, { weekday: "long" });
                    const dayMonth = dateObj.toLocaleDateString(dateLocale, { day: "2-digit", month: "2-digit" });

                    const tempText = d.tmax != null && d.tmin != null ? `${d.tmax}° / ${d.tmin}°` : "—";

                    return (
                        <HourlyItem
                            key={idx}
                            iconCode={d.icon}
                            temp={tempText}
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

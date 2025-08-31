import React, {useEffect, useState} from 'react';
import {useI18n} from "../utils/I18nProvider.jsx";

const TimeCard = () => {
    const { dateLocale } = useI18n();
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer); // чистим интервал при размонтировании
    }, []);

    const time = now.toLocaleTimeString(dateLocale, {
        hour: "2-digit",
        minute: "2-digit",

    });

    const date = now.toLocaleDateString(dateLocale, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div style={{ textAlign: "right", color: "#fff" }}>
            <h2 style={{ margin: 0, fontSize: "6rem" }}>{time}</h2>
            <p style={{ margin: 0, fontSize: "1.2rem", opacity: 0.8 }}>{date}</p>
        </div>
    );
};

export default TimeCard;
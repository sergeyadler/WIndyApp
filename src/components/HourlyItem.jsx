import React from "react";
import WeatherIcon from "./WeatherIcon.jsx";

const HourlyItem = ({ iconCode, temp, desc, time }) => {
    return (
        <li
            className="hourly-item"
        >
            {/* слева иконка */}
            <div style={{ flex: "0 0 50px", display: "flex", justifyContent: "center" }}>
                <WeatherIcon iconCode={iconCode} size={80} />
            </div>

            {/* температура */}
            <div style={{ flex: "0 0 130px", fontWeight: 700, textAlign: "center" }}>
               <h4>{temp}</h4>
            </div>

            {/* описание */}
            <div style={{ flex: "1", textAlign: "center", opacity: 0.6 }}>
                {desc}
            </div>

            {/* время справа */}
            <div style={{ flex: "0 0 210px", textAlign: "right", opacity: 0.9 }}>
                {time}
            </div>
        </li>
    );
};

export default HourlyItem;

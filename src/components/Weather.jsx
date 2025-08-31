import React from 'react';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import WeatherIcon from "./WeatherIcon.jsx";
import WeatherCards from "./WeatherCards.jsx";
import HourlyForecast from "./HourlyForecast.jsx";

const Weather = ({data, lastUpdated, error}) => {
    if (error) return <p className="error">{error}</p>;
    if (!data) return <p className="infoWeath">Введите город и нажмите кнопку.</p>;

    const {
        name,
        sys,
        weather,
        main,
        wind,
        clouds
    } = data;
    const description = weather?.[0]?.description ?? "—";
    return (
        <div className="infoWeath">
            <div style={{display: "flex", gap: "12px"}}>
                <h1 style={{margin: 0}}>{Math.round(main?.temp)}°C</h1>
                <WeatherIcon iconCode={data?.weather?.[0]?.icon} size={120} alt={data?.weather?.[0]?.description}/>

            </div>
            <h3>
                {name}{sys?.country ? `, ${sys.country} ` : ''}

            </h3>
            <p>{description}</p>


            <WeatherCards main={main} wind={wind} clouds={clouds}/>


            {lastUpdated && (
                <small>Updated: {new Date(lastUpdated).toLocaleTimeString()}</small>
            )}
        </div>
    );
};

export default Weather;
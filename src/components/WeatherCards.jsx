import React from "react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirIcon from "@mui/icons-material/Air";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Card from "./Card.jsx";
import {useI18n} from "../utils/I18nProvider.jsx";

const WeatherCards = ({ main, wind, clouds }) => {
    const { t } = useI18n();
    return (
        <div className="weather-cards">
            <Card
                icon={<ThermostatIcon sx={{ fontSize: 40 }} />}
                value={`${Math.round(main?.feels_like)}°C`}
                label={t("realFeel")}
            />
            <Card
                icon={<WaterDropOutlinedIcon sx={{ fontSize: 40 }} />}
                value={`${main?.humidity}%`}
                label={t("humidity")}
            />
            <Card
                icon={<AirIcon sx={{ fontSize: 40 }} />}
                value={`${wind?.speed?.toFixed?.(1)} m/s`}
                label={t("wind")}
            />
            <Card
                icon={<CloudQueueIcon sx={{ fontSize: 40 }} />}
                value={`${clouds?.all}%`}
                label={t("clouds")}
            />
        </div>
    );
};

export default WeatherCards;

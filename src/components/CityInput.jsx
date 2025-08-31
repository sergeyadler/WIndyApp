import React, {useState} from 'react';
import {apiKey} from "../utils/constants.jsx";
import {useI18n} from "../utils/I18nProvider.jsx";

const CityInput = ({onSubmit, loading}) => {
    const {t, owmLang} = useI18n();
    const [value, setValue] = useState("Berlin");
    const [suggestions, setSuggestions] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value.trim())
        setSuggestions([]);
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (newValue.length >= 3) {
            fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${newValue}&limit=5&appid=${apiKey}&lang=${owmLang}`
            ).then((res) => res.json())
                .then((data) => {
                    setSuggestions(data);
                })
        } else {
            setSuggestions([]);
        }
    }


    return (
        <div className="formWrapper" style={{position: "relative"}}>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       value={value}
                       placeholder={t("enterCity")}
                       onChange={handleChange}
                       autoComplete="off"
                />
                <button type="submit" disabled={loading}> {loading ? "Loading ..." : t("showForecast")}</button>
                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.map((s, idx) => (
                            <li
                                key={idx}
                                style={{
                                    padding: "6px 10px",
                                    cursor: "pointer",

                                }}
                                onClick={() => {
                                    setValue(s.name);
                                    setSuggestions([]);
                                    onSubmit(s.name);
                                }}
                            >
                                {s.name}, {s.country}
                                {s.state ? ` (${s.state})` : ""}
                            </li>
                        ))}
                    </ul>
                )}
            </form>


        </div>
    );
};

export default CityInput;
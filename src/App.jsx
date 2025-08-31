import './App.css'
import Data from "./components/Data.jsx";
import CityInput from "./components/CityInput.jsx";
import {useState} from "react";
import DailyForecast from "./components/DailyForecast.jsx";
import TimeCard from "./components/TimeCard.jsx";
import logo from "./img/logo.svg"
import {useI18n} from "./utils/I18nProvider.jsx";
import LangSwitcher from "./components/LangSwitcher.jsx";


function App() {
    const [city, setCity] = useState("Berlin");
    const [loading, setLoading] = useState(false);
    const {t} = useI18n();

    return (
        <div className="main">
            <header className="topbar">
                <div className="logo"><img  src={logo} alt="logo" width={50}/> {t("appTitle")}</div>


                <CityInput onSubmit={setCity} loading={loading}/>
                <LangSwitcher/>
            </header>

            <div className="content">
                <div className="column left">
                    <Data city={city} setLoading={setLoading}/>
                </div>
                <div className="column right ">
                    <TimeCard/>
                    <DailyForecast city={city} days={6}/>
                </div>
            </div>
        </div>
    )
}

export default App;

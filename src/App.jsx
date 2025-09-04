import './App.css'
import Data from "./components/Data.jsx";
import CityInput from "./components/CityInput.jsx";
import {useEffect} from "react";
import DailyForecast from "./components/DailyForecast.jsx";
import TimeCard from "./components/TimeCard.jsx";
import logo from "./img/logo.svg"
import {useI18n} from "./utils/I18nProvider.jsx";
import LangSwitcher from "./components/LangSwitcher.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCity} from "./actions/windyActions.js";
import {fetchWeather} from "./actions/weatherThunks.js";


function App() {
    const dispatch = useDispatch();
    const city = useSelector(state => state.city);
    const loading = useSelector(state => state.loading) ;
    const {t, owmLang} = useI18n();

    useEffect(() => {
        dispatch(fetchWeather(city,owmLang));
    }, [city, dispatch, owmLang]);
    return (
        <div className="main">
            <header className="topbar">
                <div className="logo"><img  src={logo} alt="logo" width={50}/> {t("appTitle")}</div>


                <CityInput onSubmit={(c)=> dispatch(setCity(c))} loading={loading}/>
                <LangSwitcher/>
            </header>

            <div className="content">
                <div className="column left">
                    <Data />
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

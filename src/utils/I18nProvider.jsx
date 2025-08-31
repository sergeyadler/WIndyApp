import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {DICTS, LOCALES} from "./dicts";

const I18nCtx = createContext({
    lang: "ru",
    setLang: () => {},
    t: (k) => DICTS.ru[k] ?? k,
    owmLang: "ru",
    dateLocale: "ru-RU",
});

export const I18nProvider = ({children, defaultLang="ru"}) => {
    const [lang, setLang] = useState(localStorage.getItem("lang") || defaultLang);

    useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);

    const dict = DICTS[lang] || DICTS.ru;
    const owmLang = LOCALES[lang]?.owm || "en";
    const dateLocale = LOCALES[lang]?.date || "en-GB";

    const t = (key) => dict[key] ?? key;

    const value = useMemo(() => ({ lang, setLang, t, owmLang, dateLocale }), [lang, t, owmLang, dateLocale]);

    return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
};

export const useI18n = () => useContext(I18nCtx);

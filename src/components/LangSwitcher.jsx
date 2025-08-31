import React from "react";
import {useI18n} from "../utils/I18nProvider.jsx";
import {LOCALES} from "../utils/dicts";

const LangSwitcher = () => {
    const {lang, setLang} = useI18n();

    return (
        <div style={{display: "flex", gap: "8px"}}>
            {Object.values(LOCALES).map((l) => {
                const active = l.code === lang;
                return (
                    <button
                        className="langSwitcher"
                        key={l.code}
                        onClick={() => setLang(l.code)}
                        style={{
                            background: active ? "rgba(255,255,255,.15)" : "transparent",
                            fontWeight: active ? "700" : "400",

                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.25)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = active ? "rgba(255,255,255,.15)" : "transparent")}
                    >
                        {l.code.toUpperCase()}
                    </button>
                );
            })}
        </div>
    );
};

export default LangSwitcher;

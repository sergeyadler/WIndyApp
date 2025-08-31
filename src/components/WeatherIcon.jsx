import React from "react";
import unknownIcon from "../img/icons/unknown.png";
import {motion} from "framer-motion";

const icons = import.meta.glob("../img/icons/*.png", {eager: true});
const iconMap = {};

for (const path in icons) {
    const fileName = path.split("/").pop().replace(".png", ""); // "01d"
    iconMap[fileName] = icons[path].default || icons[path];
}

const WeatherIcon = ({iconCode, size, alt}) => {
    // Пытаемся найти точный код, например "01n"
    let src = iconMap[iconCode];

    // Если нет ночной, попробуем дневную ("02n" -> "02d")
    if (!src && typeof iconCode === "string" && iconCode.endsWith("n")) {
        src = iconMap[iconCode.replace("n", "d")];
    }

    // Если всё ещё нет — показываем unknown
    if (!src) {
        return <img src={unknownIcon} alt={alt || "unknown"} width={size} height={size}/>;
    }

    return <motion.img
        key={iconCode}
        src={src}
        alt={alt || iconCode}
        width={size}
        height={size}
        initial={{opacity: 0, scale: 0.5, rotate: -15}}
        animate={{opacity: 1, scale: 1, rotate: 0}}
        transition={{duration: 0.8, ease: "easeOut"}}/>;
};

export default WeatherIcon;
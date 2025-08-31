import React from "react";

const Card = ({ icon, value, label, description }) => {
    return (
        <div
            className="card"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {icon}
            <p>
                <b>{value}</b>
            </p>
            <small>{label}</small>
            <small>{description}</small>
        </div>
    );
};

export default Card;

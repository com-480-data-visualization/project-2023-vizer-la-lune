import React from "react";
import PropTypes from "prop-types";
import "./GlobalMapYearButton.css";

export const GlobalMapYearButton = ( { year, selectedYear, onYearButtonClick } ) => {
    const handleClick = () => {
        onYearButtonClick( year );
        console.log( year );
    };

    return (
        <div className="button-container">
            <button
                className={`global-map-year-button ${year === selectedYear ? "selected" : ""}`}
                onClick={handleClick}
            >
                {year}
            </button>
        </div>
    );
};

GlobalMapYearButton.propTypes = {
    year: PropTypes.number,
    selectedYear: PropTypes.string,
    onYearButtonClick: PropTypes.func,
};
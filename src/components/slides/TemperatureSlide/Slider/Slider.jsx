import React from "react";
import "./Slider.css";
import PropTypes from "prop-types";


export const Slider = ( { minValue, maxValue, callBack } ) => {

    return (
        <div className="slider"> <div>
            <input type="range" name = "temperature" min = {minValue} max={maxValue} onChange={callBack}/>
            <label htmlFor="temperature">Temperature</label>
        </div></div>
    );
};

Slider.propTypes = { minValue: PropTypes.number, maxValue: PropTypes.number, callBack: PropTypes.func };
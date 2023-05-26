import { React, useRef, useEffect, useState } from "react";
import "./Slider.css";
import PropTypes from "prop-types";


export const Slider = ( { minValue, maxValue, callBack, baseValue } ) => {
    const [ temperature, setTemperature ] = useState( baseValue );
    const rangeInput = useRef();
    const currentValueDisplay = useRef();

    useEffect( () => {
        updateRangeWidth();
        updateCurrentValueDisplayPosition();
    }, [ temperature ] );

    const updateRangeWidth = () =>{
        const newWidth = 100 * ( temperature - minValue ) / ( maxValue - minValue );
        rangeInput.current.style.backgroundSize = newWidth + "%";
    };
    const updateCurrentValueDisplayPosition = () => {
        const newPosition = 100 * ( temperature - minValue ) / ( maxValue - minValue );
        console.log( currentValueDisplay.current.style.width );
        currentValueDisplay.current.style.marginLeft = "calc(" + newPosition + "% - 15px)" ;
    };

    const update = ( event ) =>{
        const newTemperature = event.target.value;
        setTemperature( newTemperature );
        callBack( newTemperature );
    };

    return (
        <div className="slider flex"> 
            <div className="slider_core flex">
                <output className="min_value value">{minValue + "°"}</output>
                <input type="range" min = {minValue} max={maxValue} onChange={update} value={temperature} ref={rangeInput}/>
                <output className="max_value value">{maxValue + "°"}</output>
            </div>
            <div className="slider_value_displayer">
                <div ref={currentValueDisplay} className = "current_value value flex">{temperature}</div>
            </div>
        </div>
    );
};

Slider.propTypes = { minValue: PropTypes.number, maxValue: PropTypes.number, callBack: PropTypes.func, baseValue: PropTypes.number };
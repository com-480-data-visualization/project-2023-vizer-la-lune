import { React, useRef, useEffect, useState } from "react";
import "./Slider.css";
import PropTypes from "prop-types";


export const Slider = ( { minValue, maxValue, callBack } ) => {
    const [ temperature, setTemperature ] = useState( 0 );
    const rangeInput = useRef();

    useEffect( () => {
        updateRangeWidth();
    }, [ temperature ] );

    const updateRangeWidth = () =>{
        const newWidth = 100 * ( temperature - minValue ) / ( maxValue - minValue );
        rangeInput.current.style.backgroundSize = newWidth + "%";
    };

    const update = ( event ) =>{
        const newTemperature = event.target.value;
        setTemperature( newTemperature );
        callBack( newTemperature );
    };

    return (
        <div className="slider"> <div>
            <input type="range" name = "temperature" min = {minValue} max={maxValue} onChange={update} value={temperature} ref={rangeInput}/>
            <output id="rangevalue">{temperature}</output>
            <label htmlFor="temperature">Temperature</label>
        </div></div>
    );
};

Slider.propTypes = { minValue: PropTypes.number, maxValue: PropTypes.number, callBack: PropTypes.func };
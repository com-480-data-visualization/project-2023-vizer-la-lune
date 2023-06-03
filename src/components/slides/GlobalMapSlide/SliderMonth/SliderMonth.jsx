import { React, useRef, useEffect, useState } from "react";
import "./SliderMonth.css";
import PropTypes from "prop-types";

const MONTHS = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };
export const SliderMonth = ( { callBack, baseValue } ) => {
    const [ monthAsDigit, setmonthAsDigit ] = useState( baseValue );
    const currentValueDisplay = useRef();

    useEffect( () => {
        updateCurrentValueDisplayPosition();
    }, [ monthAsDigit ] );


    const updateCurrentValueDisplayPosition = () => {
        const newPosition = 100 * ( monthAsDigit - 1 ) / ( 12 - 1 );
        currentValueDisplay.current.style.marginLeft = "calc(" + newPosition + "% - 60px)" ;
    };

    const update = ( event ) =>{
        const newMonthAsDigit = event.target.value;
        setmonthAsDigit( newMonthAsDigit );
        callBack( newMonthAsDigit );
    };

    return (
        <div className="slider_month flex"> 
            <div className="slider_month_core flex">
                <output className="slider_month_min_value slider_month_value">{"January"}</output>
                <input type="range" id ="sliderMonth" min = {1} max={12} onChange={update} value={monthAsDigit}/>
                <output className="slider_month_max_value slider_month_value">{"December"}</output>
            </div>
            <div className="slider_month_value_displayer">
                <div ref={currentValueDisplay} className = "slider_month_current_value slider_month_value flex">{MONTHS[monthAsDigit]}</div>
            </div>
        </div>
    );
};

SliderMonth.propTypes = { callBack: PropTypes.func, baseValue: PropTypes.number };
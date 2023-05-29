import React from "react";
import "./ActiveCounter.css";
import CountUp from "react-countup";
import PropTypes from "prop-types";

export const ActiveCounter = ( { number, title } ) => {

    return (
        <div className="counter">
            <CountUp end={number} delay={0} duration={10} className="number"/>
            <p className="title"> {title} </p>
        </div>    
    );
};

ActiveCounter.propTypes = { number: PropTypes.number, title: PropTypes.string };
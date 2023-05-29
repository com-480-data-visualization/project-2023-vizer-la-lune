import React from "react";
import "./Tooltip.css";
import PropTypes from "prop-types";

export const Tooltip = ( { tooltipId } ) => {

    return (
        <div className="tooltip" id={tooltipId}>{}</div>
    );
};

Tooltip.propTypes = { tooltipId: PropTypes.string };
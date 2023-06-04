import React from "react";
import PropTypes from "prop-types";

export const EventButton = ( { date, toCall } ) => {
    const formattedDate = new Date( date ).toDateString();
    console.log( "yolo" ); 
    return (
        <button className="button" onClick={toCall }>
      Zoom In on {formattedDate } 
        </button>
    );
};

EventButton.propTypes = {
    date: PropTypes.instanceOf( Date ).isRequired, // Validation de la prop "date" en tant qu'instance de Date requise
    toCall: PropTypes.func.isRequired, // Validation de la prop "toCall" en tant que fonction requise
};

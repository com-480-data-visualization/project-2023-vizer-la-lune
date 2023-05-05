import React from "react";
import PropTypes from "prop-types";
import "./App.css";


export const App = ( { aVariableToUseInThisComponent } ) => {
    return (
        <div className="App">
            This is going to be our nice app.
            <br/>
            {aVariableToUseInThisComponent}
        </div>
    );
};

App.propTypes = { aVariableToUseInThisComponent: PropTypes.string };
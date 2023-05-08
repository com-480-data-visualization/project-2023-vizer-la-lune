import React from "react";
import "./Slide.css";
import PropTypes from "prop-types";
export const Slide = ( { title, children } ) => {

    return (
        <div className="section">
            <div className="section_content">
                <div className="slide_title"><h1>{title}</h1></div>
                <div className="slide_content">
                    {children}
                </div>
            </div>
        </div>
    );
};

Slide.propTypes = { title: PropTypes.string, children: PropTypes.element };
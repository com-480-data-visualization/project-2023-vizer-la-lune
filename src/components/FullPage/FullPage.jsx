import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import "./FullPage.css";
import PropTypes from "prop-types";

export const FullPage = ( { slides } ) => {
    const getSlidesAsSections = () => {
        return slides.map( ( slide ) => {
            return <div className="section" key={slide.key}>{slide.content}</div>;
        } );
    };
    const getSectionsTitles = () =>{
        return slides.map( ( component ) => {
            return component.title;} );
    };

    const getSectionsColors = () => {
        return slides.map( ( component ) => {
            return component.color;} );
    };
    return (
        <ReactFullpage
            licenseKey="gplv3-license"
            navigation
            navigationTooltips={getSectionsTitles()}
            navigat
            sectionsColor={getSectionsColors()}
            render={( { state, fullpageApi } ) => {
                return (
                    <div>
                        {getSlidesAsSections()}
                    </div>
                );
            }}
        />
    );
};
FullPage.propTypes = { slides: PropTypes.arrayOf( { key: PropTypes.number, title: PropTypes.string, color: PropTypes.string, content: PropTypes.component } ) };

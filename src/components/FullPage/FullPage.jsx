import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import PropTypes from "prop-types";

export const FullPage = ( { slides } ) => {
    const getSlidesContent = () => {
        return slides.map( ( slide ) => {
            return slide.content;
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
            render={() => {
                return (
                    <div>
                        {getSlidesContent()}
                    </div>
                );
            }}
        />
    );
};
FullPage.propTypes = { slides: PropTypes.arrayOf( { key: PropTypes.number, title: PropTypes.string, color: PropTypes.string, content: PropTypes.component } ) };

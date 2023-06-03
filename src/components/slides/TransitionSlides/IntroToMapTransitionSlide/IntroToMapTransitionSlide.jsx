import React from "react";
import "./IntroToMapTransitionSlide.css";
import { Slide } from "../../Slide/Slide";
export const IntroToMapTransitionSlide = () => {

    return (
        <Slide title="Transition 1">
            <div className="transition_content">
                <div className="transition_text">
                    <p>The first question we asked ourselves concerned the spatial distribution of emergency calls: Are there more calls of a certain type in certain places? For example, are there more emergency calls for road accidents next to a motorway?<br/> 
            On the following page, you can look at the number of calls for each postcode and filter by date or type of call.
                    </p>
                </div>
            </div>
        </Slide>
    );
};
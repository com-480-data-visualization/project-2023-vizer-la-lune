import React from "react";
import "./IntroToMapTransitionSlide.css";
import { Slide } from "../../Slide/Slide";
export const IntroToMapTransitionSlide = () => {

    return (
        <Slide title="Visualizing hotspots to 911 calls in Montgomery County, PA">
            <div className="transition_content">
                <div className="transition_text">
                    <p><span className="bold">Are there regions within the Montgomery County where there are more
                    911 calls ?</span><br/>
                    This is the first question we asked ourselves.
                    We were curious about the spatial distribution of emergency calls. <br/>
                    For example, are there more calls of a certain type in certain places? 
                    Are there more emergency calls for road accidents next to a motorway?<br/> 
                    To answer this question, we have created a map of the county with the number of calls per postcode.
            You can discover the map on the following page, where we plotted a map of the Montgomery County, PA.<br/>
            You can look at the number of calls for each postcode and filter by the time (year and month), type of call or the township.
                    </p>
                </div>
            </div>
        </Slide>
    );
};
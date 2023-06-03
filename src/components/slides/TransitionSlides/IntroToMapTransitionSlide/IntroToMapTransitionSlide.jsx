import React from "react";
import "./IntroToMapTransitionSlide.css";
import { Slide } from "../../Slide/Slide";
export const IntroToMapTransitionSlide = () => {

    return (
        <Slide title="Impact of the geographical location on the number of 911 calls">
            <div className="transition_content">
                <div className="transition_text">
                    <p><span className="bold">Are there regions within the Montgomery County where there are more
                    911 calls ?</span><br/>
                    This is the first question we asked ourselves.
                    We were curious about the spatial distribution of emergency calls. <br/>
                    For example, are there more calls of a certain type in certain places? <br/>
                    You will see that the <span className="bold"> Pottstown township </span> is particularly affected by the calls for the majority of the type of accidents.
                    It is not that surprising since it is the biggest township in term of population density, after Norristown.<br/>
                    Are there more emergency calls for road accidents next to a motorway?<br/> 
                    To answer these questions, we have created a map of the county with the number of calls per postcode.
            You can discover the map on the following page, where we plotted a map of the Montgomery County, PA.<br/>
            You can look at the number of calls for each postcode and filter by the time (year and month), type of call or the township.
                    </p>
                </div>
            </div>
        </Slide>
    );
};
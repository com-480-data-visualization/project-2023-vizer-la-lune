import React from "react";
import "./EventToTemperatureTransitionSlide.css";
import { Slide } from "../../Slide/Slide";
export const EventToTemperatureTransitionSlide = () => {

    return (
        <Slide title="Impact of temperature on the 911 calls">
            <div className="transition_content">
                <div className="transition_text">
                    <p>
                        <span className="bold">{"\""}When it{"'"}s very cold, it freezes, so people are more likely to have road accidents{"\""}. </span> <br/>
                        This sentence seems quite logical, so we wanted to see if this was really the case in practice. To analyse this, we looked at the temperature in Montgomery County every day at every hour of the day. We then associated each emergency call with the temperature at the time of the call.<br/> 
                        It is funny to see that, in practice, our first sentence comes true: for all sub-zero temperatures (apart from -10°C), the majority of calls concern vehicles involved in accidents... <br/>
                        Have fun looking at the majority of calls for each temperature. In the graph, we only display the 10 types of call with the most occurrences so as not to overload with hundreds of bars (there are almost 200 types of emergency call referenced in our dataset, that{"'"}s a lot, don{"'"}t you think? ) 
                    </p>
                </div>
            </div>
        </Slide>
    );
};
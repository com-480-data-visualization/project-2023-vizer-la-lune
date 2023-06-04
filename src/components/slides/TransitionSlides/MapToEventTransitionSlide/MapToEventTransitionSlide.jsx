import React from "react";
import "./MapToEventTransitionSlide.css";
import { Slide } from "../../Slide/Slide";
export const MapToEventTransitionSlide = () => {

    return (
        <Slide title="Impact of events on 911 calls">
            <div className="transition_content">
                <div className="transition_text">
                    <p>Our second question concerns the impact of certain events on emergency calls. <br/>
                        <span className= "bold"> Are there more 911 calls if a big event is taking place in the county ? </span><br/>
                        For example, are there more car accidents during a natural catastrophy? Can we visualize a decrease of 911 calls during the pandemic ? <br/>
                        In the next page, you will find a chart of the type of accident (EMS, Fire, Traffic) over a period of time.
                        You can also filter by the type of event (natural catastrophy, Covid-19, etc.) to visualize the impact of the event on the number of calls.
                    </p>
                </div>
            </div>
        </Slide>
    );
};
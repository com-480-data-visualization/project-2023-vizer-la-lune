import React from "react";
import ReactDOM from "react-dom/client";
import { FullPage } from "./components/FullPage/FullPage";
import { IntroductionSlide } from "./components/slides/IntroductionSlide/IntroductionSlide";
import { GlobalMapSlide } from "./components/slides/GlobalMapSlide/GlobalMapSlide";
import { EventSlide } from "./components/slides/EventSlide/EventSlide";
import { TemperatureSlide } from "./components/slides/TemperatureSlide/TemperatureSlide";
import "./index.css";
import { IntroToMapTransitionSlide } from "./components/slides/TransitionSlides/IntroToMapTransitionSlide/IntroToMapTransitionSlide";
import { MapToEventTransitionSlide } from "./components/slides/TransitionSlides/MapToEventTransitionSlide/MapToEventTransitionSlide";
import { EventToTemperatureTransitionSlide } from "./components/slides/TransitionSlides/EventToTemperatureTransitionSlide/EventToTemperatureTransitionSlide";

const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(
    <React.StrictMode>
        <FullPage slides={[ 
            { "title": "Intro", "color": "#000000", "content": <IntroductionSlide /> },
            { "title": "Transition Map", "color": "#F0F8FF", "content": <IntroToMapTransitionSlide /> },
            { "title": "Map", "color": "#F0F8FF", "content": <GlobalMapSlide/> },
            { "title": "Transition Event", "color": "#F0F8FF", "content": <MapToEventTransitionSlide /> },
            { "title": "Events", "color": "#F0F8FF", "content": <EventSlide/> },
            { "title": "Transition Temperature", "color": "#F0F8FF", "content": <EventToTemperatureTransitionSlide /> },
            { "title": "Temperature", "color": "#F0F8FF", "content": <TemperatureSlide/> },
        ]}/>
    </React.StrictMode>,
);
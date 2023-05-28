import React from "react";
import ReactDOM from "react-dom/client";
import { FullPage } from "./components/FullPage/FullPage";
import { IntroductionSlide } from "./components/slides/IntroductionSlide/IntroductionSlide";
import { GlobalMapSlide } from "./components/slides/GlobalMapSlide/GlobalMapSlide";
import { EventSlide } from "./components/slides/EventSlide/EventSlide";
import { TemperatureSlide } from "./components/slides/TemperatureSlide/TemperatureSlide";
import "./index.css";

const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(
    <React.StrictMode>
        <FullPage slides={[ { "title": "Page 1", "color": "#F0F8FF", "content": <IntroductionSlide /> }, { "title": "Page 2", "color": "#F0F8FF", "content": <GlobalMapSlide/> }, { "title": "Page 3", "color": "#F0F8FF", "content": <EventSlide/> }, { "title": "Page 4", "color": "F0F8FF", "content": <TemperatureSlide/> } ]}/>
    </React.StrictMode>,
);
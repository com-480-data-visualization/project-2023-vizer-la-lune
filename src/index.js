import React from "react";
import ReactDOM from "react-dom/client";
import { FullPage } from "./components/FullPage/FullPage";
import { IntroductionSlide } from "./components/slides/IntroductionSlide/IntroductionSlide";
import { GlobalMapSlide } from "./components/slides/GlobalMapSlide/GlobalMapSlide";
import { EventSlide } from "./components/slides/EventSlide/EventSlide";
import { TemperatureSlide } from "./components/slides/TemperatureSlide/TemperatureSlide";

const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(
    <React.StrictMode>
        <FullPage slides={[ { "title": "Page 1", "color": "#7fff00", "content": <IntroductionSlide /> }, { "title": "Page 2", "color": "#7fff00", "content": <GlobalMapSlide/> }, { "title": "Page 3", "color": "#7fff00", "content": <EventSlide/> }, { "title": "Page 4", "color": "#7fff00", "content": <TemperatureSlide/> } ]}/>
    </React.StrictMode>,
);
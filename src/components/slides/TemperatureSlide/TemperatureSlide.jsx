import { React, useEffect, useState } from "react";
import Papa from "papaparse";
import "./TemperatureSlide.css";
import callsPerTemperaturePerTitle from "../../../data/data_per_temperature/calls_per_title_per_temperature.csv";
import { CallsPerTemperatureChart } from "./CallsPerTemperatureChart/CallsPerTemperatureChart";
import { Slide } from "../Slide/Slide";
import { Slider } from "./Slider/Slider";

const MIN_TEMPERATURE = -11;
const MAX_TEMPERATURE = 37;

export const TemperatureSlide = () => {
    const [ data, setData ] = useState( [] );
    const [ dataToDisplay, setDataToDisplay ] = useState( [] );
    
    useEffect( ( ) => {
        Papa.parse( callsPerTemperaturePerTitle, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: ( results ) => { setData( results.data );setFirstDataForDisplay(); },
        } );
    }, [] );

    const setFirstDataForDisplay = () => {
        const baseData = data.slice( 1, 10 ).map( ( piece ) => {return { "temperature": parseInt( piece.temperature ), "title": piece.title, "calls_count": parseInt( piece.calls_count ) };} );
        setDataToDisplay( baseData );
    };
    const changeData = ( event ) =>{
        const temperature = event.target.value;
        const temperatureData = data
            .filter( d => parseInt( d.temperature ) == temperature )
            .map( ( piece ) => {return { "temperature": parseInt( piece.temperature ), "title": piece.title, "calls_count": parseInt( piece.calls_count ) };} )
            .sort( ( d1, d2 ) => ( d1.calls_count - d2.calls_count ) )
            .reverse();
        setDataToDisplay( temperatureData.slice( 1, 10 ) );
    };
    return (
        <Slide title="Temperature Slide">
            <div className="temperature_slide_content">
                <CallsPerTemperatureChart data={dataToDisplay} />
                <Slider minValue={MIN_TEMPERATURE} maxValue={MAX_TEMPERATURE} callBack={changeData} />
            </div>
        </Slide>
    );
};
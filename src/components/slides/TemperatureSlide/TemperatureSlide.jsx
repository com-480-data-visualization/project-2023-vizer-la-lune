import { React, useEffect, useState } from "react";
import Papa from "papaparse";
import "./TemperatureSlide.css";
import callsPerTemperaturePerTitle from "../../../data/data_per_temperature/calls_per_title_per_temperature.csv";
import { CallsPerTemperatureChart } from "./CallsPerTemperatureChart/CallsPerTemperatureChart";
import { Slide } from "../Slide/Slide";

export const TemperatureSlide = () => {
    const [ data, setData ] = useState( [] );

    
    useEffect( ( ) => {
        Papa.parse( callsPerTemperaturePerTitle, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: ( results ) => { setData( results.data ); },
          
        } );
    }, [] );

    const getDataForDisplay = () => {
        //Logic to get good data must be dealt with here in future
        return data.slice( 1, 10 ).map( ( piece ) => {return { "temperature": parseInt( piece.temperature ), "title": piece.title, "calls_count": parseInt( piece.calls_count ) };} );
    };
    
    return (
        <Slide title="Temperature Slide">
            <CallsPerTemperatureChart data={getDataForDisplay()} />
        </Slide>
    );
};
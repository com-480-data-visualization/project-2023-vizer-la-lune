import { React, useEffect, useState } from "react";
import Papa from "papaparse";
import "./TemperatureSlide.css";
import callsPerTemperaturePerTitle from "../../../data/data_per_temperature/calls_per_title_per_temperature.csv";
import { CallsPerTemperatureChart } from "./CallsPerTemperatureChart/CallsPerTemperatureChart";

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
        console.log( data.slice( 1, 10 ) );
        return data.slice( 1, 10 ).map( ( piece, index ) => {return { "temperature": parseInt( piece.temperature ), "title": index, "calls_count": parseInt( piece.calls_count ) };} );
    };

    //Logic to get good data must be dealt with here

    return (
        <div className="section">
            <h3>Temperature Slide</h3>
            <CallsPerTemperatureChart data = {getDataForDisplay()}/>
        </div>
    );
};
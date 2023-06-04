import { React, useEffect, useState } from "react";
import Papa from "papaparse";
import "./EventSlide.css";
import { Slide } from "../Slide/Slide";
import { EventChart } from "./EventChart/EventChart";
import callsPerEvent from "../../../data/data_per_event/calls_per_day_per_type.csv";

export const EventSlide = () => {
    const [ data, setData ] = useState( [] );

    useEffect( ( ) => {
   
        Papa.parse( callsPerEvent, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: ( results ) => { setData( results.data ); },
            
        } );
    }, [] );

    const getDataForDisplay = () => {
        const dataToDisplay = data.slice( 1, 10 ).map( ( piece ) => {return { "date": new Date( piece.timeStamp ), "EMS": parseInt( piece.EMS ), "Fire": parseInt( piece.Fire ), "Traffic": parseInt( piece.Traffic ) };} );
        return dataToDisplay;
    };

    return (
        <Slide title= "Event Chart">
            <div className="temporary_content"><EventChart data = { getDataForDisplay() }/></div></Slide>
    );
};



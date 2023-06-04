import { React, useEffect, useState } from "react";
import Papa from "papaparse";
import "./EventSlide.css";
import { Slide } from "../Slide/Slide";
import { EventChart } from "./EventChart/EventChart";
import callsPerEvent from "../../../data/data_per_event/calls_per_day_per_type.csv"; 
import { EventButton } from "./EventButtons/EventButton";

export const EventSlide = () => {
    const [ data, setData ] = useState( [] );
    const [ centerDate, setCenterDate ] = useState( new Date( "2016-02-07" ) );
    const [ updatedData, setUpdatedData ] = useState( [] );
    console.log( centerDate );

    const handleZoomIn = () => {
        const zoomWindowStartDate = new Date( centerDate );
        zoomWindowStartDate.setDate( zoomWindowStartDate.getDate() - 14 );
        const zoomWindowEndDate = new Date( centerDate );
        zoomWindowEndDate.setDate( zoomWindowEndDate.getDate() + 14 );
        console.log( zoomWindowEndDate );
        console.log( zoomWindowStartDate );
        const zoomedData = data.filter( ( d ) => {
            const currentDate = new Date( d.date );
            return (
                zoomWindowStartDate >= zoomWindowStartDate && currentDate <= zoomWindowEndDate
            );
        } );
        console.log( zoomedData );
    
        setUpdatedData( zoomedData );
    };
    useEffect( ( ) => {
   
        Papa.parse( callsPerEvent, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: ( results ) => { setData( results.data ); },
            
        } );
    }, [] );

    const getDataForDisplay = () => {
        const dataToDisplay = data.map( ( piece ) => {return { "date": new Date( piece.timeStamp ), "EMS": parseInt( piece.EMS ), "Fire": parseInt( piece.Fire ), "Traffic": parseInt( piece.Traffic ) };} );
        return dataToDisplay;
    };

    return (
        <Slide title= "Event Chart">
            <div className="temporary_content"><EventChart data = { getDataForDisplay() }/></div></Slide>
    );
};



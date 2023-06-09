import { React, useEffect, useState } from "react";
import Papa from "papaparse";
import "./EventSlide.css";
import { Slide } from "../Slide/Slide";
import { EventChart } from "./EventChart/EventChart";
import callsPerDayPerType from "../../../data/data_for_introduction/calls_per_type_per_date.csv"; 

export const EventSlide = () => {
    const [ data, setData ] = useState( [] );
    const [ dataToDisplay, setDataToDisplay ] = useState( [] );
    const [ leftDate, setLeftDate ] = useState( new Date( "2016-02-07" ) ); 
    const [ rightDate, setRightDate ] = useState( new Date( "2016-08-01" ) ); 
    const [ centerDate, setCenterDate ] = useState( new Date( "2016-02-21" ) );
      
    const handleDateChange = ( event ) => {
        const newCenterDate = new Date( event.target.value );
        setCenterDate( new Date( event.target.value ) );
        const newLeftDate = new Date( newCenterDate.getTime() );
        newLeftDate.setDate( newLeftDate.getDate() - 7 );
        setLeftDate( newLeftDate );
        const newCenterDate2 = new Date( event.target.value );
        const newRightDate = new Date( newCenterDate2.getTime() );
        newRightDate.setDate( newRightDate.getDate() + 7 );
        setRightDate( newRightDate );
    };

    const formatDate = ( date ) => {
        if ( date ){
            const year = date.getFullYear();
            const month = String( date.getMonth() + 1 ).padStart( 2, "0" );
            const day = String( date.getDate() ).padStart( 2, "0" );
            return `${year}-${month}-${day}`;
        }
        return "2016-098-07";
    };
      

    useEffect( () => {
        Papa.parse( callsPerDayPerType, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: ( results ) => {
                const dataClean = results.data;
                const var2 = dataClean.reduce( ( group, d ) => {
                    const { timeStamp } = d;
                    group[timeStamp] = group[timeStamp] ?? [];
                    group[timeStamp].push( d );
                    return group;
                }, {} );
                const cleanData = Object.entries( var2 ).map( d => {
                    return { "date": new Date( d[0] ), "EMS": d[1][0]["calls_count"], "Fire": d[1][1]["calls_count"], "Traffic": d[1][2]["calls_count"] };
                } );
                setData( cleanData );
            },
        } );
    }, [] );
    useEffect( () => {
        if ( data !== [] ){
            setDataToDisplay( getDataForDisplay( ) );
        }

    }, [ data ] );

    useEffect( () => {
        setDataToDisplay( getDataForDisplay( ) ); 
    }, [ leftDate, rightDate ] );

    const handleZoomIn = ( date ) => {
        setCenterDate( date );
        const newLeftDate = new Date( date.getTime() );
        newLeftDate.setDate( newLeftDate.getDate() - 7 );
        setLeftDate( newLeftDate );
        const newRightDate = new Date( date.getTime() );
        newRightDate.setDate( newRightDate.getDate() + 7 );
        setRightDate( newRightDate );
  
    };

    const getDataForDisplay = () => {
        const dataInTimeFrame = data.filter( ( d ) => {
            const dataDate = d.date;
            const isDateMatchingTimeFrame = leftDate <= dataDate && dataDate <= rightDate;
            return isDateMatchingTimeFrame;
        } );
        return ( dataInTimeFrame.map( ( piece ) => {return { "date": piece.date, "EMS": parseInt( piece.EMS ), "Fire": parseInt( piece.Fire ), "Traffic": parseInt( piece.Traffic ) };} ) );
    };

    return (
        <Slide title= "Event Slide">
            <div className="temporary_content">
                <EventChart data={dataToDisplay} />
                <div className="controls">
                    <div className="buttons">
                        <button onClick = {()=>{handleZoomIn( new Date( "2018-03-04" ) );}}> Natural disaster (storm)</button>
                        <button onClick = {()=>{handleZoomIn( new Date( "2018-01-01" ) );}}> New year</button>
                        <button onClick = {()=>{handleZoomIn( new Date( "2017-02-05" ) );}}> SuperBowl 2017)</button>
                    </div>
                    <input type="date" value={ formatDate( centerDate ) } onChange={handleDateChange} min ="2016-01-01" max ="2020-06-01" />
                </div>
                
            </div></Slide>
    );
};



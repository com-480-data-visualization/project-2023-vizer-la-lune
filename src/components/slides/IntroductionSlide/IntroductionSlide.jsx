import { React, useState, useEffect } from "react";
import "./IntroductionSlide.css";
import Papa from "papaparse";
import callsPerTypePerDate from "../../../data/data_for_introduction/calls_per_type_per_date.csv";
import { ActiveCounter } from "./ActiveCounter/ActiveCounter";
import moment from "moment";
import YouTube from "react-youtube";

export const IntroductionSlide = () => {
    const [ data, setData ] = useState( [] );
    const [ emsCalls, setEmsCalls ] = useState( 0 );
    const [ fireCalls, setFireCalls ] = useState( 0 );
    const [ trafficCalls, setTrafficCalls ] = useState( 0 );
    const today = moment();

    useEffect( ( ) => {
        Papa.parse( callsPerTypePerDate, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: ( results ) => { setData( results.data );},
        } );
    }, [] );

    useEffect( () =>{
        const [ ems, fire, traffic ] = getDataForTodayDate();
        setEmsCalls( ems );
        setFireCalls( fire );
        setTrafficCalls( traffic );
    }, [ data ] );

    const getAverageNumberOfCallsForTypeForToday = ( type, todayData ) => {
        const onlyDataForType = todayData.filter( d => {return d.title == type;} );
        const averageNumber = parseInt( onlyDataForType.map( d => parseInt( d.calls_count ) ).reduce( ( total, newVal ) => {return total + newVal;} ) / onlyDataForType.length );
        return averageNumber;
    };

    const getDataForTodayDate = () => {
        const todayMonthAndDay = today.format( "MM-DD" );
        console.log( todayMonthAndDay );
        const onlyDataCorrespondingToToday = data.filter( d => {return d.timeStamp.substr( 5 ) == todayMonthAndDay ;} );

        if ( onlyDataCorrespondingToToday.length == 0 ){
            return ( [ 0, 0, 0 ] );
        }

        const averageNumberOfEMS = getAverageNumberOfCallsForTypeForToday( "EMS", onlyDataCorrespondingToToday );
        const averageNumberOfFire = getAverageNumberOfCallsForTypeForToday( "Fire", onlyDataCorrespondingToToday );
        const averageNumberOfTraffic = getAverageNumberOfCallsForTypeForToday( "Traffic", onlyDataCorrespondingToToday );
        return ( [ averageNumberOfEMS, averageNumberOfFire, averageNumberOfTraffic ] ); 

    };

    return (
        <div className="section">
            <div style = {{ "height": "97vh" }}>
                <YouTube
                    videoId="4r0tQJrPNoI"
                    style={{ height: "95%", width: "100%" }}
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            autoplay: 1,
                            start: 32,
                            end: 60,
                            loop: 1,
                            playlist: "4r0tQJrPNoI",
                            controls: 0,
                            mute: 1
                        }
                    }}                   
                />
                <div className="introduction_slide_content">
                    <h1 className="introduction_title">911 Calls - Demystified</h1>
                    <div className="introduction_text">
                        <p><span className="bold">{"\""}911 call handling centre, what is your emergency?{"\""}</span> This phrase is uttered tens of thousands of times every day. As soon as we have a major problem, our first reflex should be to call for help.<br/>
                         But have you ever wondered about these calls? What is the main cause of the calls? Are there certain days when there are more calls than others? etc...<br/>
                        We have, and that{"'"}s why with this Data Visualisation project we want to offer <span className="bold">a different perspective on emergency calls</span>. Unfortunately, data on these calls is still relatively scarce. We therefore focused on a dataset available on the Internet: 911 calls in Montgomery County in the United States. All the data you will find here concerns this county over the period 2016-2020. </p>
                        <p>Ready to find out more? Then slide over to the next page with your mouse or trackpad to start discovering!</p>

                    </div>
                    <div className="introduction_stats">
                        <p className="stats_catch_phrase"> On {today.format( "MMM Do" )}, on average, there are </p>
                        <div className="counters">
                            <ActiveCounter number={emsCalls} title="Health Emergencies"/>
                            <ActiveCounter number={fireCalls} title="Fire Emergencies"/>
                            <ActiveCounter number={trafficCalls} title="Traffic Emergencies"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
                    <p className="introduction_text"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc</p>
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

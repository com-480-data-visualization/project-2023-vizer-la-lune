import React from "react";
import { useD3 } from "../../../../hook/useD3";
import * as d3 from "d3";
import "./EventChart.css";
import PropTypes from "prop-types";
import _ from "lodash";
import { Tooltip } from "../../../Tooltip/Tooltip";
import { fillAndDisplayTootlip, hideTooltip } from "./utils.js";
import { EventButton } from "../EventButtons/EventButton";

const COLOR_PER_CALL_TYPE = { "Fire": "#FF9933", "Traffic": "#9B9B9B", "EMS": "#B0E7F5" };
const EVENT_TYPE = [ "Fire", "EMS", "Traffic" ];


export const EventChart = ( { data, centerDate } ) => {
    const dates = data.map( d => d.date );

    const height = 500;
    const width = 1150;
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };

    const cleanPage = ( svg ) => {
        svg.selectAll( "*" ).remove();
    };
    const createHorizontalAxis = ( svg ) =>{
        var x = d3
            .scaleTime()
            .domain( d3.extent( data, ( d ) => { return d.date; } ) )
            .range( [ 0, width - margin.left ] );
        svg.append( "g" )
            .call( d3.axisBottom( x ).tickFormat( d3.timeFormat( "%Y-%m-%d" ) ) )
            .attr( "transform", "translate(" + margin.left + "," + ( height + height / 20 ) + ")" )
            .selectAll( "text" );
        return x;
    };
    const createVerticalAxis = ( svg ) => {
        var y = d3
            .scaleLinear()
            .domain( [ 0, d3.max( data, ( d ) => d.Traffic ) ] )
            .rangeRound( [ height, margin.top ] );
        
        svg.append( "g" )
            .call( d3.axisLeft( y ) )
            .attr( "transform", "translate(" + margin.left + "," + height / 20 + ")" );
        return y; 
    };

    const computeSlopeCoefficient = ( yLeft, yRight, xLeft, xRight ) => {
        const coefficients = {};
        EVENT_TYPE.forEach( ( eventType ) => {
            coefficients[eventType] = ( yRight[eventType] - yLeft[eventType] ) / ( xRight - xLeft );
            
        } );
        return coefficients;
    };

    const moveTooltips = ( x, dataValues, dataPoint, mouseActions ) => {
        EVENT_TYPE.forEach( ( eventType ) => {
            const positionForEvent = [ x, dataPoint[eventType] ];

            mouseActions[eventType]["mouseOver"]( dataValues[eventType], eventType, positionForEvent );
        } );
        const datePosition = [ x, 150 ];
        mouseActions["date"]["mouseOver"]( dataValues["date"], "date", datePosition );

    };
    
    const clearTooltips = ( mouseActions ) => {
        EVENT_TYPE.forEach( ( eventType ) => {
            mouseActions[eventType]["mouseLeave"]();
        } );
        mouseActions["date"]["mouseLeave"]();
        d3.selectAll( "line" ).remove();

    };

    const createMouseActions = ( tooltip ) => {
        return {
            "mouseOver": ( data, type, position ) => {
                fillAndDisplayTootlip( tooltip, data, type, position );
            },
            "mouseLeave": ( ) =>{
                hideTooltip( tooltip );
            }
        };
    };


    const plotDataLine = ( svg, x, y, mouseActions, type ) => {
        const displayTooltips = ( event ) => {
            const dateOfData = x.invert( d3.pointer( event )[0] );
            const indexOfRightClosestDataPoint = d3.bisectLeft( dates, dateOfData );
            const valuesOfRightClosestDataPoint = data[indexOfRightClosestDataPoint];
            const dataValues = _.pick( valuesOfRightClosestDataPoint, [ ...EVENT_TYPE, "date" ] );
            const rightDataPositions = {
                "Fire": y( dataValues["Fire"] ),
                "Traffic": y( dataValues["Traffic"] ),
                "EMS": y( dataValues["EMS"] ) 
            };
            var dataPositionToDisplay = rightDataPositions;
            if ( indexOfRightClosestDataPoint > 0 ){
                const valuesOfLeftClosestDataPoint = data[indexOfRightClosestDataPoint - 1];
                const leftDataPositions = { 
                    "Fire": y( valuesOfLeftClosestDataPoint["Fire"] ),
                    "Traffic": y( valuesOfLeftClosestDataPoint["Traffic"] ),
                    "EMS": y( valuesOfLeftClosestDataPoint["EMS"] ) 
                };
                const dateLeft = valuesOfLeftClosestDataPoint["date"];
                const dateRight = valuesOfRightClosestDataPoint["date"];
                const slopeCoeffs = computeSlopeCoefficient( leftDataPositions, rightDataPositions, dateLeft, dateRight );
                const correctedDataPositions = {};
                EVENT_TYPE.forEach( ( eventType ) => {
                    correctedDataPositions[eventType] = leftDataPositions[eventType] + slopeCoeffs[eventType] * ( d3.pointer( event )[0] - x( dateLeft ) );
                    
                } );
                dataPositionToDisplay = correctedDataPositions;
            }
            const minValue = d3.min( EVENT_TYPE.map( eventType => dataPositionToDisplay[eventType] ) );
            svg.append( "line" )
                .attr( "x1", d3.pointer( event )[0] + 60 )
                .attr( "y1", y( 0 ) + 26 )
                .attr( "x2", d3.pointer( event )[0] + 60 )
                .attr( "y2", minValue )
                .attr( "stroke", "black" )
                .attr( "stroke-dasharray", 5, 5 );
            moveTooltips( d3.pointer( event )[0] + 60, dataValues, dataPositionToDisplay, mouseActions );
        };

        svg.append( "path" )
            .datum( data )
            .attr( "fill", "none" )
            .attr( "stroke", COLOR_PER_CALL_TYPE[type] )
            .attr( "stroke-width", 5 )
            .attr( "transform", "translate(" + margin.left + ", 0)" )
            .attr( "d", d3.line().x( ( d ) => x( d.date ) ).y( ( d ) => y( d[type] ) ) )
            .on( "mouseover", ( event ) => displayTooltips( event ) )
            .on( "mouseleave", ( ) => clearTooltips( mouseActions ) );

    };

    
    const plotDataLines = ( svg, x, y, mouseActions ) => {
        plotDataLine( svg, x, y, mouseActions, "Fire" );
        plotDataLine( svg, x, y, mouseActions, "Traffic" );
        plotDataLine( svg, x, y, mouseActions, "EMS" );
    };

    const plotLegend = ( svg ) => {
        svg.append( "circle" ).attr( "cx", 1000 ).attr( "cy", 460 ).attr( "r", 6 ).style( "fill", COLOR_PER_CALL_TYPE["Fire"] );
        svg.append( "text" ).attr( "x", 1020 ).attr( "y", 460 ).text( "Fire" ).style( "font-size", "15px" ).attr( "alignment-baseline", "middle" );
        svg.append( "circle" ).attr( "cx", 1000 ).attr( "cy", 480 ).attr( "r", 6 ).style( "fill", COLOR_PER_CALL_TYPE["Traffic"] );
        svg.append( "text" ).attr( "x", 1020 ).attr( "y", 480 ).text( "Traffic" ).style( "font-size", "15px" ).attr( "alignment-baseline", "middle" );
        svg.append( "circle" ).attr( "cx", 1000 ).attr( "cy", 500 ).attr( "r", 6 ).style( "fill", COLOR_PER_CALL_TYPE["EMS"] );
        svg.append( "text" ).attr( "x", 1020 ).attr( "y", 500 ).text( "EMS" ).style( "font-size", "15px" ).attr( "alignment-baseline", "middle" );
    };

    const ref = useD3(
        ( svg ) => {
            cleanPage( svg );
            const x = createHorizontalAxis( svg );
            const y = createVerticalAxis( svg );
            const tooltipFire = d3.select( "#Fire_tooltip" );
            const tooltipEMS = d3.select( "#EMS_tooltip" );
            const tooltipTraffic = d3.select( "#Traffic_tooltip" );
            const tooltipDate = d3.select( "#date_tooltip" );
            const fireMouseActions = createMouseActions( tooltipFire );
            const emsMouseActions = createMouseActions( tooltipEMS );
            const trafficMouseActions = createMouseActions( tooltipTraffic );
            const dateMouseActions = createMouseActions( tooltipDate );
            const mouseActions = { "Fire": fireMouseActions, "Traffic": trafficMouseActions, "EMS": emsMouseActions, "date": dateMouseActions };
            plotDataLines( svg, x, y, mouseActions );
            plotLegend( svg );
        },
        [ data ]
    );

    return (
        <div className="chart">
            <div className="chart_content">
                <svg
                    ref={ref}
                    style={{
                        height: "100%",
                        width: "100%",
                        marginRight: "auto",
                        marginLeft: "auto",
                    }}
                >
                    <g className="plot-area" />
                </svg>
            </div>  
            <Tooltip tooltipId={"EMS_tooltip"} className="tooltip_event_chart"></Tooltip> 
            <Tooltip tooltipId={"Fire_tooltip"} className="tooltip_event_chart"></Tooltip>
            <Tooltip tooltipId={"Traffic_tooltip"} className="tooltip_event_chart"></Tooltip>
            <Tooltip tooltipId={"date_tooltip"} className="tooltip_event_chart"></Tooltip>
        </div>
    );
};

EventChart.propTypes = { data: PropTypes.arrayOf( PropTypes.shape( { "date": PropTypes.instanceOf( Date ), "EMS": PropTypes.number, "Fire": PropTypes.number, "Traffic": PropTypes.number } ) ), centerDate: PropTypes.instanceOf( Date ) };

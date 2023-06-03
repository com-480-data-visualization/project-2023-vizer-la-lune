import React from "react";
import { useD3 } from "../../../../hook/useD3";
import * as d3 from "d3";
import "./EventChart.css";
import PropTypes from "prop-types";
import { Tooltip } from "../../../Tooltip/Tooltip";
import { fillAndDisplayTootlip, moveTooltip, hideTooltip } from "./utils.js";

const COLOR_PER_CALL_TYPE = [ "#FF9933", "#9B9B9B", "#B0E7F5" ];


export const EventChart = ( { data } ) => {
    

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


    const createMouseActions = ( tooltip ) => {
        return {
            "mouseOver": ( event, data ) => {
                fillAndDisplayTootlip( tooltip, data );
            },
            "mouseMove": ( event ) =>{
                moveTooltip( tooltip, event, window.innerWidth );
            },
            "mouseLeave": ( ) =>{
                hideTooltip( tooltip );
            }
        };
    };

    const plotDataLines = ( svg, x, y, mouseActions ) =>{
        svg
            .append( "g" )
            .append( "rect" )
            .attr( "class", "dotted" )
            .attr( "stroke-width", "1px" )
            .attr( "width", ".5px" )
            .attr( "height", height );
        svg.append( "path" )
            .datum( data )
            .attr( "fill", "none" )
            .attr( "stroke", COLOR_PER_CALL_TYPE[1] )
            .attr( "stroke-width", 1.5 )
            .attr( "transform", "translate(" + margin.left + ",0)" )
            .attr( "d", d3.line().x( ( d ) => x( d.date ) ).y( ( d ) => y( d.Traffic ) ) )
            .on( "mouseover", function ( event, d ) {
                /*
                const [ xCoord ] = d3.pointer( event );
                const bisect = d3.bisector( ( d ) => x( d.date ) ).left;
                const index = bisect( data, x.invert( xCoord ) );
                const currentDataPoint = data[index];
                //mouseActions.mouseOver( event, currentDataPoint );
                console.log( "Index:", index );
                console.log( "Data:", data );
                console.log( "Data point:", data[index] );
                //mouseActions.mouseOver( event, currentDataPoint );
                */
                
                const [ xCoord ] = d3.pointer( event );
                const bisect = d3.bisector( ( d ) => d.date ).left;
                const invertedX = x.invert( xCoord );
                const bisectIndex = bisect( data, invertedX );
                const currentDataPoint = data[bisectIndex];
                console.log( "Inverted X:", invertedX );
                console.log( "Bisect Index:", bisectIndex );
                console.log( currentDataPoint );
                fillAndDisplayTootlip( event, data );
            } )
            .on( "mousemove", mouseActions.mouseMove )
            .on( "mouseout", mouseActions.mouseLeave );
        /*
            .datum( data )
            .attr( "fill", "none" )
            .attr( "stroke", COLOR_PER_CALL_TYPE[1] )
            .attr( "stroke-width", 1.5 )
            .attr( "transform", "translate(" + margin.left + ",0)" )
            .attr( "d", d3.line()
                .x( ( d ) => { return x( d.date ); } )
                .y( ( d ) => { return y( d.Traffic ); } ) )
            .on( "mouseover", mouseActions["mouseOver"] )
            .on( "mousemove", mouseActions["mouseMove"] )
            .on( "mouseout", mouseActions["mouseLeave"] );
            */
        svg.append( "path" )
            .datum( data )
            .attr( "fill", "none" )
            .attr( "stroke", COLOR_PER_CALL_TYPE[2] )
            .attr( "stroke-width", 1.5 )
            .attr( "transform", "translate(" + margin.left + ",0)" )
            .attr( "d", d3.line()
                .x( ( d ) => x( d.date ) )
                .y( ( d ) => y( d.EMS ) ) );
        svg.append( "path" )
            .datum( data )
            .attr( "fill", "none" )
            .attr( "stroke", COLOR_PER_CALL_TYPE[0] )
            .attr( "stroke-width", 1.5 )
            .attr( "transform", "translate(" + margin.left + ",0)" )
            .attr( "d", d3.line()
                .x( ( d ) => x( d.date ) )
                .y( ( d ) => y( d.Fire ) ) );
    };
    const ref = useD3(
        ( svg ) => {
            cleanPage( svg );
            const x = createHorizontalAxis( svg );
            const y = createVerticalAxis( svg );
            const tooltip = d3.select( "#EventChartToolTip" );
            const mouseActions = createMouseActions( tooltip );
            plotDataLines( svg, x, y, mouseActions );
            //console.log( data.map( item => item.Traffic ) );
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
            <Tooltip tooltipId={"EventChartToolTip"}></Tooltip>  
        </div>
    );
};

EventChart.propTypes = { data: PropTypes.arrayOf( PropTypes.shape( { "date": PropTypes.instanceOf( Date ), "EMS": PropTypes.number, "Fire": PropTypes.number, "Traffic": PropTypes.number } ) ) };

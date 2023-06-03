import React from "react";
import { useD3 } from "../../../../hook/useD3";
import * as d3 from "d3";
import "./EventChart.css";
import PropTypes from "prop-types";
import { Tooltip } from "../../../Tooltip/Tooltip";
import { fillAndDisplayTootlip, moveTooltip, hideTooltip } from "./utils.js";

const COLOR_PER_CALL_TYPE = { "Fire": "#FF9933", "Traffic": "#9B9B9B", "EMS": "#B0E7F5" };


export const EventChart = ( { data } ) => {
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


    const createMouseActions = ( tooltip ) => {
        return {
            "mouseOver": ( data, type ) => {
                fillAndDisplayTootlip( tooltip, data, type );
            },
            "mouseMove": ( event ) =>{
                moveTooltip( tooltip, event, window.innerWidth );
            },
            "mouseLeave": ( ) =>{
                hideTooltip( tooltip );
            }
        };
    };


    const plotDataLine = ( svg, x, y, mouseActions, type ) => {
        const getClosestDataPoint = ( event ) => {
            const dateOfData = x.invert( d3.pointer( event )[0] );
            const indexOfClosestDataPoint = d3.bisectLeft( dates, dateOfData );
            return data[indexOfClosestDataPoint][type];
        };

        svg.append( "path" )
            .datum( data )
            .attr( "fill", "none" )
            .attr( "stroke", COLOR_PER_CALL_TYPE[type] )
            .attr( "stroke-width", 5 )
            .attr( "transform", "translate(" + margin.left + ", 0)" )
            .attr( "d", d3.line().x( ( d ) => x( d.date ) ).y( ( d ) => y( d[type] ) ) )
            .on( "mouseover", ( event ) => mouseActions.mouseOver( getClosestDataPoint( event ), type ) )
            .on( "mousemove", mouseActions.mouseMove )
            .on( "mouseout", mouseActions.mouseLeave );

    };

    
    const plotDataLines = ( svg, x, y, mouseActions ) => {
        plotDataLine( svg, x, y, mouseActions, "Fire" );
        plotDataLine( svg, x, y, mouseActions, "Traffic" );
        plotDataLine( svg, x, y, mouseActions, "EMS" );
    };

    const ref = useD3(
        ( svg ) => {
            cleanPage( svg );
            const x = createHorizontalAxis( svg );
            const y = createVerticalAxis( svg );
            const tooltip = d3.select( "#EventChartToolTip" );
            const mouseActions = createMouseActions( tooltip );
            plotDataLines( svg, x, y, mouseActions );
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

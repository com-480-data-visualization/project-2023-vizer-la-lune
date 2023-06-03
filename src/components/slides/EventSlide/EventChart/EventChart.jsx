import React from "react";
import { useD3 } from "../../../../hook/useD3";
import * as d3 from "d3";
import "./EventChart.css";
import PropTypes from "prop-types";

export const EventChart = ( { data } ) => {
    const ref = useD3(
        ( svg ) => {
            const height = 500;
            const width = 1150;
            const margin = { top: 20, right: 30, bottom: 30, left: 60 };

            var x = d3
                .scaleTime()
                .domain( d3.extent( data, ( d ) => { return d.date; } ) )
                .range( [ 0, width - margin.left ] );

            var y = d3
                .scaleLinear()
                .domain( [ 0, d3.max( data, ( d ) => d.EMS ) ] )
                .rangeRound( [ height, margin.top ] );
            
            svg.append( "g" )
                .call( d3.axisBottom( x ).tickFormat( d3.timeFormat( "%Y-%m-%d" ) ) )
                .attr( "transform", "translate(" + margin.left + "," + ( height + height / 20 ) + ")" )
                .selectAll( "text" );
    
            svg.append( "g" )
                .call( d3.axisLeft( y ) )
                .attr( "transform", "translate(" + margin.left + "," + ( height / 20 ) + ")" );

            svg.append( "path" )
                .datum( data )
                .attr( "fill", "none" )
                .attr( "stroke", "steelblue" )
                .attr( "stroke-width", 1.5 )
                .attr( "transform", "translate(" + margin.left + ",0)" )
                .attr( "d", d3.line()
                    .x( ( d ) => { return x( d.date ); } )
                    .y( ( d ) => { return y( d.Traffic ); } ) );
            svg.append( "path" )
                .datum( data )
                .attr( "fill", "none" )
                .attr( "stroke", "red" )
                .attr( "stroke-width", 1.5 )
                .attr( "transform", "translate(" + margin.left + ",0)" )
                .attr( "d", d3.line()
                    .x( ( d ) => x( d.date ) )
                    .y( ( d ) => y( d.EMS ) ) );
            svg.append( "path" )
                .datum( data )
                .attr( "fill", "none" )
                .attr( "stroke", "black" )
                .attr( "stroke-width", 1.5 )
                .attr( "transform", "translate(" + margin.left + ",0)" )
                .attr( "d", d3.line()
                    .x( ( d ) => x( d.date ) )
                    .y( ( d ) => y( d.Fire ) ) );

        }, [ data.length ] );

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
        </div>
    );
};

EventChart.propTypes = { data: PropTypes.arrayOf( PropTypes.shape( { "date": PropTypes.instanceOf( Date ), "EMS": PropTypes.number, "Fire": PropTypes.number, "Traffic": PropTypes.number } ) ) };

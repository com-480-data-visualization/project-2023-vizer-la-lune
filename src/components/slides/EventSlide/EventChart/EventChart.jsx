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
                .scaleBand()
                .domain( data.map( d => {return d.year; } ) )
                .range( [ 0, width - margin.left ] )
                .padding( 0.2 );

            var y = d3
                .scaleLinear()
                .domain( [ 0, d3.max( data, ( d ) => d.sales ) ] )
                .rangeRound( [ height, margin.top ] );
  
            svg.append( "g" )
                .call( d3.axisBottom( x ) )
                .attr( "transform", "translate(" + margin.left + "," + ( height + height / 20 ) + ")" )
                .selectAll( "text" );

            svg.append( "g" )
                .call( d3.axisLeft( y ) )
                .attr( "transform", "translate(" + margin.left + "," + ( height / 20 ) + ")" );

            // Add the line
            svg.append( "path" )
                .datum( data )
                .attr( "fill", "none" )
                .attr( "stroke", "steelblue" )
                .attr( "stroke-width", 1.5 )
                .attr( "transform", "translate(" + margin.left + ",0)" )
                .attr( "d", d3.line()
                    .x( function( d ) { return x( d.year ); } )
                    .y( function( d ) { return y( d.sales ); } )
                );
            svg.append( "path" )
                .datum( data )
                .attr( "fill", "none" )
                .attr( "stroke", "red" )
                .attr( "stroke-width", 1.5 )
                .attr( "transform", "translate(" + margin.left + ",0)" )
                .attr( "d", d3.line()
                    .x( ( d ) => x( d.year ) )
                    .y( ( d ) => y( d.efficiency ) ) );

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

EventChart.propTypes = { data: PropTypes.arrayOf( PropTypes.shape( { "year": PropTypes.number, "efficiency": PropTypes.number, "sales": PropTypes.number } ) ) };

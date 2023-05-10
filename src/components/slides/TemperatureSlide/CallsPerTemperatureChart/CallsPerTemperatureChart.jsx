import React from "react";
import { useD3 } from "../../../../hook/useD3";
import * as d3 from "d3";
import PropTypes from "prop-types";
import "./CallsPerTemperatureChart.css";


export const CallsPerTemperatureChart = ( { data } ) => {
    const ref = useD3(
        ( svg ) => {
            
            const height = 500;
            const width = 1150;
            const margin = { top: 20, right: 30, bottom: 30, left: 30 };
            
            var x = d3
                .scaleBand()
                .domain( data.map( d => {return d.title; } ) )
                .range( [ 0, width ] )
                .padding( 0.2 );

            const y = d3
                .scaleLinear()
                .domain( [ 0, d3.max( data, ( d ) => d.calls_count ) ] )
                .rangeRound( [ height, margin.top ] );
  
            svg.append( "g" )
                .call( d3.axisBottom( x ) )
                .attr( "transform", "translate(" + margin.left + "," + ( height + height / 20 ) + ")" )
                .selectAll( "text" )
                .attr( "transform", "translate(-10,0)rotate(-45)" )
                .style( "text-anchor", "end" );

            svg.append( "g" )
                .call( d3.axisLeft( y ) )
                .attr( "transform", "translate(" + margin.left + "," + height / 20 + ")" );
            svg.selectAll( "mybar" )
                .data( data )
                .enter()
                .append( "rect" )
                .attr( "x", d => { return x( d.title ); } )
                .attr( "width", x.bandwidth() )
                .attr( "fill", "blue" )
            // no bar at the beginning thus:
                .attr( "y", d => { return y( d.calls_count ); } )
                .attr( "height", d => { return height - y( d.calls_count ); } )
                .attr( "transform", "translate(" + margin.left + "," + height / 20 + ")" );

        },
        [ data.length ]
    );
  
    return (
        <div className="chart">
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
    );
};
CallsPerTemperatureChart.propTypes = { data: PropTypes.arrayOf( PropTypes.shape( { "temperature": PropTypes.number, "title": PropTypes.string, "calls_count": PropTypes.number } ) ) };
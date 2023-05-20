import { React } from "react";
import { useD3 } from "../../../../hook/useD3";
import * as d3 from "d3";
import PropTypes from "prop-types";
import "./CallsPerTemperatureChart.css";
import { Tooltip } from "../Tooltip/Tooltip";
import { fillAndDisplayTootlip, moveTooltip, hideTooltip } from "./utils.js";


export const CallsPerTemperatureChart = ( { data } ) => {
    
    const height = 500;
    const width = 1150;
    const margin = { top: 20, right: 30, bottom: 30, left: 30 };

    const cleanPage = ( svg ) => {
        svg.selectAll( "*" ).remove();
    };
    const createHorizontalAxis = ( svg ) =>{
        var x = d3
            .scaleBand()
            .domain( data.map( d => d.title ) )
            .range( [ 0, width ] )
            .padding( 0.2 );
        svg.append( "g" )
            .call( d3.axisBottom( x ) )
            .attr( "transform", "translate(" + margin.left + "," + ( height + height / 20 ) + ")" )
            .selectAll( "text" )
            .attr( "visibility", "hidden" );
        return x;
    };

    const createVerticalAxis = ( svg ) => {
        var y = d3
            .scaleLinear()
            .domain( [ 0, d3.max( data, ( d ) => d.calls_count ) ] )
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
                moveTooltip( tooltip, event );
            },
            "mouseLeave": ( ) =>{
                hideTooltip( tooltip );
            }
        };
    };

    const plotDataBars = ( svg, x, y, mouseActions ) =>{
        svg.selectAll( "mybar" )
            .data( data )
            .enter()
            .append( "rect" )
            .attr( "x", d =>{ return x( d.title ); } )
            .attr( "width", x.bandwidth() )
            .attr( "fill", "blue" )
        // no bar at the beginning thus:
            .attr( "height", d =>{ return height - y( 0 ); } ) // always equal to 0
            .attr( "y", d =>{ return y( 0 ); } )
            .attr( "transform", "translate(" + margin.left + "," + height / 20 + ")" )
            .on( "mouseover", mouseActions["mouseOver"] )
            .on( "mousemove", mouseActions["mouseMove"] )
            .on( "mouseout", mouseActions["mouseLeave"] );
      

    };
    const createAnimationOnBars = ( svg, y )=>{
        svg.selectAll( "rect" )
            .transition()
            .duration( 800 )
            .attr( "y", d =>{ return y( d.calls_count ); } )
            .attr( "height", d =>{ return height - y( d.calls_count ); } )
            .delay( ( d, i ) => { return ( i * 100 );} );
    };

    const ref = useD3(
        ( svg ) => {

            cleanPage( svg );
            const x = createHorizontalAxis( svg );
            const y = createVerticalAxis( svg );
            const tooltip = d3.select( ".tooltip" );
            const mouseActions = createMouseActions( tooltip );
            plotDataBars( svg, x, y, mouseActions );
            createAnimationOnBars( svg, y ); 

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
                        backgroundColor: "red"
                    }}
                >
                    <g className="plot-area" />
                </svg>
            </div>
            <Tooltip></Tooltip>      
        </div>
    );
};
CallsPerTemperatureChart.propTypes = { data: PropTypes.arrayOf( PropTypes.shape( { "temperature": PropTypes.number, "title": PropTypes.string, "calls_count": PropTypes.number } ) ), color: PropTypes.string };
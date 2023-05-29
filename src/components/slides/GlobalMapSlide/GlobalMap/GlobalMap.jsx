import { React, useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import _ from "lodash";
import PropTypes from "prop-types";
import chroma from "chroma-js";
import "./GlobalMap.css";

// Constants
const YOUR_LATITUDE = 40.22; // Latitude of Montgomery County, PA
const YOUR_LONGITUDE = -75.38; // Longitude of Montgomery County, PA
const INITIAL_ZOOM_LEVEL = 10; // Initial zoom level to display Montgomery County, PA

export const GlobalMap = ( { geoJsonData, data } ) => {
    const geoJsonRef = useRef();

    useEffect( () => {
        if ( geoJsonRef.current && geoJsonData !== null ){

            geoJsonRef.current.clearLayers(); 

            if ( geoJsonData.features[0].properties["calls"] != undefined && geoJsonData.features[0].properties["calls"] != "no data" ){
                const onlyWithData = geoJsonData.features.filter( ( feature ) => feature.properties.calls != "no data" );
                const maxCallsCount = onlyWithData.map( ( feature )=> feature.properties.calls ).sort( ( a, b ) => a - b ).reverse()[0];
                const features = geoJsonData.features.map( ( feature ) =>{ console.log( feature.calls );return {
                    ...feature,
                    properties: {
                        ...feature.properties,
                        calls: feature.properties.calls,
                        normalizedCalls: feature.properties.calls / maxCallsCount,
                    },
                };} );
                const newGeoJson = {
                    type: "FeatureCollection",
                    features: features
                };
                geoJsonRef.current.addData( newGeoJson );
            } else {
                geoJsonRef.current.addData( geoJsonData );
            }

        }
    }, [ geoJsonRef, geoJsonData ] );
    

    const mapStyle = {
        height: "500px",
        width: "60%",
        margin: "0 auto",
    };


    // Style function for GeoJSON layer
    const style = ( feature ) => {
        const count = feature.properties.normalizedCalls;
        return {
            fillColor: getColor( count ), // Use the getColor function to determine the fill color
            weight: 1,
            opacity: 1,
            color: "black",
            fillOpacity: 0.7,
        };
    };


    const colorScale = chroma.scale( [ "lightgreen", "lightyellow", "yellow", "orange", "red" ] ).mode( "hsl" );
  
    // Function to get color based on call count
    const getColor = ( callCount ) => {
        if ( callCount != "no data" ){
            return colorScale( callCount ).hex();
        } else {
            return "#ccc";
        }
    };

    function onEachFeature( feature, layer ) {
        const zip = feature.properties.ZCTA5CE10;
        const count = feature.properties.calls;
        layer.bindPopup( `Zip Code: ${zip}<br>Call Count: ${count}` );
    }

    return (
        <div className="map-container">
            <MapContainer
                center={[ YOUR_LATITUDE, YOUR_LONGITUDE ]}
                zoom={INITIAL_ZOOM_LEVEL}
                scrollWheelZoom={false}
                style={mapStyle}
                className="map-container"
            >
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <GeoJSON
                    ref={geoJsonRef}
                    data={geoJsonData}
                    style={style}
                    onEachFeature={onEachFeature}
                />
            </MapContainer>
        </div>
    );
};

GlobalMap.propTypes = { data: PropTypes.arrayOf( PropTypes.shape( { "zip": PropTypes.number, "e": PropTypes.number, "twp": PropTypes.string, "group": PropTypes.string, "year": PropTypes.number, "timeStamp": PropTypes.instanceOf( Date ), "month": PropTypes.number } ) ) };
GlobalMap.propTypes = { geoJsonData: PropTypes.object };


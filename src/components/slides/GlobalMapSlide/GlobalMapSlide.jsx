import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./GlobalMapSlide.css";
import { Slide } from "../Slide/Slide";
import _ from "lodash";
import callsPerZip from "../../../data/data_per_zip/calls_per_zip.csv";
import zipcodesData from "../../../data/data_per_zip/zipcodes.json";
import { GlobalMap } from "./GlobalMap/GlobalMap";

export const GlobalMapSlide = () => {
    
    const montgomeryCountyZips = [
        "18041", "18054", "18070", "18073", "18074", "18076", "18084", "18914",
        "18915", "18936", "18964", "18969", "19001", "19002", "19003", "19004",
        "19006", "19009", "19012", "19025", "19027", "19031", "19034", "19035",
        "19038", "19040", "19044", "19046", "19066", "19072", "19075", "19085",
        "19087", "19090", "19095", "19096", "19118", "19401", "19403", "19405",
        "19406", "19407", "19408", "19409", "19422", "19423", "19426", "19428",
        "19430", "19436", "19437", "19438", "19440", "19443", "19444", "19446",
        "19450", "19451", "19453", "19454", "19455", "19456", "19457", "19460",
        "19462", "19464", "19468", "19473", "19474", "19477", "19478", "19481",
        "19482", "19484", "19485", "19486", "19490", "19503", "19504", "19505",
        "19512", "19525", "19536", "19543", "19562", "19580"
    ];

    const [ data, setData ] = useState( [] );
    const [ geoData, setGeoData ] = useState( null );
    const [ dataToDisplay, setDataToDisplay ] = useState( [] );
    const [ geoDataToDisplay, setGeoDataToDisplay ] = useState( null );
    useEffect( () => {
        setGeoData( zipcodesData );
        Papa.parse( callsPerZip, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: ( results ) => {
                setData( results.data );
            },
        } );
    }, [] );

    useEffect( () => {
        if ( data !== [] ){ 
            setDataToDisplay( getDataForDisplay() );
        }

    }, [ data ] );

    useEffect( () => {
        if ( geoData !== null && geoData.features.length > 0 && data.length !== 0 ){
            setGeoDataToDisplay( getGeoJsonForDisplay() );
        }
    }, [ geoData, data ] );

    useEffect( () => {
        if ( geoData !== null && geoData.features.length > 0 && data.length !== 0 ) {
            setGeoDataToDisplay( getGeoJsonForDisplay() );
        }
    }, [ geoData, data ] );

    const getDataForDisplay = () => {
        return data.slice( 1, 10 ).map( ( piece, index ) => {
            return {
                zip: parseInt( piece.zip ),
                e: parseInt( piece.e ),
                twp: piece.twp,
                group: piece.group,
                year: parseInt( piece.year ),
                month: parseInt( piece.month ),
            };
        } );
    };

    const getGeoJsonForDisplay = () =>{
        // Group data by zip codes and count calls per zip code
        const groupedData = _.groupBy( data, "zip" );
        // Give {19002: 1, 19044: 2}
        const callsPerZipLocal = _.mapValues( groupedData, "length" );//Nom de var a changer

        const onlyMontgomeryCitiesGeoJsonData = geoData.features.filter( ( feature ) => {
            const zip = feature.properties.ZCTA5CE10;
            const doesCityInMontgomeryCounty = montgomeryCountyZips.includes( zip );
            return doesCityInMontgomeryCounty;
        } );
        const geoJsonDataFeaturesForMontgomeryCities = onlyMontgomeryCitiesGeoJsonData.map( ( feature ) => {
            const zip = parseInt( feature.properties.ZCTA5CE10 ); // Assuming the zip code property is called ZCTA5CE10
            const calls = zip in callsPerZipLocal ? parseInt( callsPerZipLocal[zip] ) : "no data";
            return {
                ...feature,
                properties: {
                    ...feature.properties,
                    calls: calls,
                },
            };
        } );
        const formattedGeojson = {
            type: "FeatureCollection",
            features: geoJsonDataFeaturesForMontgomeryCities
        };
        return formattedGeojson;
    };
    
    return (
        <Slide title = "Global Map">
            <GlobalMap geoJsonData={geoDataToDisplay} data={dataToDisplay} />
        </Slide>
    );
};
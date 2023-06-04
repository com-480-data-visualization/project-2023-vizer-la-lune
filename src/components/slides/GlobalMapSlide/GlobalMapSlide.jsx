import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./GlobalMapSlide.css";
import { Slide } from "../Slide/Slide";
import _ from "lodash";
import callsPerZip from "../../../data/data_per_zip/calls_per_zip.csv";
import zipcodesData from "../../../data/data_per_zip/zipcodes.json";
import { GlobalMap } from "./GlobalMap/GlobalMap";
import { GlobalMapYearButton } from "./GlobalMapYearButton/GlobalMapYearButton";
import { FilterPanelGlobalMap } from "./FilterPanelGlobalMap/FilterPanelGlobalMap";
import { SliderMonth } from "./SliderMonth/SliderMonth";

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
        "19512", "19525", "19536", "19562", "19580"
    ];

    // Button to select year

    const [ data, setData ] = useState( [] );
    const [ geoData, setGeoData ] = useState( null );
    const [ dataToDisplay, setDataToDisplay ] = useState( [] );
    const [ geoDataToDisplay, setGeoDataToDisplay ] = useState( null );
    const [ selectedYear, setSelectedYear ] = useState( "2016" );
    const [ selectedGroup, setSelectedGroup ] = useState( "All" );
    const [ selectedMonth, setSelectedMonth ] = useState( "1" );
    const [ selectedTownship, setSelectedTownship ] = useState( "All" );

    // Filter panel to select accident type

    const availableYears = [ ...new Set( data.map( ( item ) => item.year ) ) ];
    const availableGroups = [ ...new Set( data.map( ( item ) => item.group ) ) ];
    const availableTownships = [ ...new Set( data.map( ( item ) => item.twp ) ) ];

    const handleYearButtonClick = ( year ) => {
        setSelectedYear( year );
        setGeoDataToDisplay( getGeoJsonForDisplay( year, selectedGroup, selectedMonth, selectedTownship ) );
    };

    const handleGroupChange = ( group ) => {
        setSelectedGroup( group );
        setGeoDataToDisplay( getGeoJsonForDisplay( selectedYear, group, selectedMonth, selectedTownship ) );
    };

    const handleMonthChange = ( month ) => {
        setSelectedMonth( month );
        setGeoDataToDisplay( getGeoJsonForDisplay( selectedYear, selectedGroup, month, selectedTownship ) );
    };

    const handleTownshipChange = ( township ) => {
        setSelectedTownship( township );
        setGeoDataToDisplay( getGeoJsonForDisplay( selectedYear, selectedGroup, selectedMonth, township ) );
    };
    
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
            setDataToDisplay( getDataForDisplay( selectedYear, selectedGroup, selectedMonth, selectedTownship ) );
        }

    }, [ data ] );

    useEffect( () => {
        if ( geoData !== null && geoData.features.length > 0 && data.length !== 0 ){
            setGeoDataToDisplay( getGeoJsonForDisplay( selectedYear, selectedGroup, selectedMonth, selectedTownship ) );
        }
    }, [ geoData, data ] );

    useEffect( () => {
        if ( geoData !== null && geoData.features.length > 0 && data.length !== 0 ) {
            setGeoDataToDisplay( getGeoJsonForDisplay( selectedYear, selectedGroup, selectedMonth, selectedTownship ) );
        }
    }, [ geoData, data ] );

    const getDataForDisplay = () => {
        return data.map( ( piece, index ) => {
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

    var emptyTownships = false;

    const getGeoJsonForDisplay = ( year, group, month, township ) =>{
        var filteredData = data.filter( ( item ) => item.year === year );

        // if selectedGroup is not "All", filter data by selectedGroup
        if ( group !== "All" ) {
            filteredData = filteredData.filter( ( item ) => item.group === group );
        }
        // if selectedTownship is not "All", filter data by selectedTownship
        if ( township !== "All" ) {
            filteredData = filteredData.filter( ( item ) => item.twp === township );
        }

        filteredData = filteredData.filter( ( item ) => item.month === month );
        // Group data by zip codes and count calls per zip code
        const groupedData = _.groupBy( filteredData, "zip" );
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
            <div className="global-map-year-buttons-container">
                <div className="global-map-year-buttons">
                    {availableYears.map( ( year ) => (
                        <GlobalMapYearButton
                            key={year}
                            year={year}
                            selectedYear={selectedYear === year}
                            onYearButtonClick={handleYearButtonClick}
                        />
                    ) )}
                </div>
            </div>
            <div className="filter-panel">
                <FilterPanelGlobalMap
                    availableGroups={availableGroups}
                    selectedGroup={selectedGroup}
                    onGroupChange={handleGroupChange}
                    availableTownships={availableTownships}
                    selectedTownship={selectedTownship}
                    onTownshipChange={handleTownshipChange}
                />
            </div>
            <GlobalMap geoJsonData={geoDataToDisplay} data={dataToDisplay} />
            <SliderMonth callBack={handleMonthChange} baseValue = {1}/>
        </Slide>
    );
};
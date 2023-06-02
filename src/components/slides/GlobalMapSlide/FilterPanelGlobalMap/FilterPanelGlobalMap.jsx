import { React, useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import _ from "lodash";
import PropTypes from "prop-types";
import "./FilterPanelGlobalMap.css";

export const FilterPanelGlobalMap = ( { availableGroups, selectedGroup, onGroupChange, availableTownships, selectedTownship, onTownshipChange, } ) => {

    const handleGroupChange = ( event ) => {
        const selectedGroup = event.target.value;
        onGroupChange( selectedGroup );
    };

    const handleTownshipChange = ( event ) => {
        const selectedTownship = event.target.value;
        onTownshipChange( selectedTownship );
    };

    return (
        <div className="filter-panel-global-map">
            <h3>Filter by Accident Type</h3>
            <select value={selectedGroup} onChange={handleGroupChange}>
                <option value="All">All</option>
                {availableGroups.map( ( group ) => (
                    <option key={group} value={group} >
                        {group}
                    </option>
                ) )}
            </select>
            <h3>Filter by Township</h3>
            <select value={selectedTownship} onChange={handleTownshipChange} >
                <option value="All">All</option>
                {availableTownships.map( ( township ) => (
                    <option key={township} value={township} >
                        {township}
                    </option>
                ) )}
            </select>
        </div>
    );
};

FilterPanelGlobalMap.propTypes = { availableGroups: [], selectedGroup: "", onGroupChange: () => {}, availableTownships: [], selectedTownship: "", onTownshipChange: () => {} };

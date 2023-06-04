export const fillAndDisplayTootlip = ( tooltip, data, type, position ) => {
    tooltip.style( "visibility", "visible" ); 
    if ( type == "date" ){
        fillAndDisplayDateTooltip( tooltip, data, position );
    } else { 
        fillAndDisplayEventTooltip( tooltip, data, type, position );
    } 
};

const fillAndDisplayEventTooltip = ( tooltip, data, type, position ) => {
    tooltip.html( "Type: " + type + "<br/> Calls Count: " + data );
    if ( type == "EMS" ){
        //Needed offset, I don't get why EMS is always too high otherwise
        tooltip.style( "top", ( position[1] - 597 ) + "px" ).style( "left", ( position[0] ) + "px" );
    } else {
        tooltip.style( "top", ( position[1] - 700 ) + "px" ).style( "left", ( position[0] ) + "px" );
    }
    tooltip.style( "width", "140px" );
    tooltip.style( "height", "30px" );
};

const fillAndDisplayDateTooltip = ( tooltip, date, position ) => {
    tooltip.html( date.toDateString() );
    tooltip.style( "top", ( position[1] - 700 ) + "px" ).style( "left", ( position[0] - 150 ) + "px" );
    tooltip.style( "width", "100px" );
    tooltip.style( "height", "30px" );
    //Overwritting css props does not work in css so we do it here
    tooltip.style( "background-color", "rgba(0,0,0,0)" );
    tooltip.style( "border-width", "0px" );
    tooltip.style( "font-weight", "bold" );
    tooltip.style( "text-align", "center" );
};


export const hideTooltip = ( tooltip ) => {
    tooltip.style( "visibility", "hidden" );
};
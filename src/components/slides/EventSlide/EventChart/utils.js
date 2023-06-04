export const fillAndDisplayTootlip = ( tooltip, data, type, position ) => {
    tooltip.style( "visibility", "visible" ); 
    tooltip.html( "Type: " + type + "<br/> Calls Count: " + data );
    console.log( type, position );
    if ( type == "EMS" ){
        //Needed offset, I don't get why EMS is always too high otherwise
        tooltip.style( "top", ( position[1] - 597 ) + "px" ).style( "left", ( position[0] ) + "px" );
    } else {
        tooltip.style( "top", ( position[1] - 700 ) + "px" ).style( "left", ( position[0] ) + "px" );
    }
   
    tooltip.style( "width", "140px" );
    tooltip.style( "height", "30px" );
};


export const hideTooltip = ( tooltip ) => {
    tooltip.style( "visibility", "hidden" );
};
export const computeTooltipSize = ( content ) => {
    var size = content.length;
    var tooltipSize = size * 11 + 40;
    return tooltipSize;
};

export const fillAndDisplayTootlip = ( tooltip, data ) =>{
    tooltip.style( "visibility", "visible" ); 
    var title = data.title.toString();
    var callCount = data.calls_count;
    var tooltipSize = computeTooltipSize( title );
    tooltip.html( "Type: " + title + "<br/> Value: " + callCount );
    tooltip.style( "width", tooltipSize + "px" );
};

export const moveTooltip = ( tooltip, event ) => {
    tooltip.style( "top", ( event.pageY - 790 ) + "px" ).style( "left", ( event.pageX - 160 ) + "px" );
};

export const hideTooltip = ( tooltip ) => {
    tooltip.style( "visibility", "hidden" );
};
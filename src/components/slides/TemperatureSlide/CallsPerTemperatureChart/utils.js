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
    tooltip.html( "Type: " + title + "<br/> Calls Count: " + callCount );
    tooltip.style( "width", tooltipSize + "px" );
};

const extractWidthFromTooltip = ( tooltip ) => {
    const regex = /width:\s*([\d.]+)px;/;
    const match = tooltip.attr( "style" ).match( regex );
    const widthValue = match[1];
    return parseInt( widthValue );
};

export const moveTooltip = ( tooltip, event, windowSize ) => {
    const tooltipWidth = extractWidthFromTooltip( tooltip );
    const doesTooltipExceedsWindow = windowSize - 250 < event.pageX - 160 + tooltipWidth;
    if ( doesTooltipExceedsWindow ){
        const additionalOffset = event.pageX - 160 + tooltipWidth - ( windowSize - 250 );
        tooltip.style( "top", ( event.pageY - 790 ) + "px" ).style( "left", ( event.pageX - 160 - additionalOffset ) + "px" );
    } else {tooltip.style( "top", ( event.pageY - 790 ) + "px" ).style( "left", ( event.pageX - 160 ) + "px" );}
    
};

export const hideTooltip = ( tooltip ) => {
    tooltip.style( "visibility", "hidden" );
};
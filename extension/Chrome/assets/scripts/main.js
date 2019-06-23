$(document).ready (() => {
    console.log ("Doc Ready");

    $('#iFrame').on( "load", () => {
        console.log ("Frame loaded");
        console.log ($('#iFrame').contents())
        $('#iFrame').contents().find("body").addClass("iframeFormat");
    });
    //$('iframe').on( "load", () => {
        
    //});
    $("#iFrame").on ("click", () => {
        console.log ("Click")
        console.log ($('#iFrame').contents())
        $('#iFrame').contents().find("body").addClass("iframeFormat");
    });
});
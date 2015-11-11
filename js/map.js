var map;
var wmap = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

// Zoom out for smaller screens
function selectZoom(w) {
    var zoom = 9;
    if ( wmap > 320 ) zoom = 10;
    return zoom;
}

// Center map around lake Tahoe
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.0133, lng: -120.0508},
        zoom: selectZoom(wmap)
    });
}

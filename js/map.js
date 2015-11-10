var map;
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

function selectZoom(w) {
    var zoom = 9;
    if ( w > 320 ) zoom = 10;
    return zoom;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.9019, lng: -120.0471},
        zoom: selectZoom(w)
    });
}
